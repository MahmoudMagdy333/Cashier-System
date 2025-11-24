export type Client = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  currentBalance: number;
  discountPercentage: number;
  createdAt: string;
  image?: string;
  active?: boolean;
};
