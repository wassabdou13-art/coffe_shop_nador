import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Beans from "@/pages/beans";
import About from "@/pages/about";
import Loyalty from "@/pages/loyalty";
import FindUs from "@/pages/find-us";
import Account from "@/pages/account";
import Checkout from "@/pages/checkout";
import Admin from "@/pages/admin";
import { ProductProvider } from "@/contexts/ProductContext";
import { AdminLayout } from "@/components/layout/AdminLayout";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/beans" component={Beans} />
        <Route path="/about" component={About} />
        <Route path="/loyalty" component={Loyalty} />
        <Route path="/find-us" component={FindUs} />
        <Route path="/account" component={Account} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/admin">
          <AdminLayout>
            <Admin />
          </AdminLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
