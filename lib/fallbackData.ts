export const CATEGORIES_FALLBACK = [
  { id: 1, name: "All" },
  { id: 2, name: "Drinks" },
  { id: 3, name: "Food" },
  { id: 4, name: "Snacks" },
];

export const PRODUCTS_FALLBACK = [
  { id: 101, name: "Bottled Water", imageUrl: "/images/product.jpg", price: 1.5, stockQuantity: 100 },
  { id: 102, name: "Coffee", imageUrl: "/images/product.jpg", price: 2.5, stockQuantity: 50 },
  { id: 103, name: "Sandwich", imageUrl: "/images/product.jpg", price: 4.0, stockQuantity: 20 },
];

export const DASHBOARD_SUMMARY_FALLBACK = {
  todaysSales: 1234.56,
  todaysTransactions: 42,
  salesChangePercentage: 5.2,
  totalClients: 15,
  newClientsThisWeek: 3,
  clientsChangePercentage: 2.1,
  discountsThisWeek: 120.0,
  totalDiscountTransactions: 5,
  discountsChangePercentage: -1.2,
};

export const TOP_SELLING_FALLBACK = [
  { productId: 101, productName: "Bottled Water", totalSold: 150, totalRevenue: 150.0, growthPercentage: 5 },
  { productId: 102, productName: "Coffee", totalSold: 120, totalRevenue: 300.0, growthPercentage: 3 },
];

export const TOP_CLIENTS_FALLBACK = [
  { customerId: 1, customerName: "Client A", totalSpent: 540, totalOrders: 12, outstandingBalance: 40 },
  { customerId: 2, customerName: "Client B", totalSpent: 420, totalOrders: 8, outstandingBalance: 20 },
];

export const CASHIER_PERFORMANCE_FALLBACK = [
  { userId: 1, cashierName: "Alice", totalTransactions: 40, totalSalesValue: 400, averageSaleValue: 10 },
  { userId: 2, cashierName: "Bob", totalTransactions: 30, totalSalesValue: 300, averageSaleValue: 10 },
];

export const SALES_FALLBACK = [
  { id: 1, amount: 120.5, date: new Date().toISOString(), cashierName: "Alice" },
  { id: 2, amount: 90.0, date: new Date().toISOString(), cashierName: "Bob" },
];

export const CUSTOMERS_FALLBACK = [
  { id: 1, name: "Client A", discountPercentage: 10, phone: "" },
  { id: 2, name: "Client B", discountPercentage: 5, phone: "" },
];

export const ADMIN_USERS_FALLBACK = [
  { id: 1, username: "admin", fullName: "Super Admin", isActive: true, createdAt: new Date().toISOString(), role: "Admin", imageUrl: "/images/profile.jpg", permissions: 255 },
  { id: 2, username: "cashier", fullName: "Cashier One", isActive: true, createdAt: new Date().toISOString(), role: "Cashier", imageUrl: "/images/profile.jpg", permissions: 2 },
];

export const NOTIFICATIONS_FALLBACK = [
  { type: "Info", message: "No alerts", severity: "info" as const, time: new Date().toISOString() },
];

export const USERS_FALLBACK = ["admin", "cashier", "tester"];

export const SALES_OVERTIME_FALLBACK = [
  { label: "Mon", totalSales: 100 },
  { label: "Tue", totalSales: 150 },
  { label: "Wed", totalSales: 120 },
];