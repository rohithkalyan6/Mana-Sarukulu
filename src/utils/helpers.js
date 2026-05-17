export const ALLOWED_UNITS = ['kg', 'g', 'litre', 'ml', 'pcs', 'dozen', 'packet', 'box'];

export const CATEGORIES = [
  { id: 'grains', label: 'Grains', color: 'bg-[#FFF7ED] text-[#EA580C]', dot: '#EA580C' },
  { id: 'cooking', label: 'Cooking Essentials', color: 'bg-[#F0FDF4] text-[#16A34A]', dot: '#16A34A' },
  { id: 'dairy', label: 'Dairy', color: 'bg-[#EFF6FF] text-[#3B82F6]', dot: '#3B82F6' },
  { id: 'personal', label: 'Personal Care', color: 'bg-[#FAF5FF] text-[#9333EA]', dot: '#9333EA' },
  { id: 'others', label: 'Others', color: 'bg-[#F1F5F9] text-[#64748B]', dot: '#64748B' },
];

export const PREDEFINED_ITEMS = [
  // Grains
  { id: 'rice', name: 'Rice (బియ్యం)', category: 'grains', icon: '🍚', defaultUnit: 'kg' },
  { id: 'wheat', name: 'Wheat Flour (గోధుమ పిండి)', category: 'grains', icon: '🌾', defaultUnit: 'kg' },
  { id: 'sugar', name: 'Sugar (చక్కెర)', category: 'grains', icon: '🧊', defaultUnit: 'kg' },
  { id: 'salt', name: 'Salt (ఉప్పు)', category: 'grains', icon: '🧂', defaultUnit: 'packet' },
  { id: 'dal', name: 'Dal/Lentils (పప్పు)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  // Dairy
  { id: 'milk', name: 'Milk (పాలు)', category: 'dairy', icon: '🥛', defaultUnit: 'litre' },
  { id: 'curd', name: 'Curd (పెరుగు)', category: 'dairy', icon: '🥣', defaultUnit: 'packet' },
  { id: 'butter', name: 'Butter (వెన్న)', category: 'dairy', icon: '🧈', defaultUnit: 'g' },
  { id: 'cheese', name: 'Cheese (జున్ను)', category: 'dairy', icon: '🧀', defaultUnit: 'g' },
  // Vegetables
  { id: 'tomato', name: 'Tomato (టమాటా)', category: 'others', icon: '🍅', defaultUnit: 'kg' },
  { id: 'onion', name: 'Onion (ఉల్లిపాయ)', category: 'others', icon: '🧅', defaultUnit: 'kg' },
  { id: 'potato', name: 'Potato (బంగాళాదుంప)', category: 'others', icon: '🥔', defaultUnit: 'kg' },
  { id: 'vegetables', name: 'Mixed Veggies (కూరగాయలు)', category: 'others', icon: '🥗', defaultUnit: 'kg' },
  // Household & Personal
  { id: 'soap', name: 'Soap (సబ్బు)', category: 'personal', icon: '🧼', defaultUnit: 'pcs' },
  { id: 'detergent', name: 'Detergent (డిటర్జెంట్)', category: 'personal', icon: '🧴', defaultUnit: 'kg' },
  { id: 'shampoo', name: 'Shampoo (షాంపూ)', category: 'personal', icon: '🧴', defaultUnit: 'ml' },
  { id: 'toothpaste', name: 'Toothpaste (టూత్‌పేస్ట్)', category: 'personal', icon: '🪥', defaultUnit: 'pcs' },
  // Snacks & Others
  { id: 'biscuits', name: 'Biscuits (బిస్కెట్లు)', category: 'others', icon: '🍪', defaultUnit: 'packet' },
  { id: 'eggs', name: 'Eggs (గుడ్లు)', category: 'dairy', icon: '🥚', defaultUnit: 'pcs' },
  { id: 'oil', name: 'Oil (నూనె)', category: 'cooking', icon: '🫙', defaultUnit: 'litre' },
  { id: 'chicken', name: 'Chicken (చికెన్)', category: 'others', icon: '🍗', defaultUnit: 'kg' },
  { id: 'tea', name: 'Tea Powder (టీ పొడి)', category: 'others', icon: '🍵', defaultUnit: 'g' },
  { id: 'banana', name: 'Banana (అరటికాయ)', category: 'others', icon: '🍌', defaultUnit: 'dozen' }
];

export const getCategoryColor = (categoryId) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category ? category.color : 'bg-[#F1F5F9] text-[#64748B]';
};

export const getCategoryDot = (categoryId) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category ? category.dot : '#64748B';
};
