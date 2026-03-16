import { motion } from 'framer-motion';
import { Phone, Clock, CheckCircle, Zap } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: 'AI Voice Call',
    description: 'Patients call and interact with our AI system to book tokens automatically.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Smart Queue',
    description: 'Tokens are intelligently queued with estimated wait times and priority handling.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Emergency Priority',
    description: 'Emergency cases are automatically prioritized and moved to the front of the queue.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: CheckCircle,
    title: 'Real-time Updates',
    description: 'Live dashboard updates keep staff and patients informed of queue status instantly.',
    color: 'from-green-500 to-emerald-500',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal to-teal-dark bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A seamless flow from patient call to token completion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong p-6 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                <div className="mt-4 text-teal font-semibold">
                  Step {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
