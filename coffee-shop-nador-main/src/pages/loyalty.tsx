import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coffee, Award, Star, Crown, Gift, ArrowRight } from "lucide-react";

export default function Loyalty() {
  const { isLoggedIn, user } = useAuth();
  
  const points = user?.loyaltyPoints || 0;
  
  // Calculate tier status
  let currentTier = "Bronze";
  let nextTier = "Silver";
  let pointsToNext = 500 - points;
  let progressPercentage = (points / 500) * 100;
  
  if (points >= 500 && points < 1000) {
    currentTier = "Silver";
    nextTier = "Gold";
    pointsToNext = 1000 - points;
    progressPercentage = ((points - 500) / 500) * 100;
  } else if (points >= 1000) {
    currentTier = "Gold";
    nextTier = "Max";
    pointsToNext = 0;
    progressPercentage = 100;
  }

  const REWARDS = [
    { id: 1, title: "Free Pastry", points: 80, icon: Gift, description: "Any pastry from our display case" },
    { id: 2, title: "Free Espresso Drink", points: 100, icon: Coffee, description: "Any size, hot or iced" },
    { id: 3, title: "Priority Order", points: 150, icon: Star, description: "Skip the line during morning rush" },
    { id: 4, title: "Gold Card Status", points: 500, icon: Crown, description: "Permanent 10% off all bean purchases" },
  ];

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
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">Qahwa Rewards</h1>
            <p className="text-muted-foreground text-lg">
              Earn points with every sip. Redeem for the things you love.
              <br />1 Point for every 10 MAD spent.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Status Panel */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50 bg-card h-full">
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-2xl">Your Status</CardTitle>
                <CardDescription>Track your progress and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoggedIn ? (
                  <div className="space-y-8">
                    <div className="text-center p-6 bg-muted/50 rounded-xl border border-border/50">
                      <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Available Points</p>
                      <p className="text-5xl font-serif text-primary font-medium">{points}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${
                              currentTier === 'Bronze' ? 'bg-orange-700' : 
                              currentTier === 'Silver' ? 'bg-slate-400' : 'bg-yellow-500'
                            }`} />
                            {currentTier} Member
                          </p>
                        </div>
                        {currentTier !== "Gold" && (
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{pointsToNext}</span> pts to {nextTier}
                          </p>
                        )}
                      </div>
                      <Progress value={progressPercentage} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground font-medium">
                        <span>{currentTier === 'Bronze' ? '0' : currentTier === 'Silver' ? '500' : '1000'}</span>
                        <span>{currentTier === 'Bronze' ? '500' : currentTier === 'Silver' ? '1000' : 'Max'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-lg mb-2">Join to earn rewards</p>
                      <p className="text-sm text-muted-foreground">Create an account to start earning points on every purchase.</p>
                    </div>
                    <Link href="/account">
                      <Button className="w-full" data-testid="btn-loyalty-login">Sign In / Register</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Rewards List */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-medium">Available Rewards</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REWARDS.map((reward) => {
                  const canAfford = isLoggedIn && points >= reward.points;
                  return (
                    <Card key={reward.id} className={`border-border/50 transition-colors ${canAfford ? 'border-primary/30 bg-primary/5' : ''}`}>
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-xl ${canAfford ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <reward.icon className="w-6 h-6" />
                          </div>
                          <span className={`font-bold font-serif text-lg ${canAfford ? 'text-primary' : 'text-muted-foreground'}`}>
                            {reward.points} pts
                          </span>
                        </div>
                        <h3 className="font-medium text-lg mb-1">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6 flex-1">{reward.description}</p>
                        
                        <Button 
                          variant={canAfford ? "default" : "outline"} 
                          className="w-full" 
                          disabled={!canAfford}
                        >
                          {canAfford ? 'Redeem' : 'Not enough points'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Tiers Explainer */}
            <div className="mt-12 space-y-6">
              <h2 className="font-serif text-2xl font-medium">Membership Tiers</h2>
              <div className="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-700/20 flex items-center justify-center text-orange-700 shrink-0">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Bronze <span className="text-sm font-normal text-muted-foreground">(0 - 499 pts)</span></h3>
                    <p className="text-sm text-muted-foreground">Earn 1 pt per 10 MAD, Birthday Drink</p>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-400/20 flex items-center justify-center text-slate-500 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Silver <span className="text-sm font-normal text-muted-foreground">(500 - 999 pts)</span></h3>
                    <p className="text-sm text-muted-foreground">Bronze perks + Free upsizes, 5% off beans</p>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-600 shrink-0">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Gold <span className="text-sm font-normal text-muted-foreground">(1000+ pts)</span></h3>
                    <p className="text-sm text-muted-foreground">Silver perks + 10% off beans, Exclusive tasting events</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
