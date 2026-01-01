export interface Subscription {
  id: number;
  name: string;
  cost: number;
  cycle: number;
  renewalDate: string;
}

export type NewSubscription = Omit<Subscription, 'id' | 'renewalDate'>;
