import { motion } from 'framer-motion';
import { Phone, Clock, AlertCircle } from 'lucide-react';

const TokenCard = ({ token, isCurrent = false }) => {
  const isEmergency = token.priority === 1;
  const formatTime = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass p-4 rounded-xl border-2 transition-all ${
        isCurrent
          ? 'border-teal bg-teal/10'
          : isEmergency
          ? 'border-red-500/50 bg-red-500/10'
          : 'border-white/10'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
              isCurrent
                ? 'bg-teal text-navy'
                : isEmergency
                ? 'bg-red-500 text-white'
                : 'bg-white/10 text-white'
            }`}
          >
            {token.token_number}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Token #{token.token_number}</h3>
              {isEmergency && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Emergency
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <Phone className="w-3 h-3" />
              <span>{token.phone_number}</span>
            </div>
          </div>
        </div>
        {isCurrent && (
          <div className="px-3 py-1 bg-teal/20 text-teal text-xs font-semibold rounded-full">
            Current
          </div>
        )}
      </div>
      {token.estimated_time && !isCurrent && (
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
          <Clock className="w-3 h-3" />
          <span>Est. time: {formatTime(token.estimated_time)}</span>
        </div>
      )}
    </motion.div>
  );
};

export default TokenCard;
