export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface Menu {
  [category: string]: MenuItem[];
}
