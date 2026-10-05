const PRODUCT_IMAGES = {
  espresso: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
  pourOver: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  coldDrink: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
  tea: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
  dessert: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=900&q=80",
  affogato: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=900&q=80",
  mocha: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
};

export const PRODUCTS = [
  { id: "1", name: "Marrakech Espresso", category: "Espresso", price: 25, description: "A rich, intense double shot with notes of dark cocoa and cardamom.", image: PRODUCT_IMAGES.espresso },
  { id: "2", name: "Atlas Pour-Over", category: "Pour-Over", price: 40, description: "Single-origin Ethiopian beans brewed slow. Bright, floral, and complex.", image: PRODUCT_IMAGES.pourOver },
  { id: "3", name: "Spiced Cortado", category: "Espresso", price: 30, description: "Espresso cut with warm milk and a dash of Moroccan cinnamon.", image: PRODUCT_IMAGES.espresso },
  { id: "4", name: "Medina Cold Brew", category: "Cold Drinks", price: 45, description: "Steeped for 18 hours. Smooth, refreshing, with a hint of orange blossom.", image: PRODUCT_IMAGES.coldDrink },
  { id: "5", name: "Zellige Iced Latte", category: "Cold Drinks", price: 35, description: "Espresso over ice with creamy oat milk and a touch of vanilla.", image: PRODUCT_IMAGES.coldDrink },
  { id: "6", name: "Traditional Mint Tea", category: "Teas", price: 20, description: "Gunpowder green tea brewed with fresh spearmint leaves and cane sugar.", image: PRODUCT_IMAGES.tea },
  { id: "7", name: "Saffron Chai", category: "Teas", price: 35, description: "Black tea infused with saffron, cardamom, and clove.", image: PRODUCT_IMAGES.tea },
  { id: "8", name: "Rosewater Affogato", category: "Espresso", price: 45, description: "A scoop of vanilla bean gelato drowned in a shot of rosewater espresso.", image: PRODUCT_IMAGES.affogato },
  { id: "9", name: "Pistachio Ghazal", category: "Desserts", price: 50, description: "A delicate pastry filled with crushed pistachios and honey syrup.", image: PRODUCT_IMAGES.dessert },
  { id: "10", name: "Almond Briouat", category: "Desserts", price: 40, description: "Crispy filo triangles stuffed with almond paste and orange blossom.", image: PRODUCT_IMAGES.dessert },
  { id: "11", name: "Chemex Reserve", category: "Pour-Over", price: 50, description: "Our premium geisha beans brewed beautifully clear in a Chemex.", image: PRODUCT_IMAGES.pourOver },
  { id: "12", name: "Mocha Noir", category: "Espresso", price: 40, description: "Dark chocolate melted into a double espresso with steamed milk.", image: PRODUCT_IMAGES.mocha },
];

export const BEANS = [
  { id: "b1", name: "Atlas Reserve", origin: "Morocco 🇲🇦", notes: "Dark chocolate, orange zest, cedar", roast: "Espresso", story: "Sourced from the high altitudes of the Atlas Mountains, this blend is roasted deep to bring out a luxurious chocolate body." },
  { id: "b2", name: "Yirgacheffe Gold", origin: "Ethiopia 🇪🇹", notes: "Jasmine, bergamot, apricot", roast: "Light", story: "A delicate, tea-like coffee from the birthplace of coffee itself. Expect bright acidity and floral aromatics." },
  { id: "b3", name: "Sumatra Mandheling", origin: "Indonesia 🇮🇩", notes: "Earth, tobacco, dark cocoa", roast: "Dark", story: "Wet-hulled to create a heavy, syrupy body. A bold cup with almost zero acidity and intense earthy notes." },
  { id: "b4", name: "Guatemala Antigua", origin: "Guatemala 🇬🇹", notes: "Apple apple, milk chocolate, pecan", roast: "Medium", story: "Grown in volcanic soil, these beans offer a perfectly balanced, sweet, and comforting cup." },
  { id: "b5", name: "Yemen Mocha", origin: "Yemen 🇾🇪", notes: "Dried fruit, wine, spice", roast: "Medium", story: "One of the world's oldest coffees. Wild, complex, and intensely fruity with a distinctive wine-like finish." },
  { id: "b6", name: "Colombia Huila", origin: "Colombia 🇨🇴", notes: "Caramel, cherry, vanilla", roast: "Medium", story: "A crowd-pleaser. Exceptionally sweet and balanced with a clean finish. Perfect for everyday drinking." },
  { id: "b7", name: "Costa Rica Tarrazú", origin: "Costa Rica 🇨🇷", notes: "Honey, citrus, hazelnut", roast: "Light", story: "Crisp and lively with a wonderful honey sweetness. Roasted light to preserve its delicate citrus edge." },
];
