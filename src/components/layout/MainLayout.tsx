import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex w-full min-h-screen  ">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
