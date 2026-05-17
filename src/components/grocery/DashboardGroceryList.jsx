import { useState } from 'react';
import { useGroceryContext } from '../../context/GroceryContext';
import { useCurrency } from '../../hooks/useCurrency';
import { CATEGORIES, PREDEFINED_ITEMS, ALLOWED_UNITS, getCategoryColor } from '../../utils/helpers';
import { Check, Clock, Edit2, Trash2, X, Save } from 'lucide-react';
import clsx from 'clsx';

export default function DashboardGroceryList({ passedItems }) {
  const { togglePurchased, deleteGroceryItem, updateGroceryItem } = useGroceryContext();
  const { formatCurrency } = useCurrency();
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const filteredItems = (passedItems || []).filter(item => {
    if (filter === 'Pending' && item.purchased) return false;
    if (filter === 'Purchased' && !item.purchased) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    return true;
  });

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditFormData({
      itemName: item.itemName,
      quantity: item.quantity,
      unit: item.unit || 'pcs',
      price: item.price,
      category: item.category
    });
  };

  const handleEditChange = (e) => {
    setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemSelect = (e) => {
    const selectedId = e.target.value;
    const selectedItem = PREDEFINED_ITEMS.find(item => item.id === selectedId);
    if (selectedItem) {
      setEditFormData(prev => ({
        ...prev,
        itemName: selectedItem.name,
        category: selectedItem.category,
        unit: selectedItem.defaultUnit || 'pcs'
      }));
    }
  };

  const handleSaveEdit = (id) => {
    updateGroceryItem(id, {
      ...editFormData,
      quantity: editFormData.quantity ? Number(editFormData.quantity) : 1,
      price: Number(editFormData.price) || 0
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const getIcon = (name) => {
    const item = PREDEFINED_ITEMS.find(i => i.name === name);
    return item ? item.icon : '📦';
  };

  return (
    <div className="glass-card flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <h3 className="text-[15px] font-bold text-slate-800">Grocery List</h3>
          <div className="flex bg-[#F1F5F9] rounded-lg p-0.5">
            {['All', 'Pending', 'Purchased'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={clsx(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors",
                  filter === status 
                    ? "bg-white text-slate-800 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-sm font-semibold text-slate-700 bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#16A34A] mt-3 sm:mt-0"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-xs font-bold text-slate-700">
              <th className="py-3 px-6 w-12"></th>
              <th className="py-3 px-2 min-w-[200px]">Item</th>
              <th className="py-3 px-4 min-w-[120px]">Quantity</th>
              <th className="py-3 px-4 min-w-[150px]">Category</th>
              <th className="py-3 px-4 min-w-[120px]">Price (₹)</th>
              <th className="py-3 px-4 min-w-[120px]">Status</th>
              <th className="py-3 px-6 text-right min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]/60">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl mb-3">🛒</div>
                    <p className="text-slate-600 font-bold text-[15px]">No items found</p>
                    <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or add a new item.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredItems.map(item => {
                const isEditing = editingId === item.id;
                
                return (
                  <tr key={item.id} className={clsx("transition-colors group", isEditing ? "bg-slate-50" : "hover:bg-slate-50/50")}>
                    <td className="py-3 px-6">
                      <button 
                        onClick={() => togglePurchased(item.id)}
                        className={clsx(
                          "w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors",
                          item.purchased ? "bg-[#16A34A] border-[#16A34A]" : "border-slate-300 bg-white"
                        )}
                        disabled={isEditing}
                      >
                        {item.purchased && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </button>
                    </td>
                    
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-lg shadow-sm border border-slate-200/60 flex-shrink-0">
                          {getIcon(isEditing ? editFormData.itemName : item.itemName)}
                        </div>
                        {isEditing ? (
                          <select
                            name="itemSelect"
                            value={PREDEFINED_ITEMS.find(i => i.name === editFormData.itemName)?.id || ''}
                            onChange={handleItemSelect}
                            className="bg-white border border-[#E2E8F0] rounded px-2 py-1 text-sm font-bold w-full max-w-[200px] outline-none focus:border-[#16A34A]"
                          >
                            {CATEGORIES.map(cat => (
                              <optgroup key={cat.id} label={cat.label}>
                                {PREDEFINED_ITEMS.filter(pItem => pItem.category === cat.id).map(pItem => (
                                  <option key={pItem.id} value={pItem.id}>{pItem.name}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        ) : (
                          <span className="font-bold text-sm text-slate-800 truncate">{item.itemName}</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input 
                            type="number" 
                            name="quantity" 
                            value={editFormData.quantity} 
                            onChange={handleEditChange}
                            className="bg-white border border-[#E2E8F0] rounded px-2 py-1 text-sm font-medium w-[60px] outline-none focus:border-[#16A34A]"
                          />
                          <select
                            name="unit"
                            value={editFormData.unit}
                            onChange={handleEditChange}
                            className="bg-white border border-[#E2E8F0] rounded px-1 py-1 text-sm font-medium w-auto outline-none focus:border-[#16A34A]"
                          >
                            {ALLOWED_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                          </select>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-slate-600">
                          {item.quantity} {item.unit || 'pcs'}
                        </span>
                      )}
                    </td>
                    
                    <td className="py-3 px-4">
                      <span className={clsx("text-[10px] px-2.5 py-1 rounded-md font-bold whitespace-nowrap inline-block", getCategoryColor(isEditing ? editFormData.category : item.category))}>
                        {CATEGORIES.find(c => c.id === (isEditing ? editFormData.category : item.category))?.label}
                      </span>
                    </td>
                    
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input 
                          type="number" 
                          name="price" 
                          value={editFormData.price} 
                          onChange={handleEditChange}
                          className="bg-white border border-[#E2E8F0] rounded px-2 py-1 text-sm font-bold w-full max-w-[80px] outline-none focus:border-[#16A34A]"
                        />
                      ) : (
                        item.price > 0 ? (
                          <span className="font-bold text-sm text-slate-800">{formatCurrency(item.price)}</span>
                        ) : (
                          <span className="font-bold text-[13px] text-rose-500 bg-rose-50 px-2 py-0.5 rounded">Not Added</span>
                        )
                      )}
                    </td>
                    
                    <td className="py-3 px-4">
                      {item.purchased ? (
                        <div className="flex items-center gap-1.5 text-[#16A34A]">
                          <Check className="w-4 h-4" strokeWidth={3} />
                          <span className="text-xs font-bold">Purchased</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#EA580C]">
                          <Clock className="w-4 h-4" strokeWidth={2.5} />
                          <span className="text-xs font-bold">Pending</span>
                        </div>
                      )}
                    </td>
                    
                    <td className="py-3 px-6 text-right">
                      <div className={clsx("flex items-center justify-end gap-2 transition-opacity", isEditing ? "opacity-100" : "opacity-100 md:opacity-0 group-hover:opacity-100")}>
                        {isEditing ? (
                          <>
                            <button 
                              onClick={() => handleSaveEdit(item.id)}
                              className="w-8 h-8 rounded bg-[#F0FDF4] text-[#16A34A] hover:bg-[#DCFCE7] flex items-center justify-center border border-[#DCFCE7] shadow-sm"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="w-8 h-8 rounded bg-[#F1F5F9] text-slate-600 hover:bg-[#E2E8F0] flex items-center justify-center border border-[#E2E8F0] shadow-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEditClick(item)}
                              className="w-8 h-8 rounded bg-[#F0FDF4] text-[#16A34A] hover:bg-[#DCFCE7] flex items-center justify-center transition-colors border border-[#DCFCE7] shadow-sm"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteGroceryItem(item.id)}
                              className="w-8 h-8 rounded bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEE2E2] flex items-center justify-center transition-colors border border-[#FEE2E2] shadow-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
