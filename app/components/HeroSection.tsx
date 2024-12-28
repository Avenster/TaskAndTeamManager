import React from 'react';
import { 
  ArrowRight, Play, Shield, BarChart, Sparkles, Zap, 
  Target, Rocket, Clock, Users, Workflow, Bell, 
  LayoutDashboard, Laptop, Cloud, Lock,Home
} from 'lucide-react';

// Features data with enhanced descriptions and points
const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Smart Time Tracking",
    description: "Level up your productivity with AI-powered time tracking. Get insights that actually matter.",
    points: [
      "Automatic task timing",
      "AI productivity insights",
      "Custom report generation",
      "Real-time team tracking",
      "Billable hours automation"
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Synergy",
    description: "Connect your squad with next-gen collaboration tools. Stay in sync, always.",
    points: [
      "Real-time chat & updates",
      "File sharing & collab",
      "Video meetings integration",
      "Team activity dashboard",
      "Task discussions"
    ]
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Workflow Automation",
    description: "Let AI handle the boring stuff. Automate repetitive tasks and focus on what matters.",
    points: [
      "Smart task creation",
      "Automated reminders",
      "Custom workflows",
      "Integration with your tools",
      "AI-powered suggestions"
    ]
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Project Command Center",
    description: "Your mission control for project success. Track, manage, and optimize everything.",
    points: [
      "Visual project tracking",
      "Resource management",
      "Progress analytics",
      "Risk monitoring",
      "Budget tracking"
    ]
  }
];

const benefits = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Enterprise Security",
    points: [
      "End-to-end encryption",
      "Two-factor authentication",
      "Regular security audits",
      "Access control",
      "Data backup & recovery"
    ]
  },
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Work Anywhere",
    points: [
      "Mobile-first design",
      "Offline capabilities",
      "Cross-device sync",
      "Native apps",
      "Browser extension"
    ]
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Integration",
    points: [
      "Google Workspace sync",
      "Microsoft 365 integration",
      "Cloud storage connect",
      "API access",
      "Custom webhooks"
    ]
  }
];

const steps = [
  {
    title: "Set Up in Seconds",
    description: "Get started instantly with our intuitive setup. Import your tasks, invite your team, and you're ready to roll. No complex configurations needed."
  },
  {
    title: "Collaborate & Create",
    description: "Work together in real-time. Chat, share files, and track progress all in one place. Stay connected with your team, no matter where they are."
  },
  {
    title: "Level Up & Scale",
    description: "Watch your productivity soar with AI insights and analytics. Make data-driven decisions and continuously optimize your workflow."
  }
];

// Enhanced BenefitCard component
const BenefitCard = ({ icon, title, points }) => (
  <div className="group rounded-lg p-6 border border-white/10 hover:border-cyan-500/50 bg-black relative transition-all duration-300 hover:translate-y-[-2px]">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
    <div className="relative">
      <div className="text-cyan-500 mb-4 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
        {title}
      </h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-center text-gray-300 group-hover:text-white transition-colors">
            <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2 group-hover:scale-150 transition-transform" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Feature Card component
const FeatureCard = ({ feature }) => (
  <div className="group rounded-lg p-6 border border-white/10 hover:border-cyan-500/50 bg-black relative transition-all duration-300 hover:translate-y-[-2px]">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
    <div className="relative">
      <div className="text-cyan-500 mb-4 transform group-hover:scale-110 transition-transform">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
        {feature.title}
      </h3>
      <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
        {feature.description}
      </p>
      <ul className="space-y-2">
        {feature.points.map((point, idx) => (
          <li key={idx} className="flex items-center text-gray-300 group-hover:text-white transition-colors">
            <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2 group-hover:scale-150 transition-transform" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Introduction = () => {
  return (
    <div className="max-w-5xl w-full h-full scrollbar-custom overflow-y-auto bg-black text-white">
      <div className="ml-10">
        {/* Enhanced Breadcrumb */}
        <div className="px-6 py-4 text-gray-400 flex items-center space-x-2">
        <Home className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">/</span>
        <span className="text-gray-400 hover:text-cyan-500 cursor-pointer transition-colors">Dashboard</span>
        <span className="text-gray-400">/</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-medium">
          Introduction
        </span>
        </div>

        {/* Hero Section */}
        <div className="relative max-w-4xl px-6 py-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center mb-4 text-cyan-500">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Next-Gen Task Management</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Level Up Your Productivity
              </span>
            </h1>
            <p className="text-gray-400 text-xl font-light mb-8 leading-relaxed">
              Transform your workflow with our AI-powered task management solution. 
              Built for the next generation of achievers. 🚀
            </p>
            <div className="flex gap-4 mb-16">
              <button className="group bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-black border border-white/10 px-6 py-3 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center">
                Watch Demo
                <Play className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Features Section */}
          <section className="mb-16 relative">
            <div className="flex items-center mb-8">
              <Zap className="w-6 h-6 text-cyan-500 mr-2" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Features that Hit Different
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </section>

          {/* Steps Section */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Target className="w-6 h-6 text-cyan-500 mr-2" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Three Steps to Success
              </h2>
            </div>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="group border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                  <div className="relative flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors pl-14">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Rocket className="w-6 h-6 text-cyan-500 mr-2" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Why We're Built Different
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  points={benefit.points}
                />
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative rounded-lg p-10 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
            <div className="relative text-center">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Ready to Level Up Your Game?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Join thousands of teams already crushing their goals! ✨
              </p>
              <button className="group bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center mx-auto">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Introduction;