
import { ArrowRight, Play, Shield, BarChart } from 'lucide-react';
import Footer from './Footer';
// Helper component for benefit cards - defined before it's used
const BenefitCard = ({ icon, title, points }) => (
  <div className="rounded-lg p-6 border  border-white/10 hover:border-gray-700 transition-colors">
    <div className="text-cyan-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="flex items-center text-gray-300">
          <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

// Data arrays - defined before the main component
const features = [
  {
    title: "Intelligent Time Tracking",
    description: "Track time, monitor productivity, and generate detailed reports. Make every minute count with automated time tracking and performance analytics.",
    points: [
      "Automatic time tracking for tasks",
      "Daily and weekly productivity reports",
      "Performance trend analysis",
      "Billable hours calculation"
    ]
  },
  {
    title: "Seamless Team Coordination",
    description: "Connect your team with powerful collaboration tools. Real-time communication, file sharing, and integrated project spaces.",
    points: [
      "Real-time team chat",
      "Document collaboration",
      "Video conferencing integration",
      "Task-specific discussion threads"
    ]
  },
  {
    title: "Smart Automation",
    description: "Reduce manual work with intelligent automation. Set up recurring tasks, automated notifications, and customized workflows.",
    points: [
      "Automated task creation",
      "Smart due date reminders",
      "Custom workflow automation",
      "Scheduled reports"
    ]
  },
  {
    title: "Complete Project Control",
    description: "Keep projects on track with comprehensive management tools. From planning to execution, monitor every aspect of your projects.",
    points: [
      "Multiple project views",
      "Resource allocation",
      "Progress tracking",
      "Risk management"
    ]
  }
];

const steps = [
  {
    title: "Create & Organize",
    description: "Start by creating tasks and organizing your workflow. Set priorities, assign team members, and establish deadlines. Our intuitive interface makes it simple to structure your work exactly how you need it."
  },
  {
    title: "Collaborate & Track",
    description: "Work together seamlessly with your team. Track progress in real-time, share updates, and stay connected through integrated communication tools. Never miss an important update or deadline."
  },
  {
    title: "Analyze & Improve",
    description: "Gain insights through detailed analytics. Understand team performance, identify bottlenecks, and make data-driven decisions to continuously improve your workflow."
  }
];

const Introduction = () => {
  return (
    <div className="h-full max-w-5xl w-full overflow-y-scroll  border-r  border-white/10 bg-black text-white">
    <div className=" overflow-y-scroll ml-10">
      {/* Breadcrumb */}
      <div className="px-6 py-4 text-gray-400">
        <span>Docs</span>
        <span className="mx-2">/</span>
        <span>Introduction</span>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-medium mb-4">Manage Tasks, Boost Productivity</h1>
        <p className="text-gray-400 font-light text-l mb-8">
          Transform the way your team works with our all-in-one task management solution. 
          Streamline workflows, collaborate seamlessly, and achieve more together.
        </p>
        <div className="flex gap-4 mb-16">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center">
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <button className="bg-black border border-white/10 px-6 py-2.5 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            Watch Demo
            <Play className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-8">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className=" rounded-lg p-6 border  border-white/10 hover:border-gray-700 transition-colors">
                <h3 className="text-l font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-m mb-4">{feature.description}</p>
                <ul className="space-y-2 text-m">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-center text-m text-gray-300">
                      <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2 text-m" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Three Steps to Transform Your Workflow</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="border  border-white/10 rounded-lg p-6 hover:border-gray-700 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Shield className="w-6 h-6" />}
              title="Enterprise-Grade Security"
              points={[
                'End-to-end encryption',
                'Two-factor authentication',
                'Regular security audits',
                'Customizable access controls'
              ]}
            />
            {/* <BenefitCard
              icon={<Mobile className="w-6 h-6" />}
              title="Mobile Accessibility"
              points={[
                'Native mobile apps',
                'Offline mode support',
                'Real-time synchronization',
                'Push notifications'
              ]}
            /> */}
            <BenefitCard
              icon={<BarChart className="w-6 h-6" />}
              title="Advanced Analytics"
              points={[
                'Custom report generation',
                'Performance metrics',
                'Resource utilization insights',
                'Trend analysis'
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg p-8 text-center border  border-white/10">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Workflow?</h2>
          <p className="text-gray-400 mb-6">
            Join thousands of teams already using our platform to achieve more.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Get Started Now - Free Trial
          </button>
        </section>
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default Introduction;