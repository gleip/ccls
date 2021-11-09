import { IAuthService } from 'common/AuthService/AuthService.interface';
import { INotifier } from 'common/Notifier/Notifier.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from 'services/core/inversify.types';
import { IEmployeeService } from './EmployeeService.interface';
import { Employee, Role, Card } from '../../aggregates';

// Commands
import { ICreateEmployee } from '../../ports/command/user/create';
import { IDeactivateEmployee } from '../../ports/command/deactivate.command';
import { IUpdateEmployee } from '../../ports/command/user/update';
import { IEmployeeRepository, ILegendaryCardRepository } from '../../ports/repository';
import { ISignIn } from '../../ports/command/signIn.command';
import { IRefreshToken } from '../../ports/command/refreshToken.command';
import { ISetPassword } from '../../ports/command/setPassword.command';
import { ISetVrificationCode } from '../../ports/command/setVerificationCode.command';
import { IMoveEmployeeToAnotherSpace } from '../../ports/command/moveEmployeeToAnotherSpace.command';
import { IGiveCard } from '../../ports/command/giveCard.command';
import { IGiveLegendaryCard } from '../../ports/command/giveLegendaryCard.command';

// Query
import { IGetEmployeeList } from '../../ports/query/getEmployeeList';
import { IGetEmployee } from '../../ports/query/getEmployee';

@injectable()
export class EmployeeService implements IEmployeeService {
  private errors = {
    NOT_FOUND: 'Сотрудник не найден',
    WRONG_EMAIL_OR_PASSWORD: 'Неверный логин или пароль',
    EMPLOYEE_EXIST: 'Пользователь с таким email уже существует',
    CARD_NOT_FOUND: 'Карточка не найдена',
  };
  constructor(
    @inject(TYPES.EmployeeRepository) private employeeRepository: IEmployeeRepository,
    @inject(TYPES.LegendaryCardRepository) private legendaryCardRepository: ILegendaryCardRepository,
    @inject(TYPES.AuthService) private authService: IAuthService,
    @inject(TYPES.Notifier) private notifier: INotifier,
  ) {}

  private async getEmployeeById(id: string) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    return employee;
  }

  private async getAuthInfo(employee: Employee) {
    const authInfo = this.authService.getAuth(employee);
    await this.employeeRepository.putEmployeeRefreshToken(employee.id, authInfo.refresh);
    return authInfo.auth;
  }

  public async signIn({ email, password }: ISignIn) {
    const employee = await this.employeeRepository.getByEmail(email);
    if (!employee) {
      throw new Error(this.errors.WRONG_EMAIL_OR_PASSWORD);
    }
    const isMatch = await this.authService.comparePassword(password, employee.password);
    if (!isMatch) {
      throw new Error(this.errors.WRONG_EMAIL_OR_PASSWORD);
    }
    return this.getAuthInfo(employee);
  }

  public async refreshToken({ refreshToken }: IRefreshToken) {
    const employee = await this.employeeRepository.getByRefreshToken(refreshToken);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    return this.getAuthInfo(employee);
  }

  public async setPassword({ email, password, verificationCode }: ISetPassword) {
    const employee = await this.employeeRepository.getByVerificationCode(verificationCode);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    if (employee.email !== email) {
      throw new Error(this.errors.NOT_FOUND);
    }
    employee.confirm();
    const hashPassword = await this.authService.hashPassword(password);
    await this.employeeRepository.putEmployeeHashPassword(employee.id, hashPassword);
  }

  public async setVerificationCode({ email }: ISetVrificationCode) {
    const code = this.authService.generateVerificationCode();
    await this.employeeRepository.putEmployeeVerificationCode(email, code);
    await this.notifier.sendVerificationCode({ email, code });
  }

  public async deactivate({ id }: IDeactivateEmployee) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    employee.deactivate();
    await this.employeeRepository.put(employee);
  }

  public async create({ email, name, patronymic, role, spaceId, surname, phone }: Omit<ICreateEmployee, 'id'>) {
    const existEmployee = this.employeeRepository.getByEmail(email);
    if (existEmployee) {
      throw new Error(this.errors.EMPLOYEE_EXIST);
    }
    const id = this.employeeRepository.getIdForNewEmployee();
    const employee = Employee.create({ id, email, name, patronymic, role, spaceId, surname, phone });
    await this.employeeRepository.put(employee);
    const verificationCode = this.authService.generateVerificationCode();
    await this.employeeRepository.putEmployeeVerificationCode(employee.email, verificationCode);
    await this.notifier.sendVerificationCode({
      email: employee.email,
      code: verificationCode,
    });
    return employee.getView();
  }

  public async update({ id, avatar, name, patronymic, phone, role, spaceId, surname }: IUpdateEmployee) {
    const employee = await this.getEmployeeById(id);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    if (avatar) {
      employee.avatar = avatar;
    }
    if (name) {
      employee.name = name;
    }
    if (patronymic) {
      employee.patronymic = patronymic;
    }
    if (phone) {
      employee.phone = phone;
    }
    if (role) {
      employee.role = new Role(role);
    }
    if (spaceId) {
      // TODO: Добавить проверку на существование пространства
      employee.spaceId = spaceId;
    }
    if (surname) {
      employee.surname = surname;
    }
    await this.employeeRepository.put(employee);
    return employee.getView();
  }

  public async getList({ spaceId }: IGetEmployeeList) {
    return this.employeeRepository.getList(spaceId);
  }

  public async get({ id }: IGetEmployee) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    return employee.getView();
  }

  public async moveEmployeeToAnotherSpace({ employeeId, spaceId }: IMoveEmployeeToAnotherSpace) {
    const employee = await this.employeeRepository.getById(employeeId);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    employee.spaceId = spaceId; // TODO: Добавить проверку на существование пространства
    await this.employeeRepository.put(employee);
  }

  public async giveCard({ assignedBy, employeeId, image, power, rarity }: IGiveCard) {
    const employee = await this.employeeRepository.getById(employeeId);
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    const card = new Card({ assignedBy, assignedDate: new Date(), created: new Date(), image, power, rarity });
    employee.giveCard(card);
    this.employeeRepository.put(employee);
  }

  public async giveLegendaryCard({ assignedBy, employeeId, id }: IGiveLegendaryCard) {
    const [legendaryCard, employee] = await Promise.all([
      this.legendaryCardRepository.get(id),
      this.employeeRepository.getById(employeeId),
    ]);
    if (!legendaryCard) {
      throw new Error(this.errors.CARD_NOT_FOUND);
    }
    if (!employee) {
      throw new Error(this.errors.NOT_FOUND);
    }
    legendaryCard.assignedBy = assignedBy;
    employee.giveCard(legendaryCard);
    await this.employeeRepository.put(employee);
    await this.legendaryCardRepository.remove(id);
  }
}
