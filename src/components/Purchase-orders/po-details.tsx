import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Download,
  Pencil,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Sparkles,
  X,
  Loader2,
  Mail,
  ChefHat,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockOrders } from "../../data/initialOrders";
import { BASEURL } from "../../utils/baseurl";

// --- TYPES ---

export type POStatus = "Delivered" | "Pending" | "Cancelled" | "Draft";

export interface ProductItem {
  id: string;
  name: string;
  quantity: string;
  unitPrice: number;
  total: number;
}

export interface OrderSummary {
  subtotal: number;
  taxRate: number; // e.g., 0.08 for 8%
  deliveryFee: number;
  total: number;
}

export interface PurchaseOrderData {
  poNumber: string;
  supplierName: string;
  orderDate: string;
  scheduledDelivery: string;
  status: POStatus;
  statusTimestamp?: string;
  items: ProductItem[];
  summary: OrderSummary;
  notes?: string;
}

interface PurchaseOrderDetailProps {
  order: PurchaseOrderData;
  onBack?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
}

// --- SUB-COMPONENTS ---

const StatusBadge: React.FC<{ status: POStatus }> = ({ status }) => {
  const styles = {
    Delivered: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    Draft: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const icons = {
    Delivered: <CheckCircle size={16} className="mr-1.5" />,
    Pending: <Clock size={16} className="mr-1.5" />,
    Cancelled: <AlertCircle size={16} className="mr-1.5" />,
    Draft: <FileText size={16} className="mr-1.5" />,
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
        styles[status] || styles.Draft
      }`}
    >
      {icons[status]}
      {status}
    </span>
  );
};

// --- MAIN COMPONENT ---

const PurchaseOrderDetail: React.FC<PurchaseOrderDetailProps> = ({
  order,
  onBack,
  onDownload,
  onEdit,
}) => {
  // --- AI STATE & LOGIC ---
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [aiTitle, setAiTitle] = useState("");

  const apiKey = import.meta.env.VITE_AI_API_KEY; // for Vite

  const callGemini = async (prompt: string, title: string) => {
    setAiTitle(title);
    setIsAiModalOpen(true);
    setAiLoading(true);
    setAiContent("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setAiContent(generatedText);
      } else {
        setAiContent("Sorry, I couldn't generate a response at this time.");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setAiContent("An error occurred while connecting to the AI service.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleDraftEmail = () => {
    const prompt = `
      You are an assistant for a restaurant manager. 
      Write a professional email to the supplier "${
        order.supplierName
      }" regarding Purchase Order "${order.poNumber}".
      
      Order Details:
      - Date: ${order.orderDate}
      - Status: ${order.status}
      - Items: ${order.items.map((i) => i.name).join(", ")}
      
      Context:
      If the status is "Pending", politely ask for an estimated delivery time.
      If the status is "Draft", ask for a quote for these items.
      For the last sentence dont say Thank you for your assistance. Please let us know if you require any further information from our side.
      Keep the tone professional yet friendly. concise.
    `;
    callGemini(prompt, "Draft Email to Supplier");
  };

  const handleAnalyzeOrder = () => {
    const prompt = `
      You are a head chef's assistant. Analyze this purchase order:
      Items: ${order.items.map((i) => `${i.name} (${i.quantity})`).join(", ")}.
      
      Please provide two things:
      1. Storage Advice: Brief bullet points on how to best store these specific perishables to maximize freshness.
      2. Menu Specials: Suggest 3 creative restaurant menu specials that could be created using these main ingredients.
      3. Dont say something like "prompt" in the end of the email
      Format with clear headings.

    `;
    callGemini(prompt, "Order Analysis & Menu Ideas");
  };

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans relative">
      <div className="max-w-6xl mx-auto">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <button
              onClick={onBack}
              className="flex items-center text-gray-500 hover:text-gray-800 transition-colors text-sm w-fit"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Purchase Orders
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Purchase Order {order.poNumber}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* AI Feature 1: Draft Email */}
            <button
              onClick={handleDraftEmail}
              className="flex items-center justify-center px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors shadow-sm"
            >
              <Sparkles size={16} className="mr-2" />
              Draft Email
            </button>

            <button
              onClick={onDownload}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Download size={18} className="mr-2" />
              PDF
            </button>
            <button
              onClick={onEdit}
              className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors shadow-sm"
            >
              <Pencil size={18} className="mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* 2. Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (Details & List) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Supplier Name</p>
                  <p className="font-medium text-gray-900">
                    {order.supplierName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">PO Number</p>
                  <p className="font-medium text-gray-900">{order.poNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium text-gray-900">{order.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Scheduled Delivery
                  </p>
                  <p className="font-medium text-gray-900">
                    {order.scheduledDelivery}
                  </p>
                </div>
              </div>
            </div>

            {/* Product List Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Product List
                </h2>

                {/* AI Feature 2: Analyze Order */}
                <button
                  onClick={handleAnalyzeOrder}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 text-indigo-600 rounded-full border border-indigo-100 hover:from-purple-100 hover:to-indigo-100 transition-all font-medium"
                >
                  <Sparkles size={12} />
                  Analyze & Suggest
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-500 text-sm">
                      <th className="py-4 px-6 font-semibold">Product Name</th>
                      <th className="py-4 px-6 font-semibold text-center">
                        Quantity
                      </th>
                      <th className="py-4 px-6 font-semibold text-right">
                        Unit Price
                      </th>
                      <th className="py-4 px-6 font-semibold text-right">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 text-center">
                          {item.quantity}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 text-right">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Summary, Status, Notes) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(order.summary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    Taxes ({(order.summary.taxRate * 100).toFixed(0)}%)
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(
                      order.summary.subtotal * order.summary.taxRate
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(order.summary.deliveryFee)}
                  </span>
                </div>
                <div className="border-t border-dashed border-gray-200 my-4 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">
                    Total Cost
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(order.summary.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Status</h2>
              <div className="mb-4">
                <StatusBadge status={order.status} />
              </div>
              {order.statusTimestamp && (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {order.statusTimestamp}
                </p>
              )}
            </div>

            {/* Notes Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Notes</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {order.notes || "No notes for this order."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- AI MODAL --- */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAiModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <Sparkles size={20} className="text-indigo-200" />
                <h3 className="font-semibold text-lg">{aiTitle}</h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto bg-slate-50 min-h-[200px]">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Loader2
                    size={32}
                    className="animate-spin text-indigo-500 mb-3"
                  />
                  <p>Consulting with Gemini...</p>
                </div>
              ) : (
                <div className="prose prose-sm prose-indigo max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {aiContent}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!aiLoading && (
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(aiContent);
                    // Optional: Add toast notification here
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- EXAMPLE USAGE WRAPPER ---
const PurchaseOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const back = useNavigate();

  const [order, setOrder] = useState<PurchaseOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("id is:", id);

    if (!id) return;

    const fetchPO = async () => {
      try {
        const res = await fetch(`${BASEURL}api/purchase-orders/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch PO: ${res.status}`);
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch PO");
        }

        // Transform backend PO data to match PurchaseOrderData interface
        const backendPO = data.data;
        const formattedPO: PurchaseOrderData = {
          poNumber: backendPO.poNumber,
          supplierName: backendPO.supplierName || "Unknown Supplier",
          orderDate: new Date(backendPO.orderDate).toLocaleDateString(),
          scheduledDelivery: backendPO.scheduledDelivery
            ? new Date(backendPO.scheduledDelivery).toLocaleDateString()
            : "Not Scheduled",
          status: backendPO.status,
          statusTimestamp: backendPO.statusTimestamp
            ? new Date(backendPO.statusTimestamp).toLocaleString()
            : undefined,
          items: backendPO.products.map((p: any) => ({
            id: p.product._id,
            name: p.product.name,
            quantity: String(p.quantity),
            unitPrice: Number(p.unitPriceSnapshot),
            total: Number(p.amount),
          })),
          summary: {
            subtotal: Number(backendPO.subtotal),
            taxRate: backendPO.tax
              ? Number(backendPO.tax) / Number(backendPO.subtotal)
              : 0,
            deliveryFee: backendPO.deliveryFee
              ? Number(backendPO.deliveryFee)
              : 0,
            total: Number(backendPO.total),
          },
          notes: backendPO.note || "",
        };

        setOrder(formattedPO);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching purchase order.");
      } finally {
        setLoading(false);
      }
    };

    fetchPO();
  }, [id]);

  if (loading) return <div>Loading PO...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>No Purchase Order found.</div>;

  return (
    <PurchaseOrderDetail
      order={order}
      onBack={() => back("/purchase-orders")}
      onDownload={() => console.log("Download clicked")}
      onEdit={() => console.log("Edit clicked")}
    />
  );
};

export default PurchaseOrder;
