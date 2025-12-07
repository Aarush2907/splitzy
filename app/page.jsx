import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
           <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-1.5 text-sm md:text-base hover:bg-blue-100 transition shadow-sm">
            Track together. Spend smarter.
          </Badge>
          <h1 className="gradient-title text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight animate-fade-in-up">
            Split expenses, <br className="hidden md:block"/>
            not friendships.
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            The smartest way to track shared expenses. Settle up with housemates, trips, and friends without the awkwardness.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                Get Started
              </Button>
            </Link>
             <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-gray-50 transition-all">
                How it works
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-10 opacity-60 mix-blend-multiply filter pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-3xl -z-10 opacity-60 mix-blend-multiply filter pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 mb-4 pb-2">
              Everything you need to split fair
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Powerful features that make tracking expenses simple, transparent, and fair for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-blue-600" />}
              title="Group Tracking"
              description="Create groups for trips, housemates, or projects. Keep everyone in sync with real-time expense updates."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-10 h-10 text-cyan-500" />}
              title="Smart Splitting"
              description="Split equally, by percentage, or custom amounts. Our algorithm handles the math so you don't have to."
            />
             <FeatureCard 
              icon={<Zap className="w-10 h-10 text-purple-600" />}
              title="Instant Settlement"
              description="Record payments and settle up instantly. Keep track of who owes who with a clear, simple balance sheet."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Splitzy Works
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Get started in minutes. It&apos;s as easy as 1-2-3.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-blue-200 via-cyan-200 to-blue-200 -z-10" />

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
      <section className="py-24 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to split smarter?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust Splitzy for their shared expenses. Sign up today and never argue over a bill again.
          </p>
          <Link href="/dashboard">
             <Button size="lg" variant="secondary" className="text-blue-700 hover:text-blue-800 font-bold text-lg px-10 py-6 hover:shadow-xl transition-all">
              Start Splitting Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center relative bg-slate-50 p-4">
      <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-500/20 z-10">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
