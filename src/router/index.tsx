import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import FoodDrinks from "../pages/Food-Drinks";
import PurchaseOrders from "../pages/Purchase-Orders";
import PurchaseOrder from "../components/Purchase-orders/po-details";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-drinks" element={<FoodDrinks />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />

          <Route path="/po-details/:id" element={<PurchaseOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
