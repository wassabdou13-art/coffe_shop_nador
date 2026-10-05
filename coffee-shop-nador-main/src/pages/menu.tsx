import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts, type Product } from "@/contexts/ProductContext";

const CATEGORIES = ["All", "Espresso", "Pour-Over", "Cold Drinks", "Teas", "Desserts"];

export default function Menu() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { products } = useProducts();
  
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Customization state
  const [size, setSize] = useState("Medium");
  const [sugar, setSugar] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = useMemo(() => {
    if (activeTab === "All") return products;
    return products.filter((p) => p.category === activeTab);
  }, [activeTab, products]);

  const openCustomization = (product: Product) => {
    setSelectedProduct(product);
    setSize("Medium");
    setSugar(1);
    setAddons([]);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    let finalPrice = selectedProduct.price;
    
    // Calculate size delta
    if (size === "Small") finalPrice -= 5;
    if (size === "Large") finalPrice += 5;
    
    // Calculate addons
    if (addons.includes("Oat Milk (+5 MAD)")) finalPrice += 5;
    if (addons.includes("Extra Shot (+10 MAD)")) finalPrice += 10;
    if (addons.includes("Vanilla Syrup (+7 MAD)")) finalPrice += 7;

    const cartItem: CartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: finalPrice,
      quantity,
      image: selectedProduct.image,
      customization: {
        size,
        sugar,
        addons: addons.map(a => a.split(" ")[0]) // clean up addon names
      }
    };

    addItem(cartItem);
    setSelectedProduct(null);
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${selectedProduct.name} added to your cart.`,
    });
  };

  // Calculate current price based on customization
  const currentPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    let price = selectedProduct.price;
    if (size === "Small") price -= 5;
    if (size === "Large") price += 5;
    if (addons.includes("Oat Milk (+5 MAD)")) price += 5;
    if (addons.includes("Extra Shot (+10 MAD)")) price += 10;
    if (addons.includes("Vanilla Syrup (+7 MAD)")) price += 7;
    return price * quantity;
  }, [selectedProduct, size, addons, quantity]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">Our Menu</h1>
            <p className="text-muted-foreground text-lg">
              Explore our thoughtfully curated selection of artisan coffees, teas, and Moroccan sweets.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none">
            <TabsList className="bg-transparent border-b border-border/50 w-auto h-auto p-0 flex space-x-8 rounded-none">
              {CATEGORIES.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none py-3 px-1 text-base font-medium text-muted-foreground transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden border-border/50 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="aspect-[4/3] overflow-hidden relative cursor-pointer" onClick={() => openCustomization(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                      {product.category}
                    </div>
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-lg font-medium leading-tight">{product.name}</h3>
                      <span className="font-medium text-primary ml-2">{product.price} MAD</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>
                    <Button 
                      className="w-full mt-auto" 
                      onClick={() => openCustomization(product)}
                      data-testid={`btn-customize-${product.id}`}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </Tabs>

        {/* Customization Dialog */}
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
            {selectedProduct && (
              <>
                <div className="aspect-[2/1] relative w-full overflow-hidden bg-muted">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <DialogTitle className="font-serif text-2xl md:text-3xl">{selectedProduct.name}</DialogTitle>
                    <DialogDescription className="text-white/80 mt-1">
                      {selectedProduct.description}
                    </DialogDescription>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                  {selectedProduct.category !== "Desserts" && (
                    <>
                      {/* Size */}
                      <div className="space-y-3">
                        <Label className="text-base font-serif font-medium">Size</Label>
                        <RadioGroup value={size} onValueChange={setSize} className="flex gap-4">
                          {["Small", "Medium", "Large"].map((s) => (
                            <div key={s} className="flex-1">
                              <RadioGroupItem value={s} id={`size-${s}`} className="peer sr-only" />
                              <Label
                                htmlFor={`size-${s}`}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-border/50 bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                              >
                                <Coffee className={`mb-2 ${s === 'Small' ? 'w-4 h-4' : s === 'Medium' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                                <span className="text-sm font-medium">{s}</span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  {s === 'Small' ? '-5 MAD' : s === 'Large' ? '+5 MAD' : 'Base'}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Sugar Level */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label className="text-base font-serif font-medium">Sugar Level</Label>
                          <span className="text-sm text-muted-foreground">{sugar} scoop{sugar !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center justify-between border border-border/50 rounded-md p-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSugar(Math.max(0, sugar - 1))}
                            disabled={sugar === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3].map((s) => (
                              <div 
                                key={s} 
                                className={`w-3 h-3 rounded-full ${s < sugar ? 'bg-primary' : 'bg-muted'}`} 
                              />
                            ))}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSugar(Math.min(4, sugar + 1))}
                            disabled={sugar === 4}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Add-ons */}
                      <div className="space-y-3">
                        <Label className="text-base font-serif font-medium">Add-ons</Label>
                        <div className="space-y-2">
                          {["Oat Milk (+5 MAD)", "Extra Shot (+10 MAD)", "Vanilla Syrup (+7 MAD)"].map((addon) => (
                            <div key={addon} className="flex items-center space-x-3 border border-border/50 rounded-md p-3 hover:bg-muted/50 transition-colors">
                              <Checkbox 
                                id={`addon-${addon}`} 
                                checked={addons.includes(addon)}
                                onCheckedChange={(checked) => {
                                  if (checked) setAddons([...addons, addon]);
                                  else setAddons(addons.filter(a => a !== addon));
                                }}
                              />
                              <Label htmlFor={`addon-${addon}`} className="flex-1 cursor-pointer font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {addon}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Quantity */}
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <Label className="text-base font-serif font-medium">Quantity</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border border-border/50 rounded-md px-2 py-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-base w-8 text-center font-medium">{quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="p-6 border-t border-border/50 bg-muted/20">
                  <Button 
                    className="w-full h-12 text-base flex justify-between px-6" 
                    onClick={handleAddToCart}
                    data-testid="btn-confirm-add-to-cart"
                  >
                    <span>Add to Cart</span>
                    <span>{currentPrice} MAD</span>
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
