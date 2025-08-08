// navigation/types.ts
export type RootStackParamList = {
  //For React Navigation

    MainTabs: undefined;
    ItemDetail: {
      item: InventoryItem;
      updateItem: (updatedItem: any) => void;
      addItem: (newItem: any) => void;
      deleteItem: (id: string) => void;
    };
  };

  export type Category = {
        label: string;
        value: string;
        icon: string;
  }

  export type Unit = {
    id: string;
    label: string;
  }
  
  export interface InventoryItem {
    id: string;
    name: string;
    stage: string | null;
    qty: number;
    minStock: number;
    unit: string;
    category: string;
    expiredDate: Date;
    needsRestock: boolean;
    createdAt: Date;
    itemLocation: string;
    memo: string;
    hasExpiredDate: boolean;
    hasStage: boolean;
  }

  export interface ShoppingListItem{
    id: string;
    name: string;
    qty: number;
    inventoryId?: string;
    isPurchased: boolean;
    createdAt: Date;
    memo?: string;
  }
  