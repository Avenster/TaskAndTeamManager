import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Play, Shield, BarChart, Sparkles, Zap, 
  Target, Rocket, Clock, Users, Workflow, Bell, 
  LayoutDashboard, Laptop, Cloud, Lock, Home
} from 'lucide-react';

const features = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Smart Time Tracking",
    description: "AI-powered tracking with insights that matter",
    points: ["Auto task timing", "AI insights", "Custom reports", "Team tracking"]
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Synergy",
    description: "Next-gen collaboration tools to keep teams connected",
    points: ["Real-time updates", "File sharing", "Video meetings", "Activity dashboard"]
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Smart Automation",
    description: "Let AI handle repetitive tasks efficiently",
    points: ["Auto task creation", "Smart reminders", "Custom flows", "AI suggestions"]
  }
];

const benefits = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Enterprise Security",
    points: ["End-to-end encryption", "Two-factor auth", "Access control", "Data backup"]
  },
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "Cloud Integration",
    points: ["Google Workspace", "Microsoft 365", "Cloud storage", "API access"]
  }
];

const BenefitCard = ({ icon, title, points }) => (
  <div className="group rounded-lg p-4 border border-white/10 hover:border-cyan-500/50 bg-black transition-all duration-300">
    <div className="text-cyan-500 mb-3">{icon}</div>
    <h3 className="text-sm font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
      {title}
    </h3>
    <ul className="space-y-1.5">
      {points.map((point, index) => (
        <li key={index} className="flex items-center text-xs text-white/80">
          <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const FeatureCard = ({ feature }) => (
  <div className="group rounded-lg p-4 border border-white/10 hover:border-cyan-500/50 bg-black transition-all duration-300">
    <div className="text-cyan-500 mb-3">{feature.icon}</div>
    <h3 className="text-sm font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
      {feature.title}
    </h3>
    <p className="text-xs text-white/70 mb-3">{feature.description}</p>
    <ul className="space-y-1.5">
      {feature.points.map((point, idx) => (
        <li key={idx} className="flex items-center text-xs text-white/80">
          <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const Introduction = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="max-w-5xl w-full bg-black text-white">
      <div className="px-6 py-3 text-xs flex items-center space-x-2 text-white/60">
        <Home className="w-4 h-4" />
        <span>/</span>
        <span className="hover:text-cyan-500 cursor-pointer">Dashboard</span>
        <span>/</span>
        <span className="text-cyan-500">Introduction</span>
      </div>

      <div className="px-6 py-4 space-y-8">
        {/* Welcome Section */}
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur-xl transition-all duration-500 group-hover:blur-2xl" />
          <div className="relative border border-white/10 rounded-lg p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-500/50">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-full animate-spin-slow opacity-70 blur-sm" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-lg font-bold">
                    {user?.username?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <div className="relative overflow-hidden h-4">
                    <span className="absolute animate-slide-up text-xs bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 text-transparent bg-clip-text font-medium">
                      Welcome back • Glad to see you • Let's create something awesome
                    </span>
                  </div>
                </div>
                <h1 className="text-sm font-medium">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                    {user?.username || user?.name}
                  </span>
                </h1>
                <p className="text-xs text-white/60">{user?.email}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-2 pt-2">
                  <span className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-xs text-cyan-400">
                    Pro Member
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-xs text-purple-400">
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-1"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section>
          <div className="flex items-center mb-4">
            <Zap className="w-4 h-4 text-cyan-500 mr-2" />
            <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Key Features
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section>
          <div className="flex items-center mb-4">
            <Shield className="w-4 h-4 text-cyan-500 mr-2" />
            <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative rounded-lg p-6 border overflow-hidden border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
          <div className="relative text-center space-y-3">
            <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Ready to Get Started?
            </h2>
            <p className="text-xs text-white/70">Join teams already achieving their goals ✨</p>
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg text-xs flex items-center mx-auto">
              Start Now
              <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Introduction;