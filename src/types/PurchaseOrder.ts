import type { POStatus } from "./Postatus";

export interface PurchaseOrder {
  _id: string;
  poNumber: string;
  supplierName: string;
  status: POStatus;
  products: any;
  totalItems: number;
  orderDate: string;
}
