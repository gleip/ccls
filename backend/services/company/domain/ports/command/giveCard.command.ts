import { ICard } from 'root/domain';

export type IGiveCard = Pick<ICard, 'power' | 'image' | 'assignedBy' | 'rarity'> & {
  employeeId: string;
};
