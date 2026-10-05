import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Coffee, LayoutDashboard, LogOut, Menu, Store, Users, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/menu", label: "Menu View", icon: Coffee },
  { href: "/find-us", label: "Store Page", icon: Store },
  { href: "/account", label: "Account", icon: Users },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden md:flex md:flex-col border-r border-border bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-secondary/10 blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div className="border-b border-border px-6 py-5 relative z-10">
          <div className="flex items-center gap-3">
            <img
              src="/coffeador-logo.png"
              alt="Coffeador logo"
              className="h-11 w-11 rounded-full object-cover border border-border/50 shadow-sm"
            />
            <div>
              <p className="font-serif text-lg font-semibold">Coffeador Admin</p>
              <p className="text-xs text-muted-foreground">Mont-Aroui back office</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 relative z-10">
          <p className="px-3 text-xs font-medium uppercase tracking-[0.22em] text-primary mb-4">Navigation</p>
          <nav className="space-y-1">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-border bg-background/90 backdrop-blur-sm p-4 shadow-sm">
            <Badge variant="outline" className="mb-3 border-primary/20 bg-primary/10 text-primary">
              Admin Access
            </Badge>
            <p className="text-sm text-muted-foreground">
              Manage products, review orders, and keep the shop updated in real time.
            </p>
          </div>
        </div>

        <div className="border-t border-border p-4 relative z-10">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-border/50 bg-background/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium">Admin Workspace</p>
                <p className="font-serif text-lg">Coffee shop operations</p>
              </div>
            </div>

            <Button variant="outline" className="hidden sm:inline-flex" onClick={logout}>
              Sign Out
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-border bg-card px-4 py-4 md:hidden">
              <nav className="space-y-2">
                {ADMIN_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
