import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FindUs() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">Find Us</h1>
            <p className="text-muted-foreground text-lg">
              Visit our coffee shop in Mont-Aroui, Nador, Morocco or get in touch.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Info Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="font-serif text-3xl font-medium mb-6">Qahwa & Co. Mont-Aroui</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our coffee shop in Mont-Aroui offers a warm, relaxed space for specialty drinks,
                fresh pastries, and our retail bean selection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 text-primary rounded-full shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Location</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Centre de Mont-Aroui<br />
                      Nador 62050<br />
                      Morocco
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 text-primary rounded-full shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Hours</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Mon–Fri: 7:00 – 22:00<br />
                      Sat–Sun: 8:00 – 23:00
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 text-primary rounded-full shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      <a href="tel:+212524000111" className="hover:text-primary transition-colors">+212 524 000 111</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 text-primary rounded-full shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      <a href="mailto:hello@qahwa.ma" className="hover:text-primary transition-colors">hello@qahwa.ma</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-12 px-8 text-base gap-2"
              onClick={() => window.open('https://maps.google.com/?q=Mont-Aroui,+Nador,+Morocco', '_blank')}
              data-testid="btn-get-directions"
            >
              <MapPin className="w-4 h-4" /> Get Directions
            </Button>
          </motion.div>

          {/* Map Area */}
          <motion.div 
            className="w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden relative border border-border/50 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Decorative Map Placeholder */}
            <div className="absolute inset-0 bg-muted/30">
              <img 
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80" 
                alt="Coffee shop exterior" 
                className="w-full h-full object-cover opacity-50"
              />
              
              {/* Map UI Elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border-2 border-primary/20 bg-primary/5 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border-2 border-primary/40 bg-primary/10" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg mb-2 relative">
                  <MapPin className="w-8 h-8" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary" />
                </div>
                <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-md border border-border font-serif font-medium whitespace-nowrap">
                  Qahwa & Co.
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
