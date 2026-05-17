import { useState } from 'react';
import { useGroceryContext } from '../../context/GroceryContext';
import { CATEGORIES } from '../../utils/helpers';
import { Plus, X } from 'lucide-react';

export default function GroceryForm({ onClose }) {
  const { addGroceryItem } = useGroceryContext();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 1,
    price: '',
    category: 'grains',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName || !formData.price) return;
    
    addGroceryItem({
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      purchased: false,
    });
    
    if (onClose) onClose();
    
    // Reset form
    setFormData({ itemName: '', quantity: 1, price: '', category: 'grains' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Add New Item</h3>
        {onClose && (
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-text">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="e.g. Milk"
            className="input-field"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
