export interface MenuItem {
  name: string;
  desc?: string;
  price: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    icon: "🍟",
    items: [
      { name: "French Fries", price: "2.5" },
      { name: "Cheesy Chicken Fries", price: "7.5" },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    icon: "🥗",
    items: [
      { name: "Chicken Caesar", desc: "Lettuce, Parmesan, Croutons, Chicken, Caesar Sauce", price: "7.5" },
      { name: "Crab Salad", desc: "Iceberg, Corn, Crab, Mustard Sauce", price: "7" },
      { name: "Green Salad", price: "4.5" },
      { name: "Feta Salad", price: "8" },
      { name: "Nacho Salad", price: "8.5" },
      { name: "Crispy Chicken Caesar", price: "7.5" },
      { name: "Tuna Pasta Salad", price: "9" },
      { name: "Mayel Salad", price: "9" },
    ],
  },
  {
    id: "kaaek",
    label: "Kaaek",
    icon: "🥖",
    items: [
      { name: "Mayel Special", desc: "Mozzarella, Cheddar, Fried Chicken, Iceberg, Mayo, BBQ", price: "5.5" },
      { name: "Picon", price: "3.5" },
      { name: "Akkawi", price: "4" },
      { name: "Akkawi + Mozzarella", price: "4.5" },
      { name: "Mozzarella", price: "4" },
      { name: "Ham & Cheese", price: "4.5" },
      { name: "Submarine", desc: "Mozzarella, Salami, Ham, Iceberg, Tomato, Mayo, Mustard", price: "5.5" },
      { name: "3 Cheeses + Chips", desc: "Picon, Cheddar, Mozzarella, Chips", price: "5" },
      { name: "Pizza", desc: "Mozzarella, Ham, Salami, Pizza Sauce, Olives", price: "5.5" },
      { name: "Soujouk", desc: "Mozzarella, Soujouk, Tomato, Pickles, Mayo", price: "6" },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    icon: "🍔",
    items: [
      { name: "Hamburger", desc: "Patty, Pickles, Tomato, Iceberg, Mayo, Ketchup", price: "6" },
      { name: "Cheese Burger", desc: "Patty, Cheddar, Pickles, Tomato, Iceberg, Mayo, Ketchup", price: "6.5" },
      { name: "Chicken Burger", desc: "Chicken, Pickles, Iceberg, Mayo, Garlic", price: "6" },
      { name: "Crispy Burger", desc: "Crispy Chicken, Pickles, Iceberg, Mayo, Cocktail Sauce", price: "6" },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    icon: "🌯",
    items: [
      { name: "Barbecue Crispy Wrap", desc: "Crispy Chicken, Iceberg, Pickles, Chips, Mayo, BBQ", price: "6.5" },
      { name: "Spicy Crispy Wrap", desc: "Crispy Chicken, Iceberg, Pickles, Chips, Mayo, Spicy", price: "6.5" },
      { name: "Honey Mustard Crispy Wrap", desc: "Crispy Chicken, Iceberg, Pickles, Chips, Mayo, Honey Mustard", price: "6.5" },
      { name: "Submarine Bl Aajin", desc: "Mozzarella, Salami, Ham, Iceberg, Tomato, Mayo, Mustard", price: "6.5" },
      { name: "Djej W Jebne Bl Aajin", desc: "Chicken, Mozzarella, Garlic, Pickles, Iceberg, Mayo", price: "7" },
      { name: "Chicken Quesadillas", desc: "Chicken, Mozzarella, Cheddar, Pepper, Onion, Corn (with French Fries)", price: "9.5" },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    icon: "🥪",
    items: [
      { name: "BBQ Philly Chicken", desc: "Chicken, Pepper, Onion, BBQ, Mozzarella, Pickles, Mayo, Iceberg", price: "7" },
      { name: "Spicy Philly Chicken", desc: "Chicken, Pepper, Onion, Spicy, Mozzarella, Pickles, Mayo, Iceberg", price: "7" },
      { name: "Chicken Light", desc: "Chicken, Rocca, Pickles, Tomato, Light Mayo", price: "7" },
      { name: "Turkey & Cheese", desc: "Smoked Turkey, Mozzarella, Iceberg, Tomato, Pickles, Light Mayo, Mustard", price: "6" },
      { name: "Crab Sandwich", desc: "Crab, Iceberg, Pickles, Corn, Mustard, Mayo", price: "6" },
      { name: "Philly Steak", desc: "Steak, Mozzarella, Onions, Pepper, Pickles, Iceberg, Mayo", price: "8.5" },
      { name: "Chicken Sub", desc: "Chicken, Lettuce, Pickles, Cheese, Garlic, Mayo", price: "7" },
      { name: "Honey Mustard Cheddar Crunch", desc: "Crispy Chicken, Coleslaw, Cheddar, Pickles, Honey Mustard Sauce", price: "7" },
      { name: "Tawouk Bel Khebez", desc: "Chicken, Coleslaw, Pickles, Garlic, Fries", price: "7" },
      { name: "Chicken Bomb", desc: "Chicken, Pepper, Onion, Corn, Fresh Mushrooms, Mozzarella, Special Sauce", price: "7" },
      { name: "San Francisco", desc: "Chicken, Coleslaw, Pickles, Cheddar, Tomato, Soy Sauce", price: "7" },
      { name: "Buffalo Crispy Ranch", desc: "Buffalo Crispy, Iceberg, Tomato, Pickles, Ranch Sauce", price: "7" },
      { name: "BBQ Crunch Melt", desc: "Crispy, Pickles, Coleslaw, Mayo, Cheddar Sauce, BBQ Sauce", price: "7" },
      { name: "B-Truffle", desc: "Steak, Mozzarella, Pickles, Truffle Sauce, Onion, Mushroom", price: "8.5" },
      { name: "Z Honey Chick", desc: "Honey Chicken, Lettuce, Pickles, Mayo", price: "7" },
    ],
  },
  {
    id: "platters",
    label: "Platters",
    icon: "🍽",
    items: [
      { name: "Grilled Chicken Breast", desc: "4 pieces Chicken Breast, French Fries, Coleslaw or Green Salad", price: "11" },
      { name: "Hamburger Platter", desc: "2 Patties, French Fries, Coleslaw or Green Salad", price: "11" },
      { name: "Cheese Burger Platter", desc: "2 Patties, Cheddar Cheese, French Fries, Coleslaw or Green Salad", price: "11.5" },
      { name: "Chicken Burger Platter", desc: "2 Chicken Slices, French Fries, Coleslaw or Green Salad", price: "11" },
      { name: "Crispy Platter", desc: "Crispy Chicken, French Fries, Coleslaw", price: "10.5" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "🧇",
    items: [
      { name: "Nutella Crêpe", price: "5" },
      { name: "Nutella Kaake", price: "5" },
      { name: "Add Kinder", price: "1.5" },
      { name: "Add Lotus", price: "1" },
      { name: "Add Oreo", price: "1" },
      { name: "Add Banana", price: "0.5" },
      { name: "Add Strawberry", price: "1" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "🥤",
    items: [
      { name: "Pepsi", price: "1.5" },
      { name: "Pepsi Diet", price: "1.5" },
      { name: "7UP", price: "1.5" },
      { name: "7UP Diet", price: "1.5" },
      { name: "Miranda", price: "1.5" },
      { name: "Ice Tea Peach", price: "1.5" },
      { name: "Rim Sparkling Water", price: "1.5" },
      { name: "Beer", price: "3" },
      { name: "Water", price: "0.5" },
    ],
  },
  {
    id: "arguile",
    label: "Arguile",
    icon: "💨",
    items: [
      { name: "Arguile", price: "6" },
      { name: "Arguile Ras Jabale", price: "7" },
    ],
  },
  {
    id: "sauces",
    label: "Sauces",
    icon: "🥫",
    items: [
      { name: "Buffalo Sauce", price: "1" },
      { name: "BBQ Sauce", price: "1" },
      { name: "Cheddar Sauce", price: "1" },
    ],
  },
];
