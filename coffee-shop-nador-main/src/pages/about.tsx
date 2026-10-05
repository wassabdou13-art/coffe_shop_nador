import { motion } from "framer-motion";
import { Leaf, Flame, Heart, Coffee } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background overflow-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-sans tracking-widest uppercase text-primary text-sm font-medium mb-4 block">
            Our Origin
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium mb-8">
            Born in Mont-Aroui.<br />Crafted for the World.
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mt-12 relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80" 
            alt="Qahwa & Co Roastery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">The Story of Q&C</h2>
            <p>
              Qahwa & Co. began as a small roasting experiment in Mont-Aroui, near Nador. Our founder, obsessed with the precision of specialty coffee but deeply attached to the soulful, unhurried nature of Moroccan hospitality, sought to blend the two.
            </p>
            <p>
              In Morocco, coffee is not just fuel for the day—it is an event. It is the centerpiece of conversation, a gesture of welcome, and a pause in the chaos of life. We wanted to elevate that moment by sourcing the world's finest beans and roasting them with meticulous care.
            </p>
            <p>
              Today, Qahwa & Co. is a bridge between tradition and modernity. We honor the old ways while pushing the boundaries of what coffee can be.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
              <img src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80" alt="Coffee beans" className="rounded-xl object-cover h-full w-full shadow-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80" alt="Barista pouring latte art" className="rounded-xl object-cover h-full w-full shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-card py-24 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-medium">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Direct Sourcing", desc: "We pay above fair-trade prices directly to farmers, ensuring sustainable livelihoods and the highest quality lots." },
              { icon: Flame, title: "Artisan Roasting", desc: "Our unique wood-fired kiln process imparts a subtle depth and complexity that conventional roasters can't match." },
              { icon: Heart, title: "Moroccan Hospitality", desc: "Every cup is served with the warmth and generosity that our culture is known for worldwide." },
              { icon: Coffee, title: "Uncompromising Quality", desc: "From water chemistry to extraction time, we control every variable to guarantee the perfect cup." }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 rounded-2xl border border-border/50 text-center"
              >
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
