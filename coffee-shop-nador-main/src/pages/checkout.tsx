import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ArrowLeft, ShoppingBag, CreditCard } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
});

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "Mont-Aroui",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Mock processing
    console.log("Order details:", values);
    setTimeout(() => {
      setOrderNumber(`QC-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
      clearCart();
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-background flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-4xl font-medium">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order <span className="font-bold text-foreground">#{orderNumber}</span> is being prepared and will be delivered soon.
          </p>
          <div className="pt-8">
            <Link href="/">
              <Button size="lg" className="w-full">Return Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-background flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50 mb-6" />
        <h1 className="font-serif text-3xl font-medium mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some artisan coffee or treats before checking out.</p>
        <Link href="/menu">
          <Button size="lg">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <div className="mb-8">
          <Link href="/menu" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="font-serif text-3xl font-medium mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your order details below.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="checkout-form">
                
                {/* Delivery details */}
                <Card className="border-border/50 shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Delivery Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Youssef Alaoui" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+212 600 000 000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="youssef@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Avenue Mohammed VI, Apt 4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Mont-Aroui" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Payment (Mock) */}
                <Card className="border-border/50 shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> Payment Method
                    </CardTitle>
                    <CardDescription>All transactions are secure and encrypted.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Card Number</Label>
                      <Input placeholder="0000 0000 0000 0000" maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input placeholder="123" maxLength={4} type="password" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-sm bg-card sticky top-28">
              <CardHeader className="bg-muted/30 border-b border-border/50">
                <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50 max-h-[40vh] overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.customization)}`} className="p-4 flex gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden bg-muted shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="flex justify-between font-medium mb-1">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{item.price * item.quantity} MAD</span>
                        </div>
                        {item.customization && (
                          <div className="text-muted-foreground text-xs space-y-0.5">
                            <p>Size: {item.customization.size}</p>
                            <p>Sugar: {item.customization.sugar} scoop</p>
                            {item.customization.addons.length > 0 && (
                              <p>Add: {item.customization.addons.join(", ")}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch p-6 bg-muted/20 border-t border-border/50">
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{total} MAD</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>20 MAD</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-serif font-medium text-xl">
                    <span>Total</span>
                    <span className="text-primary">{total + 20} MAD</span>
                  </div>
                </div>
                <Button 
                  form="checkout-form" 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 text-base shadow-md"
                  data-testid="btn-place-order"
                >
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
