// navigation/types.ts
export type RootStackParamList = {
    MainTabs: undefined;
    ItemDetail: {
      item: {
        id: number;
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
    };
  };
  
  export interface InventoryItem {
    id: number;
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
  