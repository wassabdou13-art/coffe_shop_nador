import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Coffee, Star, MapPin } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";

export default function Home() {
  const { products } = useProducts();
  const featuredDrinks = products.slice(0, 4);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[100vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80" 
            alt="Coffee shop interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 md:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="font-sans tracking-widest uppercase text-sm md:text-base text-primary/90 font-medium">
              Welcome to Qahwa & Co.
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight">
              Rooted in Tradition.<br />Brewed for the Modern Soul.
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto pb-6">
              Experience the artisan warmth of Moroccan coffee culture, crafted with precision and passion in every cup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/menu">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8" data-testid="btn-hero-menu">
                  Explore Our Menu
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 bg-transparent text-white border-white hover:bg-white/10 hover:text-white" data-testid="btn-hero-story">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center text-sm md:text-base font-medium flex items-center justify-center gap-2">
        <Star className="w-4 h-4 fill-current" />
        <span>Ramadan Special Collection — Free Date Cake with every order over 100 MAD</span>
        <Star className="w-4 h-4 fill-current" />
      </div>

      {/* Featured Drinks */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-4">Signature Pours</h2>
              <p className="text-muted-foreground text-lg">Curated selections from our master baristas, blending global specialty coffee with local flair.</p>
            </motion.div>
            <Link href="/menu" className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
              View full menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrinks.map((drink, index) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/menu" className="block h-full cursor-pointer group">
                  <Card className="h-full overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={drink.image} 
                        alt={drink.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                        {drink.category}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl font-medium line-clamp-1">{drink.name}</h3>
                        <span className="font-medium text-primary whitespace-nowrap">{drink.price} MAD</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{drink.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="py-24 bg-card border-y border-border/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=80" 
                alt="Pour over coffee process" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-white/20 m-4 rounded-md pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-2">
                <Coffee className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium">The Art of Moroccan Slow Coffee</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that great coffee is like a great conversation—it shouldn't be rushed. Born in Mont-Aroui near Nador, Qahwa & Co. brings together the meticulous craft of modern specialty coffee with the legendary warmth of Moroccan hospitality.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From beans ethically sourced from small-lot farmers to our unique wood-fired kiln roasting process, every step is a deliberate act of care.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button size="lg" className="text-base h-12 px-8">Discover Our Origins</Button>
                </Link>
                <Link href="/find-us">
                  <Button variant="outline" size="lg" className="text-base h-12 px-8 gap-2">
                    <MapPin className="w-4 h-4" /> Find a Store
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
