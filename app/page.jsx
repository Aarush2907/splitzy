import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Zap, CheckCircle2, ArrowRight, IndianRupee } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans hero-gradient selection:bg-secondary/30">
      
      {/* Navbar Placeholder (if needed, though layout.js likely handles it) */}
      {/* We assume layout.js handles the main nav, but we can add a spacer if needed. 
          For now, we'll rely on the padding in the hero section. */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-indigo-100 shadow-sm mb-8 animate-fade-in-up backdrop-blur-sm dark:bg-black/50 border-white/10 ">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none px-3">New</Badge>
            <span className="text-sm font-medium text-gray-600">The smartest way to track expenses in India 🇮🇳</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in-up [animation-delay:200ms]">
            Split bills, <br className="hidden md:block"/>
            keep the <span className="gradient-text">Dosti.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            From chai runs to Goa trips, track every Rupee with your flatmates and friends. 
            No more awkward math, just seamless settlements.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40">
                Start Splitting <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-white/50 backdrop-blur-sm transition-all">
                How it works
              </Button>
            </Link>
          </div>

          {/* Floating Elements for Visual Interest */}
          <div className="absolute top-1/2 left-10 hidden lg:block animate-float">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3 rotate-[-6deg]">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium dark:text-white/70">You received</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">₹ 1,250.00</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-10 hidden lg:block animate-float [animation-delay:2s]">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3 rotate-[6deg]">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium dark:text-white/70">Goa Trip</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">You owe ₹ 450</p>
              </div>
            </div>
          </div>

        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-100/30 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />
      </section>

      {/* Stats / Social Proof */}
      <section className="py-10 border-y border-gray-900/10 bg-gray-900/5 dark:bg-gray-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">10k+</span>
              <span className="text-sm text-gray-700 dark:text-gray-400 font-medium uppercase tracking-wider">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">₹5Cr+</span>
              <span className="text-sm text-gray-700 dark:text-gray-400 font-medium uppercase tracking-wider">Expenses Tracked</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">4.9/5</span>
              <span className="text-sm text-gray-700 dark:text-gray-400 font-medium uppercase tracking-wider">User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight ">
              Everything you need to <br/> split <span className="text-primary">fair & square</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Powerful features designed for the Indian way of living. From flat rents to weekend getaways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-white" />}
              iconBg="bg-blue-500"
              title="Group Tracking"
              description="Create groups for flatmates, trips, or office lunches. Keep everyone in sync with real-time updates."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-white" />}
              iconBg="bg-secondary"
              title="Smart Splitting"
              description="Split equally, by percentage, or custom amounts. Our algorithm handles the math so you don't have to."
            />
             <FeatureCard 
              icon={<Zap className="w-8 h-8 text-white" />}
              iconBg="bg-purple-500"
              title="Instant Settlement"
              description="Record payments and settle up instantly. Keep track of who owes who with a clear balance sheet."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-gray-900/5 dark:bg-gray-900/20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
           <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              How Splitzy Works
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Get started in minutes. It&apos;s as easy as 1-2-3.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-900/20 dark:bg-gray-700/50 -z-10 border-t-2 border-dashed border-gray-900/20 dark:border-gray-700/50" />

            <Step 
              number="1"
              title="Create a Group"
              description="Start a group for your trip, house, or dinner. Invite friends with a simple link."
            />
            <Step 
              number="2"
              title="Add Expenses"
              description="Log costs as you go. Upload receipts and add details so everyone knows what it's for."
            />
             <Step 
              number="3"
              title="Settle Up"
              description="Check balances at any time. Settle debts with integrated payment links or record cash payments."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
               </svg>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight relative z-10">Ready to split smarter?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of users who trust Splitzy for their shared expenses. Sign up today and never argue over a bill again.
            </p>
            <Link href="/dashboard" className="relative z-10">
               <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50 font-bold text-lg px-10 py-7 h-auto shadow-xl transition-all hover:scale-105">
                Start Splitting Free
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}

function FeatureCard({ icon, iconBg, title, description }) {
  return (
    <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center relative p-4">
      <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-indigo-50 dark:border-gray-700 text-primary flex items-center justify-center text-xl font-bold mb-6 shadow-sm z-10 relative">
        {number}
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-20" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
