import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10K+',
    label: 'Patients Served',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    value: '50%',
    label: 'Wait Time Reduction',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: CheckCircle,
    value: '99.9%',
    label: 'Uptime',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    value: '4.8/5',
    label: 'Patient Satisfaction',
    color: 'from-orange-500 to-red-500',
  },
];

const Stats = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong p-6 rounded-xl text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
