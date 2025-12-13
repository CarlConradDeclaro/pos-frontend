import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import FoodDrinks from "../pages/Food-Drinks";
// import PurchaseOrders from "../pages/Purchase-Orders";
import PurchaseOrder from "../components/Purchase-orders/po-details";
import Orders from "../pages/Orders";
import Inventory from "../pages/inventory";
import Restock from "../pages/restock";
import SupplyOrderHistory from "../pages/supply-order-history";
import MenuRecipe from "../pages/menu-recipe";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-drinks" element={<FoodDrinks />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/supplier-orders" element={<Restock />} />

          <Route
            path="/supplier-orders-history"
            element={<SupplyOrderHistory />}
          />

          <Route path="/menu-recipes" element={<MenuRecipe />} />

          {/* <Route path="/purchase-orders" element={<PurchaseOrders />} /> */}

          <Route path="/po-details/:id" element={<PurchaseOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
