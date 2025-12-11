export interface Menu {
  id: number;
  title: string;
  path: string;
  orderNo: number;
  isActive: boolean;
  isAdminOnly: boolean;
}

export type MenuCreate = Omit<Menu, "id">;
