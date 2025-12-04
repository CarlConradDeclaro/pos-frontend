import type { POStatus } from "./Postatus";

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  status: POStatus;
  totalItems: number;
  scheduledDelivery: string;
}
