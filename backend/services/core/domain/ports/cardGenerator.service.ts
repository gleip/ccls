import { User } from '../aggregates/User';
import { Space } from '../aggregates/Space';
import { Card } from '../aggregates';

interface GenerateCardRequest {
  userFrom: User;
  userTo: User;
  spaceFrom: Space;
  name: string;
  description: string;
  power: number;
}

export interface CardGenerator {
  getCard(generateCardRequest: GenerateCardRequest): Promise<Card>;
}
