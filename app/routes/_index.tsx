

////////////////////////////////////////////////////////

import React from 'react';
import { 
  Clock, Users, Zap, Shield, Smartphone, BarChart, 
  CheckCircle, ArrowRight, Play, Sparkles, Rocket,
  Star, ChevronRight, Globe, Award
} from 'lucide-react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col h-fit  w-full bg-black items-center ">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative w-full py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
            <span className="text-cyan-500 font-medium">Revolutionize Your Workflow</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Manage Tasks,<br />Boost Productivity
          </h1>
          
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform the way your team works with our AI-powered task management solution. 
            Streamline workflows, collaborate seamlessly, and achieve more together. 🚀
          </p>
          
          <div className="flex justify-center gap-4">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-black border border-white/10 px-8 py-4 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center">
              Watch Demo
              <Play className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Tasks Completed', value: '1M+' },
              { label: 'Team Productivity', value: '45%↑' }
            ].map((stat, index) => (
              <div key={index} className="px-6 py-4 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative w-full py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="w-5 h-5 text-cyan-500 mr-2" />
            <span className="text-cyan-500 font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Everything You Need to Succeed
          </h2>
          
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Unlock your team's full potential with our comprehensive suite of tools designed for modern workflows.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock />}
              title="Smart Time Tracking"
              description="AI-powered time tracking and productivity monitoring. Get insights that actually matter."
            />
            <FeatureCard 
              icon={<Users />}
              title="Seamless Collaboration"
              description="Real-time chat, file sharing, and team spaces. Stay connected, stay productive."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Intelligent Automation"
              description="Let AI handle routine tasks. Focus on what matters most to your team."
            />
            <FeatureCard 
              icon={<Shield />}
              title="Enterprise Security"
              description="Bank-grade security with 2FA and end-to-end encryption. Your data stays safe."
            />
            <FeatureCard 
              icon={<Smartphone />}
              title="Work Anywhere"
              description="Native mobile apps with offline support. Your office goes where you go."
            />
            <FeatureCard 
              icon={<BarChart />}
              title="Rich Analytics"
              description="Data-driven insights and custom reports. Make informed decisions, every time."
            />
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="relative w-full py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-5 h-5 text-cyan-500 mr-2" />
            <span className="text-cyan-500 font-medium">Simple Process</span>
          </div>
          
          <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Three Steps to Transform Your Workflow
          </h2>
          
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Get up and running in minutes. No complex setup required.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Create & Organize"
              description="Set up your workspace in seconds. Import tasks, invite your team, and you're ready to go."
            />
            <StepCard 
              number="2"
              title="Collaborate & Track"
              description="Work together in real-time. Chat, share files, and keep everyone in sync."
            />
            <StepCard 
              number="3"
              title="Analyze & Improve"
              description="Get AI-powered insights. Make data-driven decisions to boost productivity."
            />
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative w-full py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-5 h-5 text-cyan-500 mr-2" />
            <span className="text-cyan-500 font-medium">Success Stories</span>
          </div>
          
          <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Trusted by Teams Worldwide
          </h2>
          
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Join thousands of teams already using our platform to achieve more.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="This platform has revolutionized how our team works together. The AI features are mind-blowing!"
              author="Sarah Johnson"
              role="Project Manager, TechCorp"
              rating={5}
            />
            <TestimonialCard 
              quote="The automation saves us hours every week. It's like having an extra team member handling all the routine work."
              author="Michael Chen"
              role="Team Lead, InnovateCo"
              rating={5}
            />
            <TestimonialCard 
              quote="The mobile app keeps our remote team in perfect sync. We couldn't imagine working without it now."
              author="Emma Rodriguez"
              role="Operations Director, GlobalTech"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative w-full py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Ready to Level Up Your Workflow?
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Join the next generation of productive teams. Start your journey today! ✨
          </p>
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center mx-auto">
            Get Started Now - It's Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group p-6 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300 bg-black/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
      <div className="relative">
        <div className="w-12 h-12 text-cyan-500 mb-4 transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
      </div>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="group p-6 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300 bg-black/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold group-hover:scale-110 transition-transform">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
      </div>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, rating }) => {
  return (
    <div className="group p-6 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300 bg-black/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
      <div className="relative">
        <div className="text-cyan-500 mb-4">
          <div className="flex space-x-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} size={20} className="fill-cyan-500" />
            ))}
          </div>
        </div>
        <p className="text-gray-400 mb-6 italic group-hover:text-gray-300 transition-colors">"{quote}"</p>
        <div>
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            {author}
          </p>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;