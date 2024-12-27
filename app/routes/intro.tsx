import React from 'react';
import { 
  Clock, 
  Users, 
  Zap, 
  Shield, 
  Smartphone,
  BarChart,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col h-full w-full bg-black items-center" >
      <Header/>  
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center mt-20">
          <h1 className="text-5xl font-bold mb-6">
            Manage Tasks, Boost Productivity
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Transform the way your team works with our all-in-one task management solution. 
            Streamline workflows, collaborate seamlessly, and achieve more together.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-gray-800 px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
              Watch Demo
              <Play className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock />}
              title="Time Management"
              description="Track time, monitor productivity, and generate detailed reports. Make every minute count with intelligent time tracking."
            />
            <FeatureCard 
              icon={<Users />}
              title="Team Collaboration"
              description="Real-time chat, file sharing, and seamless communication tools to keep your team connected and productive."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Task Automation"
              description="Automate recurring tasks, notifications, and workflows to reduce manual work and boost efficiency."
            />
            <FeatureCard 
              icon={<Shield />}
              title="Enterprise Security"
              description="Bank-grade security with role-based access, 2FA, and data encryption to keep your information safe."
            />
            <FeatureCard 
              icon={<Smartphone />}
              title="Mobile Ready"
              description="Stay productive on the go with our powerful mobile apps. Track time and manage tasks from anywhere."
            />
            <FeatureCard 
              icon={<BarChart />}
              title="Advanced Analytics"
              description="Gain insights with detailed reports and analytics. Make data-driven decisions to improve productivity."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Create & Organize"
              description="Create tasks, set priorities, and organize work with intuitive drag-and-drop interfaces."
            />
            <StepCard 
              number="2"
              title="Collaborate & Track"
              description="Work together in real-time, track progress, and stay updated with smart notifications."
            />
            <StepCard 
              number="3"
              title="Analyze & Improve"
              description="Review performance metrics, identify bottlenecks, and optimize your workflow."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Trusted by Teams Worldwide
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="This platform has transformed how our team collaborates. The time tracking and analytics features are game-changers."
              author="Sarah Johnson"
              role="Project Manager, TechCorp"
            />
            <TestimonialCard 
              quote="The automation features have saved us countless hours. It's like having an extra team member handling all the routine tasks."
              author="Michael Chen"
              role="Team Lead, InnovateCo"
            />
            <TestimonialCard 
              quote="The mobile app keeps our remote team connected and productive. We couldn't imagine working without it now."
              author="Emma Rodriguez"
              role="Operations Director, GlobalTech"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using our platform to achieve more.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
      <Footer/>
      
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6  rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="w-12 h-12 text-cyan-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="p-6  rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role }) => {
  return (
    <div className="p-6  rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="text-cyan-500 mb-4">
        <CheckCircle size={24} />
      </div>
      <p className="text-gray-400 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>

  );
};

export default LandingPage;