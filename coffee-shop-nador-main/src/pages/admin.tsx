import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  Pencil,
  Coffee,
  Package,
  ShoppingBag,
  TriangleAlert,
  Users,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts, type Product } from "@/contexts/ProductContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

const RECENT_ORDERS = [
  { id: "ADM-1042", customer: "Sara El Idrissi", date: "2026-04-11", total: 145, status: "Preparing" },
  { id: "ADM-1041", customer: "Amine Boulahya", date: "2026-04-11", total: 80, status: "Ready" },
  { id: "ADM-1040", customer: "Nadia Karim", date: "2026-04-10", total: 210, status: "Delivered" },
  { id: "ADM-1039", customer: "Yassine Tazi", date: "2026-04-10", total: 95, status: "Pending" },
];

const STAFF_NOTES = [
  "Cold brew bottles are moving faster than expected this week.",
  "Morning traffic peaks around 8:30 and 11:00.",
  "Mint tea ingredients should be restocked before Monday.",
];

const statusClasses: Record<string, string> = {
  Preparing: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Ready: "bg-sky-500/10 text-sky-700 border-sky-500/20",
  Delivered: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Pending: "bg-muted text-muted-foreground border-border",
};

export default function Admin() {
  const { isAdmin, login, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [email, setEmail] = useState("admin@qahwa.ma");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    category: "Espresso",
    price: "25",
    description: "",
    image: "",
  });

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormState({
      name: "",
      category: "Espresso",
      price: "25",
      description: "",
      image: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
    });
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formState.name || !formState.description || !formState.image) {
      toast({ title: "Missing fields", description: "Please fill all product fields.", variant: "destructive" });
      return;
    }

    const payload = {
      name: formState.name,
      category: formState.category,
      price: Number(formState.price),
      description: formState.description,
      image: formState.image,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      toast({ title: "Product updated", description: `${payload.name} has been updated.` });
    } else {
      addProduct(payload);
      toast({ title: "Product created", description: `${payload.name} has been added to the menu.` });
    }

    setIsDialogOpen(false);
  };

  const handleDeleteProduct = (product: Product) => {
    deleteProduct(product.id);
    toast({ title: "Product deleted", description: `${product.name} has been removed.` });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      toast({ title: "Access denied", description: "Use admin@qahwa.ma / admin123", variant: "destructive" });
    } else {
      toast({ title: "Welcome back", description: "Admin access granted." });
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6">
        <div className="mx-auto max-w-md">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <CardTitle className="font-serif text-3xl">Admin Access</CardTitle>
              <CardDescription>
                Sign in with the admin account to access the back office.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAdminLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Sign In as Admin</Button>
                <p className="text-xs text-muted-foreground">
                  Demo credentials: <span className="font-medium">admin@qahwa.ma</span> / <span className="font-medium">admin123</span>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totalRevenue = RECENT_ORDERS.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter((_, index) => index % 4 === 0);
  const productCategories = new Set(products.map((product) => product.category)).size;

  return (
    <div className="min-h-screen pb-20 bg-background overflow-hidden">
      <section className="relative border-b border-border/50 bg-card overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Admin Panel
              </span>
              <div>
                <h1 className="font-serif text-4xl md:text-6xl font-medium leading-tight">Back Office Qahwa & Co.</h1>
                <p className="text-muted-foreground text-lg mt-4 max-w-2xl leading-relaxed">
                  Une vue de gestion qui garde le même esprit que la boutique: chaleureuse, lisible et centrée sur l'activite du coffee shop.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="gap-2 bg-background/70" data-testid="btn-admin-export">
                  <Package className="w-4 h-4" /> Export Orders
                </Button>
                <Button className="gap-2" data-testid="btn-admin-product" onClick={openCreateDialog}>
                  <Coffee className="w-4 h-4" /> Add Product
                </Button>
                <Button variant="ghost" className="gap-2" onClick={logout} data-testid="btn-admin-signout">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-xl sm:grid-cols-3">
                <div className="rounded-xl border border-border/50 bg-background/80 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Service</p>
                  <p className="font-serif text-xl">Morning Rush</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/80 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Store</p>
                  <p className="font-serif text-xl">Mont-Aroui</p>
                </div>
                <div className="col-span-2 rounded-xl border border-border/50 bg-background/80 px-4 py-3 sm:col-span-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Focus</p>
                  <p className="font-serif text-xl">Menu & Stock</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                alt="Coffee shop admin overview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="font-serif text-2xl md:text-3xl">Mont-Aroui Operations</p>
                <p className="text-white/80 mt-2 text-sm md:text-base">
                  Orders, stock, and customer flow for the current service.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.22em] text-primary font-medium">Daily Snapshot</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium">Coffee Shop Dashboard</h2>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Monitor daily orders, revenue, stock alerts, and the performance of your coffee menu in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Today's Revenue",
              value: `${totalRevenue} MAD`,
              detail: "+12% vs yesterday",
              icon: ShoppingBag,
            },
            {
              title: "Orders Today",
              value: `${RECENT_ORDERS.length}`,
              detail: "2 orders still in progress",
              icon: Package,
            },
            {
              title: "Active Customers",
              value: "128",
              detail: "27 loyalty members visited",
              icon: Users,
            },
            {
              title: "Low Stock Alerts",
              value: `${lowStockProducts.length}`,
              detail: "Products need replenishment",
              icon: TriangleAlert,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <Card className="border-border/50 bg-card/90 backdrop-blur-sm shadow-sm h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div>
                    <CardDescription>{item.title}</CardDescription>
                    <CardTitle className="font-serif text-3xl mt-2">{item.value}</CardTitle>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <item.icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-2"
          >
            <Card className="border-border/50 bg-card shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Recent Orders</CardTitle>
                <CardDescription>Quick overview of the latest activity in the shop.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RECENT_ORDERS.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusClasses[order.status] ?? "border-border"}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{order.total} MAD</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <Card className="border-border/50 bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Inventory Snapshot</CardTitle>
                <CardDescription>{products.length} products across {productCategories} categories.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge variant="outline" className={index % 2 === 0 ? "text-amber-700 border-amber-500/20 bg-amber-500/10" : ""}>
                      {index % 2 === 0 ? "Low stock" : "Running low"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Staff Notes</CardTitle>
                <CardDescription>Operational reminders for the day.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {STAFF_NOTES.map((note) => (
                  <div key={note} className="rounded-xl border border-border/50 bg-background px-4 py-3 text-sm text-muted-foreground">
                    {note}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="border-border/50 bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Product Management</CardTitle>
              <CardDescription>Create, update, and remove products from the live menu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price} MAD</TableCell>
                      <TableCell className="max-w-md truncate">{product.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteProduct(product)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription>
              Update the coffee menu directly from the admin area.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Name</Label>
              <Input id="product-name" value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-category">Category</Label>
                <Input id="product-category" value={formState.category} onChange={(e) => setFormState((s) => ({ ...s, category: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-price">Price</Label>
                <Input id="product-price" type="number" value={formState.price} onChange={(e) => setFormState((s) => ({ ...s, price: e.target.value }))} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-image">Image URL</Label>
              <Input id="product-image" value={formState.image} onChange={(e) => setFormState((s) => ({ ...s, image: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea id="product-description" value={formState.description} onChange={(e) => setFormState((s) => ({ ...s, description: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProduct}>{editingProduct ? "Save changes" : "Create product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
