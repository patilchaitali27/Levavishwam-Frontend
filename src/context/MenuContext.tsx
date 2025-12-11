import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/MenuApi";
import type { Menu } from "../types/menu";

interface MenuContextType {
  menus: Menu[];
  loading: boolean;
  error: string | null;
}

const MenuContext = createContext<MenuContextType>({
  menus: [],
  loading: false,
  error: null,
});

export const useMenuContext = () => useContext(MenuContext);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenus = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get<Menu[]>("/Menu");

      console.log("🔥 MENUS FROM API:", res.data);

      const activeMenus = res.data
        .filter((m) => m.isActive && !m.isAdminOnly)
        .sort((a, b) => a.orderNo - b.orderNo);

      setMenus(activeMenus);
    } catch (err) {
      console.error("❌ Menu Load Error:", err);
      setError("Failed to load menus");
      setMenus([]); // avoid undefined
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  return (
    <MenuContext.Provider value={{ menus, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
}
