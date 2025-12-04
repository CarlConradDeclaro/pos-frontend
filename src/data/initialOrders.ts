import type { PurchaseOrderData } from "../components/Purchase-orders/po-details";
import type { PurchaseOrder } from "../types/PurchaseOrder";

export const initialOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "#PO-00754",
    supplierName: "Metro Meats Inc.",
    status: "Delivered",
    totalItems: 12,
    scheduledDelivery: "Aug 28, 2024",
  },
  {
    id: "2",
    poNumber: "#PO-00753",
    supplierName: "Fresh Produce Co.",
    status: "Confirmed",
    totalItems: 8,
    scheduledDelivery: "Aug 30, 2024",
  },
  {
    id: "3",
    poNumber: "#PO-00752",
    supplierName: "Artisan Breads",
    status: "Sent",
    totalItems: 5,
    scheduledDelivery: "Sep 01, 2024",
  },
  {
    id: "4",
    poNumber: "#PO-00751",
    supplierName: "Dairy Farms Ltd.",
    status: "Draft",
    totalItems: 21,
    scheduledDelivery: "-",
  },
  {
    id: "5",
    poNumber: "#PO-00750",
    supplierName: "Metro Meats Inc.",
    status: "Delivered",
    totalItems: 15,
    scheduledDelivery: "Aug 25, 2024",
  },
  {
    id: "6",
    poNumber: "#PO-00749",
    supplierName: "Coastal Seafood",
    status: "Delivered",
    totalItems: 7,
    scheduledDelivery: "Aug 25, 2024",
  },
  {
    id: "7",
    poNumber: "#PO-00748",
    supplierName: "Fresh Produce Co.",
    status: "Delivered",
    totalItems: 9,
    scheduledDelivery: "Aug 24, 2024",
  },
  {
    id: "8",
    poNumber: "#PO-00748",
    supplierName: "Fresh Produce Co.",
    status: "Delivered",
    totalItems: 9,
    scheduledDelivery: "Aug 24, 2024",
  },
  {
    id: "9",
    poNumber: "#PO-00748",
    supplierName: "Fresh Produce Co.",
    status: "Delivered",
    totalItems: 9,
    scheduledDelivery: "Aug 24, 2024",
  },
  {
    id: "10",
    poNumber: "#PO-00748",
    supplierName: "Fresh Produce Co.",
    status: "Delivered",
    totalItems: 9,
    scheduledDelivery: "Aug 24, 2024",
  },
];
export const mockOrders: PurchaseOrderData[] = [
  // --- ORDER 1 ---
  {
    poNumber: "#PO-00754",
    supplierName: "Metro Meats Inc.",
    orderDate: "August 27, 2024",
    scheduledDelivery: "August 28, 2024",
    status: "Delivered",
    statusTimestamp: "Delivered on Aug 28, 2024 at 10:30 AM",
    notes:
      "Please ensure all steaks are at least 1.5 inches thick. Chicken breasts to be packed in 5kg bags.",
    items: [
      {
        id: "1",
        name: "Prime Ribeye Steak",
        quantity: "10 kg",
        unitPrice: 45,
        total: 450,
      },
      {
        id: "2",
        name: "Ground Beef (80/20)",
        quantity: "25 kg",
        unitPrice: 12.5,
        total: 312.5,
      },
      {
        id: "3",
        name: "Pork Sausages",
        quantity: "15 kg",
        unitPrice: 10,
        total: 150,
      },
      {
        id: "4",
        name: "Chicken Breast (Boneless)",
        quantity: "30 kg",
        unitPrice: 9.75,
        total: 292.5,
      },
    ],
    summary: { subtotal: 1205, taxRate: 0.08, deliveryFee: 25, total: 1326.4 },
  },

  // --- ORDER 2 ---
  {
    poNumber: "#PO-00755",
    supplierName: "Fresh Farms Produce",
    orderDate: "September 3, 2024",
    scheduledDelivery: "September 4, 2024",
    status: "Pending",
    statusTimestamp: "Expected delivery on Sep 4, 2024",
    notes: "Deliver early morning if possible.",
    items: [
      {
        id: "1",
        name: "Fresh Lettuce",
        quantity: "12 crates",
        unitPrice: 18,
        total: 216,
      },
      {
        id: "2",
        name: "Tomatoes",
        quantity: "15 crates",
        unitPrice: 20,
        total: 300,
      },
      {
        id: "3",
        name: "White Onions",
        quantity: "20 kg",
        unitPrice: 4.5,
        total: 90,
      },
    ],
    summary: { subtotal: 606, taxRate: 0.08, deliveryFee: 20, total: 673 },
  },

  // --- ORDER 3 ---
  {
    poNumber: "#PO-00756",
    supplierName: "AquaBlue Seafood Co.",
    orderDate: "September 10, 2024",
    scheduledDelivery: "September 11, 2024",
    status: "Cancelled",
    statusTimestamp: "Order cancelled on Sep 10, 2024 at 2:45 PM",
    notes: "Supplier could not fulfill the requested volume.",
    items: [
      {
        id: "1",
        name: "Salmon Fillet",
        quantity: "8 kg",
        unitPrice: 28.5,
        total: 228,
      },
      {
        id: "2",
        name: "Shrimp (Large)",
        quantity: "15 kg",
        unitPrice: 22,
        total: 330,
      },
    ],
    summary: { subtotal: 558, taxRate: 0.08, deliveryFee: 25, total: 625.64 },
  },

  // --- ORDER 4 ---
  {
    poNumber: "#PO-00757",
    supplierName: "Golden Grain Supplies",
    orderDate: "September 15, 2024",
    scheduledDelivery: "September 16, 2024",
    status: "Delivered",
    statusTimestamp: "Delivered on Sep 16, 2024 at 9:10 AM",
    notes: "Store rice in a dry area only.",
    items: [
      {
        id: "1",
        name: "Premium Jasmine Rice",
        quantity: "50 kg",
        unitPrice: 2.2,
        total: 110,
      },
      {
        id: "2",
        name: "Brown Rice",
        quantity: "40 kg",
        unitPrice: 2.5,
        total: 100,
      },
    ],
    summary: { subtotal: 210, taxRate: 0.08, deliveryFee: 15, total: 241.8 },
  },

  // --- ORDER 5 ---
  {
    poNumber: "#PO-00758",
    supplierName: "BakeWell Ingredients",
    orderDate: "September 18, 2024",
    scheduledDelivery: "September 19, 2024",
    status: "Draft",
    statusTimestamp: "",
    notes: "Pending approval from head chef.",
    items: [
      {
        id: "1",
        name: "All Purpose Flour",
        quantity: "30 kg",
        unitPrice: 1.8,
        total: 54,
      },
      {
        id: "2",
        name: "Yeast Packets",
        quantity: "100 pcs",
        unitPrice: 0.5,
        total: 50,
      },
      {
        id: "3",
        name: "Unsalted Butter",
        quantity: "15 kg",
        unitPrice: 6.5,
        total: 97.5,
      },
    ],
    summary: { subtotal: 201.5, taxRate: 0.08, deliveryFee: 15, total: 232.62 },
  },

  // --- ORDER 6 ---
  {
    poNumber: "#PO-00759",
    supplierName: "DairyFresh Supplies",
    orderDate: "September 20, 2024",
    scheduledDelivery: "September 21, 2024",
    status: "Pending",
    statusTimestamp: "Expected delivery on Sep 21, 2024",
    notes: "Keep refrigerated during delivery.",
    items: [
      {
        id: "1",
        name: "Whole Milk",
        quantity: "50 liters",
        unitPrice: 1.3,
        total: 65,
      },
      {
        id: "2",
        name: "Mozzarella Cheese",
        quantity: "20 kg",
        unitPrice: 6.8,
        total: 136,
      },
      {
        id: "3",
        name: "Cream Cheese",
        quantity: "10 kg",
        unitPrice: 5.2,
        total: 52,
      },
    ],
    summary: { subtotal: 253, taxRate: 0.08, deliveryFee: 20, total: 292.24 },
  },

  // --- ORDER 7 ---
  {
    poNumber: "#PO-00760",
    supplierName: "SpiceWorld Traders",
    orderDate: "September 22, 2024",
    scheduledDelivery: "September 23, 2024",
    status: "Delivered",
    statusTimestamp: "Delivered on Sep 23, 2024 at 1:20 PM",
    notes: "Keep spices sealed tightly.",
    items: [
      {
        id: "1",
        name: "Black Pepper",
        quantity: "5 kg",
        unitPrice: 12,
        total: 60,
      },
      {
        id: "2",
        name: "Paprika Powder",
        quantity: "5 kg",
        unitPrice: 10,
        total: 50,
      },
      {
        id: "3",
        name: "Turmeric Powder",
        quantity: "5 kg",
        unitPrice: 9,
        total: 45,
      },
    ],
    summary: { subtotal: 155, taxRate: 0.08, deliveryFee: 10, total: 177.4 },
  },

  // --- ORDER 8 ---
  {
    poNumber: "#PO-00761",
    supplierName: "CoolDrinks Co.",
    orderDate: "September 25, 2024",
    scheduledDelivery: "September 26, 2024",
    status: "Pending",
    statusTimestamp: "Awaiting supplier confirmation",
    notes: "Fragile glass bottles.",
    items: [
      {
        id: "1",
        name: "Lemon Soda",
        quantity: "100 bottles",
        unitPrice: 1.2,
        total: 120,
      },
      {
        id: "2",
        name: "Orange Soda",
        quantity: "80 bottles",
        unitPrice: 1.2,
        total: 96,
      },
    ],
    summary: { subtotal: 216, taxRate: 0.08, deliveryFee: 20, total: 253.28 },
  },

  // --- ORDER 9 ---
  {
    poNumber: "#PO-00762",
    supplierName: "Pasta Italia",
    orderDate: "September 28, 2024",
    scheduledDelivery: "September 29, 2024",
    status: "Delivered",
    statusTimestamp: "Delivered on Sep 29, 2024 at 11:45 AM",
    notes: "",
    items: [
      {
        id: "1",
        name: "Spaghetti",
        quantity: "40 kg",
        unitPrice: 3.1,
        total: 124,
      },
      {
        id: "2",
        name: "Fusilli",
        quantity: "40 kg",
        unitPrice: 3.4,
        total: 136,
      },
    ],
    summary: { subtotal: 260, taxRate: 0.08, deliveryFee: 15, total: 296.8 },
  },

  // --- ORDER 10 ---
  {
    poNumber: "#PO-00763",
    supplierName: "GreenLeaf Herbs",
    orderDate: "October 1, 2024",
    scheduledDelivery: "October 2, 2024",
    status: "Draft",
    statusTimestamp: "",
    notes: "New supplier – verify quality upon delivery.",
    items: [
      {
        id: "1",
        name: "Fresh Basil",
        quantity: "5 kg",
        unitPrice: 8,
        total: 40,
      },
      {
        id: "2",
        name: "Fresh Rosemary",
        quantity: "5 kg",
        unitPrice: 9,
        total: 45,
      },
      {
        id: "3",
        name: "Fresh Thyme",
        quantity: "5 kg",
        unitPrice: 7,
        total: 35,
      },
    ],
    summary: { subtotal: 120, taxRate: 0.08, deliveryFee: 12, total: 142.56 },
  },
];
