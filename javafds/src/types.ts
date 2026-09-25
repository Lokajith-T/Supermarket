export type ProductStatus = 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
export type NotificationType = 'Back in stock' | 'Order update' | 'Points earned' | 'Reward unlocked' | 'New offer' | 'New product' | 'Announcement';

export interface Category {
  id: string;
  name: string;
  productCount: number;
  icon: string;
  accent: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  rating: number;
  image: string;
  badge?: string;
  status: ProductStatus;
  discount?: number;
  sku: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  discount?: number;
}

export interface Order {
  id: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
  eta?: string;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  label: string;
  date: string;
}

export interface AdminMetric {
  title: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  icon: string;
}
