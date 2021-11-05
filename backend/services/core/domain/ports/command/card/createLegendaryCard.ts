import { ILegendaryCard } from 'root/domain';

export type ICreateLegendaryCard = Pick<ILegendaryCard, 'amount'> & {
  name: string;
  description: string;
};
