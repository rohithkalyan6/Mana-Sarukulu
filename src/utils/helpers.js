export const ALLOWED_UNITS = ['kg', 'g', 'litre', 'ml', 'pcs', 'dozen', 'packet', 'box'];

export const CATEGORIES = [
  { id: 'grains', label: 'Grains', color: 'bg-[#FFF7ED] text-[#EA580C]', dot: '#EA580C' },
  { id: 'cooking', label: 'Cooking Essentials', color: 'bg-[#F0FDF4] text-[#16A34A]', dot: '#16A34A' },
  { id: 'dairy', label: 'Dairy', color: 'bg-[#EFF6FF] text-[#3B82F6]', dot: '#3B82F6' },
  { id: 'personal', label: 'Personal Care', color: 'bg-[#FAF5FF] text-[#9333EA]', dot: '#9333EA' },
  { id: 'others', label: 'Others', color: 'bg-[#F1F5F9] text-[#64748B]', dot: '#64748B' },
];

export const PREDEFINED_ITEMS = [
  // Rice & Grains
  { id: 'sona_masuri', name: 'Sona Masuri Rice (సోనా మసూరి బియ్యం)', category: 'grains', icon: '🍚', defaultUnit: 'kg' },
  { id: 'basmati', name: 'Basmati Rice (బాస్మతి బియ్యం)', category: 'grains', icon: '🍚', defaultUnit: 'kg' },
  { id: 'brown_rice', name: 'Brown Rice (బ్రౌన్ రైస్)', category: 'grains', icon: '🌾', defaultUnit: 'kg' },
  { id: 'wheat', name: 'Wheat (గోధుమలు)', category: 'grains', icon: '🌾', defaultUnit: 'kg' },
  
  // Pulses & Dals
  { id: 'toor_dal', name: 'Toor Dal (కందిపప్పు)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'urad_dal', name: 'Urad Dal (మినప్పప్పు)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'moong_dal', name: 'Moong Dal (పెసరపప్పు)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'chana_dal', name: 'Chana Dal (సెనగపప్పు)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'masoor_dal', name: 'Masoor Dal (మసూర్ పప్పు)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'green_gram', name: 'Green Gram (పెసలు)', category: 'grains', icon: '🌱', defaultUnit: 'kg' },
  { id: 'black_gram', name: 'Black Gram (మినుములు)', category: 'grains', icon: '🌱', defaultUnit: 'kg' },

  // Rava & Flours
  { id: 'idli_rava', name: 'Idli Rava (ఇడ్లీ రవ్వ)', category: 'grains', icon: '🍚', defaultUnit: 'kg' },
  { id: 'upma_rava', name: 'Upma Rava (ఉప్మా రవ్వ)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'bombay_rava', name: 'Bombay Rava (బొంబాయి రవ్వ)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'wheat_flour', name: 'Wheat Flour (గోధుమ పిండి)', category: 'grains', icon: '🌾', defaultUnit: 'kg' },
  { id: 'rice_flour', name: 'Rice Flour (బియ్యపు పిండి)', category: 'grains', icon: '🌾', defaultUnit: 'kg' },
  { id: 'besan', name: 'Besan Flour (సెనగపిండి)', category: 'grains', icon: '🥣', defaultUnit: 'kg' },
  { id: 'corn_flour', name: 'Corn Flour (మొక్కజొన్న పిండి)', category: 'grains', icon: '🌽', defaultUnit: 'kg' },
  { id: 'ragi_flour', name: 'Ragi Flour (రాగి పిండి)', category: 'grains', icon: '🌾', defaultUnit: 'kg' },

  // Oils
  { id: 'sunflower_oil', name: 'Sunflower Oil (సన్ఫ్లవర్ నూనె)', category: 'cooking', icon: '🌻', defaultUnit: 'litre' },
  { id: 'groundnut_oil', name: 'Groundnut Oil (వేరుశెనగ నూనె)', category: 'cooking', icon: '🥜', defaultUnit: 'litre' },
  { id: 'sesame_oil', name: 'Sesame Oil (నువ్వుల నూనె)', category: 'cooking', icon: '🫙', defaultUnit: 'litre' },
  { id: 'coconut_oil', name: 'Coconut Oil (కొబ్బరి నూనె)', category: 'cooking', icon: '🥥', defaultUnit: 'litre' },

  // Spices
  { id: 'turmeric', name: 'Turmeric Powder (పసుపు)', category: 'cooking', icon: '🟡', defaultUnit: 'g' },
  { id: 'chilli', name: 'Chilli Powder (కారం పొడి)', category: 'cooking', icon: '🌶️', defaultUnit: 'g' },
  { id: 'coriander', name: 'Coriander Powder (ధనియాల పొడి)', category: 'cooking', icon: '🌿', defaultUnit: 'g' },
  { id: 'garam_masala', name: 'Garam Masala (గరం మసాలా)', category: 'cooking', icon: '🥘', defaultUnit: 'g' },
  { id: 'mustard', name: 'Mustard Seeds (ఆవాలు)', category: 'cooking', icon: '⚫', defaultUnit: 'g' },
  { id: 'cumin', name: 'Cumin Seeds (జీలకర్ర)', category: 'cooking', icon: '🟤', defaultUnit: 'g' },
  { id: 'salt', name: 'Salt (ఉప్పు)', category: 'cooking', icon: '🧂', defaultUnit: 'kg' },
  { id: 'sugar', name: 'Sugar (చక్కెర)', category: 'cooking', icon: '🧊', defaultUnit: 'kg' },

  // Breakfast & Dry Fruits
  { id: 'poha', name: 'Poha (అటుకులు)', category: 'others', icon: '🥣', defaultUnit: 'kg' },
  { id: 'vermicelli', name: 'Vermicelli (సేమ్యా)', category: 'others', icon: '🍜', defaultUnit: 'packet' },
  { id: 'oats', name: 'Oats (ఓట్స్)', category: 'others', icon: '🥣', defaultUnit: 'kg' },
  { id: 'cashews', name: 'Cashews (జీడిపప్పు)', category: 'others', icon: '🥜', defaultUnit: 'g' },
  { id: 'almonds', name: 'Almonds (బాదం)', category: 'others', icon: '🥜', defaultUnit: 'g' },
  { id: 'raisins', name: 'Raisins (కిస్మిస్)', category: 'others', icon: '🍇', defaultUnit: 'g' },

  // Dairy
  { id: 'milk', name: 'Milk (పాలు)', category: 'dairy', icon: '🥛', defaultUnit: 'litre' },
  { id: 'curd', name: 'Curd (పెరుగు)', category: 'dairy', icon: '🥣', defaultUnit: 'packet' },
  { id: 'butter', name: 'Butter (వెన్న)', category: 'dairy', icon: '🧈', defaultUnit: 'g' },
  { id: 'cheese', name: 'Cheese (జున్ను)', category: 'dairy', icon: '🧀', defaultUnit: 'g' },
  { id: 'eggs', name: 'Eggs (గుడ్లు)', category: 'dairy', icon: '🥚', defaultUnit: 'pcs' },

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
  { id: 'tea', name: 'Tea Powder (టీ పొడి)', category: 'others', icon: '🍵', defaultUnit: 'g' },
  { id: 'banana', name: 'Banana (అరటికాయ)', category: 'others', icon: '🍌', defaultUnit: 'dozen' },
  { id: 'chicken', name: 'Chicken (చికెన్)', category: 'others', icon: '🍗', defaultUnit: 'kg' },
];

export const getCategoryColor = (categoryId) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category ? category.color : 'bg-[#F1F5F9] text-[#64748B]';
};

export const getCategoryDot = (categoryId) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category ? category.dot : '#64748B';
};
