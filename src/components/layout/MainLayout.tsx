import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="">
        <Header />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
