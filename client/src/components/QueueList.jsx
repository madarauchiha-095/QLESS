import { motion } from 'framer-motion';
import TokenCard from './TokenCard';
import { Users } from 'lucide-react';

const QueueList = ({ waitingList }) => {
  if (!waitingList || waitingList.length === 0) {
    return (
      <div className="glass p-8 rounded-xl text-center">
        <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">No tokens in waiting queue</p>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-teal" />
        <h2 className="text-xl font-semibold">Waiting Queue ({waitingList.length})</h2>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {waitingList.map((token, index) => (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TokenCard token={token} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QueueList;
