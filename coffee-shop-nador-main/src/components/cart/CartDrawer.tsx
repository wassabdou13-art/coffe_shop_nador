import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isCartOpen, setIsCartOpen } = useCart();
  const [, setLocation] = useLocation();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border/50">
        <SheetHeader className="pb-4 border-b border-border/50">
          <SheetTitle className="font-serif text-2xl flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-lg">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Discover our artisan coffee blends and treats.</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCartOpen(false);
                  setLocation("/menu");
                }}
                className="mt-4"
                data-testid="btn-empty-cart-shop"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${JSON.stringify(item.customization)}`} className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm leading-tight pr-4">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id, JSON.stringify(item.customization))}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          data-testid={`btn-remove-cart-${item.id}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {item.customization && (
                        <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                          <p>Size: {item.customization.size}</p>
                          <p>Sugar: {item.customization.sugar} scoop(s)</p>
                          {item.customization.addons.length > 0 && (
                            <p>Add: {item.customization.addons.join(", ")}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2 border border-border/50 rounded-md px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, JSON.stringify(item.customization), -1)}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                          disabled={item.quantity <= 1}
                          data-testid={`btn-decrease-qty-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, JSON.stringify(item.customization), 1)}
                          className="text-muted-foreground hover:text-foreground"
                          data-testid={`btn-increase-qty-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium">{item.price * item.quantity} MAD</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-border/50 space-y-4">
            <div className="flex justify-between items-center text-lg font-serif">
              <span>Subtotal</span>
              <span>{total} MAD</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout.</p>
            <Button 
              className="w-full h-12 text-base font-medium" 
              onClick={() => {
                setIsCartOpen(false);
                setLocation("/checkout");
              }}
              data-testid="btn-checkout"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
