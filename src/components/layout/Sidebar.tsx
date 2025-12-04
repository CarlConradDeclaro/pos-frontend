import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  MessageSquare,
  Receipt,
  ScrollText,
  Settings,
  Mail,
  HelpCircle,
  Briefcase,
  Store,
} from "lucide-react";

// --- UTILITY FUNCTION (Simplified cn) ---
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean };
const cn = (...inputs: ClassValue[]): string => {
  const classes = inputs.flat().filter(Boolean);
  return classes.join(" ");
};

// --- MOCK DATA & TYPES ---
interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: UtensilsCrossed,
    label: "Food & Drinks",
    href: "/food-drinks",
  },
  { icon: ScrollText, label: "Purchase Orders", href: "/purchase-orders" },

  { icon: Settings, label: "Settings", href: "" },
];

const OTHER_MENU_ITEMS: MenuItem[] = [
  { icon: Mail, label: "Notifications", href: "/notifications", badge: 3 },
  { icon: HelpCircle, label: "Support", href: "/support" },
];

// --- SUB-COMPONENT: Sidebar Item ---
const SidebarItem: React.FC<{ item: MenuItem }> = ({ item }) => {
  const Icon = item.icon;
  const { pathname } = useLocation();
  return (
    // Link replacement with Tailwind styles matching the design
    <Link
      to={item.href}
      className={cn(
        "w-[200px] flex items-center p-3 mb-2 rounded-xl cursor-pointer transition-colors duration-200 font-medium text-[#1F2937] hover:text-dark hover:shadow-sm",
        pathname === item.href
          ? "bg-[#FFC107] text-[#1F2937] shadow-md hover:bg-[#FFC107]"
          : "text-[#1F2937]/80 hover:bg-gray-100"
      )}
    >
      <Icon
        className="w-5 h-5 mr-4"
        style={{
          color: item.active ? "#1F2937" : "#1F2937",
        }}
      />
      <span>{item.label}</span>
      {item.badge !== undefined && (
        <span className="ml-auto bg-[#FFC107] text-[#1F2937] text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
          {item.badge}
        </span>
      )}
    </Link>
  );
};

// --- MAIN COMPONENT: Sidebar ---
function Sidebar() {
  return (
    <div className=" bg-white-500 h-screen  flex flex-col p-6  border-r border-gray-100 shadow-xl shadow-gray-50/10">
      {/* 1. Logo Section */}
      <div className="flex items-center mb-12 gap-3">
        <div className="bg-[#EF4444] p-2 rounded-lg">
          {/* Using Briefcase/Store to approximate the POS icon */}
          <Briefcase className="text-white w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#EF4444] tracking-tight">
          SmartPOS
        </h1>
      </div>

      {/* 2. Main Navigation */}
      <nav className="mb-10">
        {MAIN_MENU_ITEMS.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>

      {/* 3. Other Navigation */}
      <div className="mb-10">
        <h3 className="text-[#9CA3AF] text-sm font-medium mb-4 uppercase tracking-wider">
          Other
        </h3>
        {OTHER_MENU_ITEMS.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>

      {/* 4. User Profile Card (Pushed to bottom) */}
      <div className="mt-auto p-4 rounded-3xl text-center shadow-inner bg-gray-50/50">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="Theresa Webb"
          className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-white shadow-md"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/60x60/FFC107/FFF?text=TW";
          }}
        />
        <h4 className="font-bold text-lg text-[#1F2937]">Theresa Webb</h4>
        <p className="text-[#9CA3AF] text-sm mb-6">Waiter · 4h 56m</p>

        <button className="bg-gray-100 text-[#1F2937] font-semibold py-3 px-6 rounded-xl w-full hover:bg-gray-200 transition-colors shadow-sm">
          Open profile
        </button>
      </div>

      {/* 5. Footer Text */}
      <p className="text-center text-[#9CA3AF] text-xs mt-6">
        © 2020 SmartPOS App
      </p>
    </div>
  );
}

export default Sidebar;
