import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Package, Star, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Account() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const { toast } = useToast();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    
    const success = login(email, password, name);
    if (!success) {
      toast({ title: "Error", description: "Invalid admin credentials", variant: "destructive" });
      return;
    }
    toast({
      title: isRegistering ? "Account created" : "Welcome back",
      description: `You are now logged in as ${isRegistering ? name : email}.`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background px-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="font-serif text-3xl mb-2">
                {isRegistering ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription>
                {isRegistering 
                  ? "Join our loyalty program and start earning rewards." 
                  : "Sign in to view your orders and loyalty points."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {isRegistering && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. Youssef Alaoui" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full h-11 text-base mt-4" data-testid="btn-auth-submit">
                  {isRegistering ? "Register" : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                <button 
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-primary font-medium hover:underline"
                  data-testid="btn-toggle-auth"
                >
                  {isRegistering ? "Sign in" : "Register"}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-serif text-xl">
                {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'QC'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-serif text-3xl font-medium">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2" data-testid="btn-logout">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-6">
            {/* Loyalty Summary */}
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" /> Loyalty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-muted/50 rounded-xl border border-border/50 mb-4">
                  <p className="text-4xl font-serif text-primary font-medium mb-1">{user?.loyaltyPoints}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Points Balance</p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/loyalty'}>
                  View Rewards
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-border/50 rounded-md flex items-center justify-between bg-background">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                    <div>
                      <p className="text-sm font-medium">•••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            {/* Order History */}
            <Card className="border-border/50 bg-card h-full">
              <CardHeader>
                <CardTitle className="font-serif text-2xl flex items-center gap-2">
                  <Package className="w-6 h-6 text-primary" /> Order History
                </CardTitle>
                <CardDescription>Your recent purchases</CardDescription>
              </CardHeader>
              <CardContent>
                {user?.orders && user.orders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium">{order.total} MAD</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="font-medium text-lg mb-1">No orders yet</p>
                    <p className="text-muted-foreground text-sm">When you make purchases, they will appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
