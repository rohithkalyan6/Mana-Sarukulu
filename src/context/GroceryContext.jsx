import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GroceryContext = createContext();

export function GroceryProvider({ children }) {
  // Resetting budget to 0 or null for production; 6000 is fine as a placeholder, but maybe 0 is better. Let's keep 6000 as default budget so math doesn't break, users can change it in settings.
  const [budget, setBudget] = useLocalStorage('grocify_budget', 6000); 

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const generateStarterData = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    
    // Create dates for 1 and 2 months ago
    const date1 = new Date(now.getFullYear(), now.getMonth() - 1, 15);
    const date2 = new Date(now.getFullYear(), now.getMonth() - 2, 10);
    
    return [
      { id: generateId(), itemName: 'Rice (బియ్యం)', category: 'grains', price: 1250, quantity: 25, unit: 'kg', purchased: true, createdAt: date1.toISOString(), month: monthNames[date1.getMonth()], year: date1.getFullYear(), isSample: true },
      { id: generateId(), itemName: 'Oil (నూనె)', category: 'cooking', price: 850, quantity: 5, unit: 'litre', purchased: true, createdAt: date1.toISOString(), month: monthNames[date1.getMonth()], year: date1.getFullYear(), isSample: true },
      { id: generateId(), itemName: 'Milk (పాలు)', category: 'dairy', price: 1050, quantity: 30, unit: 'litre', purchased: true, createdAt: date1.toISOString(), month: monthNames[date1.getMonth()], year: date1.getFullYear(), isSample: true },
      { id: generateId(), itemName: 'Wheat Flour (గోధుమ పిండి)', category: 'grains', price: 450, quantity: 10, unit: 'kg', purchased: true, createdAt: date2.toISOString(), month: monthNames[date2.getMonth()], year: date2.getFullYear(), isSample: true },
      { id: generateId(), itemName: 'Sugar (చక్కెర)', category: 'grains', price: 220, quantity: 5, unit: 'kg', purchased: true, createdAt: date2.toISOString(), month: monthNames[date2.getMonth()], year: date2.getFullYear(), isSample: true },
      { id: generateId(), itemName: 'Soap (సబ్బు)', category: 'personal', price: 320, quantity: 8, unit: 'pcs', purchased: true, createdAt: date2.toISOString(), month: monthNames[date2.getMonth()], year: date2.getFullYear(), isSample: true },
    ];
  };

  const [storedItems, setItems] = useLocalStorage('grocify_items_prod', generateStarterData());
  
  const items = Array.isArray(storedItems) ? storedItems : [];

  const loadStarterData = () => {
    if (window.confirm("This will add sample starter data to your history. Continue?")) {
      setItems([...generateStarterData(), ...items]);
    }
  };

  const addGroceryItem = (item) => {
    try {
      const now = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
      const newItem = { 
        ...item, 
        id: generateId(), 
        createdAt: now.toISOString(),
        month: monthNames[now.getMonth()],
        year: now.getFullYear()
      };
      setItems([newItem, ...items]);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const updateGroceryItem = (id, updatedFields) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updatedFields } : item));
  };

  const deleteGroceryItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const togglePurchased = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL grocery data? This cannot be undone.")) {
      setItems([]);
    }
  };

  const clearCurrentMonthData = () => {
    if (window.confirm("Are you sure you want to delete this month's grocery data?")) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const filteredItems = items.filter(item => {
        const itemDate = new Date(item.createdAt);
        return !(itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear);
      });
      
      setItems(filteredItems);
    }
  };

  const resetApplication = () => {
    if (window.confirm("DANGER: This will wipe EVERYTHING including settings, budget, and history. Continue?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <GroceryContext.Provider value={{
      budget,
      setBudget,
      items,
      addGroceryItem,
      updateGroceryItem,
      deleteGroceryItem,
      togglePurchased,
      clearAllData,
      clearCurrentMonthData,
      resetApplication,
      loadStarterData
    }}>
      {children}
    </GroceryContext.Provider>
  );
}

export function useGroceryContext() {
  return useContext(GroceryContext);
}
