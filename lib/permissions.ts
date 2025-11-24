// 1. The Map: Easy to import and use in UI logic
export const PERMISSIONS = {
  ProcessSales: 1,
  ApproveRemovals: 2,
  ManageProducts: 4,
  ManageInventory: 8,
  ManageCustomers: 16,
  ManageExpenses: 32,
  ManageUsers: 64,
  AccessReports: 128,
} as const;

// 2. The Array: Useful for mapping over to create checkboxes/lists in the UI
export const PERMISSION_LIST = [
  { label: "Process Sales", value: PERMISSIONS.ProcessSales, description: "Can ring up items" },
  { label: "Approve Removals", value: PERMISSIONS.ApproveRemovals, description: "Can void transactions" },
  { label: "Manage Products", value: PERMISSIONS.ManageProducts, description: "Add/Edit products" },
  { label: "Manage Inventory", value: PERMISSIONS.ManageInventory, description: "Adjust stock levels" },
  { label: "Manage Customers", value: PERMISSIONS.ManageCustomers, description: "View/Edit customer data" },
  { label: "Manage Expenses", value: PERMISSIONS.ManageExpenses, description: "Access expense reports" },
  { label: "Manage Users", value: PERMISSIONS.ManageUsers, description: "Create/Delete staff accounts" },
  { label: "Access Reports", value: PERMISSIONS.AccessReports, description: "View financial analytics" },
];

/**
 * CHECKS if a user has a specific permission
 * Logic: (UserTotal & Required) === Required
 */
export const hasPermission = (userPermissionSum: number, required: number) => {
  return (userPermissionSum & required) === required;
};

/**
 * ADDS a permission to the sum
 * Logic: UserTotal | NewPermission
 */
export const addPermission = (userPermissionSum: number, toAdd: number) => {
  return userPermissionSum | toAdd;
};

/**
 * REMOVES a permission from the sum
 * Logic: UserTotal & (~PermissionToRemove)
 */
export const removePermission = (userPermissionSum: number, toRemove: number) => {
  return userPermissionSum & ~toRemove;
};