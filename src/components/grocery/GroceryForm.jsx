import { useState, useEffect, useRef } from 'react';
import { useGroceryContext } from '../../context/GroceryContext';
import { CATEGORIES, PREDEFINED_ITEMS, ALLOWED_UNITS } from '../../utils/helpers';
import { Plus, X, Search } from 'lucide-react';

export default function GroceryForm({ onClose }) {
  const { addGroceryItem } = useGroceryContext();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 1,
    unit: 'pcs',
    price: '',
    category: 'grains',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName || !formData.price) return;
    
    addGroceryItem({
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      unit: formData.unit || 'pcs',
      category: formData.category || 'others',
      purchased: false,
    });
    
    if (onClose) onClose();
    
    // Reset form
    setFormData({ itemName: '', quantity: 1, unit: 'pcs', price: '', category: 'grains' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'itemName') {
      setIsDropdownOpen(true);
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
           category: 'others' // Default for custom items
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
    <div className="glass-card overflow-visible p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Add New Item</h3>
        {onClose && (
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative" ref={dropdownRef}>
          <label className="label-text">Item Name</label>
          <div className="relative">
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search or type custom item..."
              className="input-field pl-10 w-full"
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

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label-text">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="label-text">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input-field appearance-none bg-white"
            >
              {ALLOWED_UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">Price (₹)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-text">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field appearance-none bg-white"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-6">
          <Plus className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </form>
    </div>
  );
}
