import { CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('outlet_name')
export class menu {
  id: string;
  outlet_name: string;
  item_name: string;
  calories: string;
  price: number;
}

