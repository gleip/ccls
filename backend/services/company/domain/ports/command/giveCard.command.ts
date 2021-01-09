import { IAssignedCard } from 'root/domain';

export type IGiveCard = Pick<IAssignedCard, 'amount' | 'assigned' | 'assignedBy' | 'rarity' | 'image'> & {
  name: string;
  description: string;
};
