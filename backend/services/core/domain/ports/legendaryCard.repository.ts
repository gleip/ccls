import { Card } from '../aggregates/Card';

export interface LegendaryCardRepository {
  getById(id: string): Promise<Card | null>;
}
