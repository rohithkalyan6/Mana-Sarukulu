import { useState, useEffect, useRef } from 'react';
import { useGroceryContext } from '../../context/GroceryContext';
import { CATEGORIES, PREDEFINED_ITEMS, ALLOWED_UNITS } from '../../utils/helpers';
import clsx from 'clsx';
import { Plus, Search } from 'lucide-react';

export default function InlineGroceryForm() {
  const { addGroceryItem } = useGroceryContext();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    unit: 'pcs',
    price: '',
    category: '',
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quick Add Chips
  const quickAddItems = ['sona_masuri', 'milk', 'eggs', 'tomato', 'soap'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName) return;
    
    addGroceryItem({
      ...formData,
      price: formData.price ? Number(formData.price) : 0,
      quantity: formData.quantity ? Number(formData.quantity) : 1,
      unit: formData.unit || 'pcs',
      category: formData.category || 'others',
      purchased: false,
    });
    
    setFormData({ itemName: '', quantity: '', unit: 'pcs', price: '', category: '' });
  };

  const handleQuickAdd = (id) => {
    const selectedItem = PREDEFINED_ITEMS.find(item => item.id === id);
    if (selectedItem) {
      setFormData(prev => ({
        ...prev,
        itemName: selectedItem.name,
        category: selectedItem.category,
        unit: selectedItem.defaultUnit || 'pcs'
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'itemName') {
      setIsDropdownOpen(true);
      // Auto-detect category and unit if exactly matches a predefined item
      const matched = PREDEFINED_ITEMS.find(item => item.name.toLowerCase() === value.toLowerCase());
      if (matched) {
        setFormData(prev => ({
           ...prev, 
           category: matched.category,
           unit: matched.defaultUnit || 'pcs'
        }));
      } else {
        setFormData(prev => ({
           ...prev, 
           category: 'others' // default to others for custom items
        }));
      }
    }
  };

  const handleSelectFromDropdown = (item) => {
    setFormData(prev => ({
      ...prev,
      itemName: item.name,
      category: item.category,
      unit: item.defaultUnit || 'pcs'
    }));
    setIsDropdownOpen(false);
  };

  const filteredItems = PREDEFINED_ITEMS.filter(item => 
    item.name.toLowerCase().includes(formData.itemName.toLowerCase())
  );

  const groupedItems = CATEGORIES.map(cat => ({
    ...cat,
    items: filteredItems.filter(item => item.category === cat.id)
  })).filter(cat => cat.items.length > 0);

  return (
    <div id="add-item-form" className="glass-card overflow-visible p-5 md:p-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-[15px] font-bold text-slate-800">Add Grocery Item</h3>
        
        {/* Quick Add Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-500 py-1">Quick Add:</span>
          {quickAddItems.map(id => {
            const item = PREDEFINED_ITEMS.find(i => i.id === id);
            if (!item) return null;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleQuickAdd(id)}
                className="text-[11px] font-bold bg-[#F1F5F9] text-slate-600 px-2.5 py-1 rounded-md border border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-slate-800 transition-colors"
              >
                {item.icon} {item.name.split(' ')[0]}
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full">
        <div className="flex-1 w-full relative" ref={dropdownRef}>
          <label className="label-text">Item</label>
          <div className="relative">
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search or type custom item..."
              className="input-field py-3 md:py-2.5 w-full pl-10"
              required
              autoComplete="off"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-[#E2E8F0] rounded-xl shadow-xl max-h-64 overflow-y-auto">
              <ul className="py-2">
                {groupedItems.length > 0 ? (
                  groupedItems.map(category => (
                    <div key={category.id}>
                      <div className="px-4 py-1.5 text-xs font-bold text-slate-500 bg-slate-50 uppercase tracking-wider sticky top-0 z-10">
                        {category.label}
                      </div>
                      {category.items.map(item => (
                        <li 
                          key={item.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSelectFromDropdown(item);
                          }}
                          className="px-4 py-2.5 hover:bg-slate-100 cursor-pointer text-sm text-slate-700 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </li>
                      ))}
                    </div>
                  ))
                ) : (
                  <li className="px-4 py-4 text-sm text-slate-500 text-center flex flex-col items-center gap-2">
                    <Search className="w-5 h-5 text-slate-300" />
                    <span>Item not found? Type manually.</span>
                  </li>
                )}
                
                {formData.itemName && !filteredItems.some(i => i.name.toLowerCase() === formData.itemName.toLowerCase()) && (
                  <li 
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-3 border-t border-slate-100 bg-[#EFF6FF] hover:bg-[#DBEAFE] cursor-pointer text-sm font-semibold text-blue-700 flex items-center gap-2 transition-colors sticky bottom-0 z-20"
                  >
                    <Plus className="w-4 h-4" />
                    + Add "{formData.itemName}" as Custom Item
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 md:w-20">
            <label className="label-text">Qty</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 1"
              min="1"
              className="input-field py-3 md:py-2.5"
            />
          </div>
          <div className="flex-1 md:w-24">
            <label className="label-text">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input-field appearance-none bg-white py-3 md:py-2.5"
            >
              {ALLOWED_UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 w-full md:flex-1">
          <div className="flex-1">
            <label className="label-text">Price (₹)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 120"
              className="input-field py-3 md:py-2.5"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full md:w-auto px-6 py-3 md:py-2.5 mb-0.5 whitespace-nowrap h-[46px] md:h-10 mt-2 md:mt-0">
          Add Item
        </button>
      </form>
    </div>
  );
}
