import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';

// ports
import { ToolkitService } from '../ports/output/toolkit.service';
import { CoreRepository } from '../ports/output/core.repository';
import { CreateLegendaryCard, DeleteLegendaryCard, GetLegendaryCardsList } from '../ports/input/card';

@injectable()
export class LegendaryCardService {
  private errors = {
    CARD_NOT_FOUND: ' Легендарная карта не найдена',
  };
  constructor(
    @inject(TYPES.CoreRepository) private repository: CoreRepository,
    @inject(TYPES.Toolkit) private toolkit: ToolkitService,
  ) {}
  public async getLegendaryCardList(pagination: GetLegendaryCardsList) {
    const { total, cards } = await this.repository.getLegendaryCardList(pagination);
    return {
      total,
      cards: cards.map(card => card.getView()),
    };
  }
  public async createLegendaryCard({ image, power }: CreateLegendaryCard) {

  }
}
