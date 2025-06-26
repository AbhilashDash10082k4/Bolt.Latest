"use client"
import React, { useEffect, useState } from 'react';
import { 
  Code2, 
  Database, 
  Smartphone, 
  Chrome, 
  Server, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Layers,
  Rocket
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const technologies = [
    {
      icon: Code2,
      title: "React & Next.js",
      description: "Modern, responsive web applications with cutting-edge React and Next.js frameworks",
      gradient: "from-blue-500 to-violet-600"
    },
    {
      icon: Server,
      title: "Node.js & Spring Boot",
      description: "Robust backend services with Node.js and enterprise-grade Java Spring Boot applications",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "Seamless database solutions with Prisma ORM and PostgreSQL for scalable data management",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Chrome,
      title: "Chrome Extensions",
      description: "Powerful browser extensions that enhance productivity and user experience",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications using Expo for iOS and Android deployment",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Globe,
      title: "Full-Stack Solutions",
      description: "Complete end-to-end applications with seamless frontend and backend integration",
      gradient: "from-violet-600 to-blue-600"
    }
  ];

  const features = [
    "Lightning-fast development with AI assistance",
    "Production-ready code with best practices",
    "Responsive design for all devices",
    "Modern architecture and clean code",
    "Database design and optimization",
    "API development and integration"
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-thin" style={{ scrollBehavior: 'smooth' }}>
      {/* Darker Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/10 via-blue-950/10 to-black pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <Sparkles className="w-16 h-16 mx-auto text-violet-400 animate-bounce" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extralight mb-6 bg-gradient-to-r from-white via-violet-200 to-blue-300 bg-clip-text text-transparent leading-tight tracking-wide">
            AI Agent
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Your intelligent development companion that creates production-ready applications across 
            <span className="text-violet-400 font-normal"> web</span>, 
            <span className="text-blue-400 font-normal"> mobile</span>, and 
            <span className="text-indigo-400 font-normal"> enterprise</span> platforms
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full font-light text-lg hover:from-violet-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25">
              Start Building
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-violet-500/50 rounded-full font-light text-lg hover:bg-violet-500/5 transition-all duration-300">
              View Capabilities
            </button>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent tracking-wide">
              Powered by Modern Technologies
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
              From frontend frameworks to backend services, databases to mobile apps - we&apos;ve got every technology stack covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={index}
                  className={`group relative p-8 rounded-2xl bg-gradient-to-br from-gray-950/70 to-gray-900/40 border border-gray-800/30 hover:border-violet-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/5`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : ''
                  }}
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${tech.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-light mb-4 text-white group-hover:text-violet-300 transition-colors">
                    {tech.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors font-light">
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-violet-950/5 via-blue-950/5 to-violet-950/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extralight mb-8 bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent tracking-wide">
                Why Choose Our AI Agent?
              </h2>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/2 transition-colors duration-300"
                  >
                    <CheckCircle className="w-6 h-6 text-violet-400 flex-shrink-0" />
                    <span className="text-lg text-gray-400 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-blue-600/10 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-gray-950/90 to-gray-900/70 p-8 rounded-3xl border border-gray-800/30 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <Rocket className="w-12 h-12 text-violet-400" />
                  <Layers className="w-12 h-12 text-blue-400" />
                  <Zap className="w-12 h-12 text-indigo-400" />
                </div>
                
                <h3 className="text-2xl font-light text-center mb-4 text-white">
                  Full-Stack Development
                </h3>
                
                <p className="text-gray-500 text-center leading-relaxed font-light">
                  From concept to deployment, our AI agent handles every aspect of your project with precision and speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extralight mb-8 bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent tracking-wide">
            Ready to Build the Future?
          </h2>
          
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light">
            Join thousands of developers who are already using our AI agent to create amazing applications faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group px-10 py-5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full font-light text-xl hover:from-violet-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-violet-500/20">
              Get Started Free
              <Sparkles className="inline ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900/50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 font-light">
            © 2025 AI Agent. Revolutionizing development, one project at a time.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;