import { IAssignedCard, ILegendaryCard } from 'root/domain';

export type IGiveLegendaryCard = Pick<ILegendaryCard, 'id'> & Pick<IAssignedCard, 'assigned' | 'assignedBy'>;
