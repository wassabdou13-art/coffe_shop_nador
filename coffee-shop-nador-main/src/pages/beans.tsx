import { motion } from "framer-motion";
import { BEANS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Beans() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-sans tracking-widest uppercase text-primary text-sm font-medium mb-2 block">
              Single Origin & Blends
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">Our Beans</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We travel the world to source the finest coffees, forging direct relationships with farmers. 
              Each bean is roasted in our Mont-Aroui roastery to highlight its unique terroir.
            </p>
          </motion.div>
        </div>

        {/* Beans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEANS.map((bean, index) => (
            <motion.div
              key={bean.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group">
                <div className="h-2 w-full bg-gradient-to-r from-primary to-accent opacity-80" />
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{bean.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        {bean.origin}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {bean.roast} Roast
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {bean.story}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Tasting Notes</p>
                    <p className="font-serif text-lg text-foreground italic">
                      "{bean.notes}"
                    </p>
                  </div>

                  {/* Roast Level Visualizer */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Light</span>
                      <span>Medium</span>
                      <span>Dark</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                      <div className={`h-full bg-amber-200 ${bean.roast === 'Light' || bean.roast === 'Medium' || bean.roast === 'Dark' || bean.roast === 'Espresso' ? 'w-1/3' : 'w-0'}`} />
                      <div className={`h-full bg-orange-500 ${bean.roast === 'Medium' || bean.roast === 'Dark' || bean.roast === 'Espresso' ? 'w-1/3' : 'w-0'}`} />
                      <div className={`h-full bg-stone-800 ${bean.roast === 'Dark' || bean.roast === 'Espresso' ? 'w-1/3' : 'w-0'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Wholesale CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-10 md:p-16 rounded-2xl bg-primary text-primary-foreground text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Interested in Wholesale?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            We partner with cafes, restaurants, and offices to provide premium roasted coffee, equipment, and barista training.
          </p>
          <button className="bg-background text-primary px-8 py-3 rounded-md font-medium hover:bg-background/90 transition-colors">
            Partner With Us
          </button>
        </motion.div>

      </div>
    </div>
  );
}
