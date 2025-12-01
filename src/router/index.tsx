import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import FoodDrinks from "../pages/Food-Drinks";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-drinks" element={<FoodDrinks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
