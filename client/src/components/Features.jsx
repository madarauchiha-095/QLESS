import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Shield, 
  BarChart3, 
  Bell, 
  Users, 
  Zap 
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Voice-Activated Booking',
    description: 'Patients can book tokens through AI-powered voice calls, making the process accessible to everyone.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with encrypted data transmission and secure patient information handling.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into queue performance, wait times, and patient flow patterns.',
  },
  {
    icon: Bell,
    title: 'SMS Notifications',
    description: 'Automatic SMS alerts keep patients informed about their token status and estimated wait times.',
  },
  {
    icon: Users,
    title: 'Multi-User Support',
    description: 'Support for multiple admin users with role-based access control and activity tracking.',
  },
  {
    icon: Zap,
    title: 'Real-Time Sync',
    description: 'Instant synchronization across all devices ensures everyone sees the latest queue status.',
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-navy/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal to-teal-dark bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage hospital queues efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-xl hover:border-teal/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
