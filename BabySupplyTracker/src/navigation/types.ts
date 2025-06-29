// navigation/types.ts
export type RootStackParamList = {
    MainTabs: undefined;
    ItemDetail: {
      item: {
        id: string;
        name: string;
        stage: string | null;
        qty: number;
        minStock: number;
        unit: string;
        category: string;
        expiredDate: Date | null;
        needsRestock: boolean;
        createdAt: Date;
        itemLocation: string;
        memo: string;
        hasExpiredDate: boolean;
        hasStage: boolean;

      };
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
  