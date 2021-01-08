import { IAssignedCard } from 'root/domain';

export type IGiveCard = Pick<IAssignedCard, 'amount' | 'assigned' | 'assignedBy'> & {
  name: string;
  description: string;
  image: string;
};
