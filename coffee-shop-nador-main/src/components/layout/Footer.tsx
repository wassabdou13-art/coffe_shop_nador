import { Link } from "wouter";
import { SiInstagram, SiFacebook, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <img
                src="/coffeador-logo.png"
                alt="Coffeador logo"
                className="h-10 w-10 rounded-full object-cover border border-border/50 shadow-sm"
              />
              <span className="font-serif text-xl font-semibold tracking-wide">
                Coffeador
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Rooted in Tradition. Brewed for the Modern Soul. Artisan Moroccan coffee experience.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-medium text-lg">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="/beans" className="hover:text-primary transition-colors">Our Beans</Link></li>
              <li><Link href="/loyalty" className="hover:text-primary transition-colors">Loyalty Rewards</Link></li>
              <li><Link href="/find-us" className="hover:text-primary transition-colors">Locations</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-medium text-lg">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Philosophy</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-medium text-lg">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Centre de Mont-Aroui</li>
              <li>Nador 62050</li>
              <li>Morocco</li>
              <li className="pt-2"><a href="mailto:hello@qahwa.ma" className="hover:text-primary transition-colors">hello@qahwa.ma</a></li>
              <li>+212 524 000 111</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>Coffeador © {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
