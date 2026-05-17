import { useState, useEffect } from 'react';
import { useGroceryContext } from '../../context/GroceryContext';
import { CATEGORIES, PREDEFINED_ITEMS, ALLOWED_UNITS } from '../../utils/helpers';
import clsx from 'clsx';

export default function InlineGroceryForm() {
  const { addGroceryItem } = useGroceryContext();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    unit: 'pcs',
    price: '',
    category: '',
  });

  // Quick Add Chips
  const quickAddItems = ['rice', 'milk', 'eggs', 'tomato', 'soap'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName) return;
    
    addGroceryItem({
      ...formData,
      price: formData.price ? Number(formData.price) : 0,
      quantity: formData.quantity ? Number(formData.quantity) : 1,
      unit: formData.unit || 'pcs',
      purchased: false,
    });
    
    setFormData({ itemName: '', quantity: '', unit: 'pcs', price: '', category: '' });
  };

  const handleItemSelect = (e) => {
    const selectedId = e.target.value;
    const selectedItem = PREDEFINED_ITEMS.find(item => item.id === selectedId);
    if (selectedItem) {
      setFormData(prev => ({
        ...prev,
        itemName: selectedItem.name,
        category: selectedItem.category,
        unit: selectedItem.defaultUnit || 'pcs'
      }));
    } else {
      setFormData(prev => ({ ...prev, itemName: '' }));
    }
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
  };

  return (
    <div id="add-item-form" className="glass-card p-5 md:p-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-[15px] font-bold text-slate-800">Add Grocery Item</h3>
        
        {/* Quick Add Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-500 py-1">Quick Add:</span>
          {quickAddItems.map(id => {
            const item = PREDEFINED_ITEMS.find(i => i.id === id);
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
        <div className="flex-1 w-full">
          <label className="label-text">Item</label>
          <select
            name="itemSelect"
            value={PREDEFINED_ITEMS.find(i => i.name === formData.itemName)?.id || ''}
            onChange={handleItemSelect}
            className="input-field appearance-none bg-white py-3 md:py-2.5"
            required
          >
            <option value="" disabled>Select Grocery Item</option>
            {CATEGORIES.map(cat => (
              <optgroup key={cat.id} label={cat.label}>
                {PREDEFINED_ITEMS.filter(item => item.category === cat.id).map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
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
