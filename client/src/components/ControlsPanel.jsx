import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  CheckCircle,
  AlertTriangle,
  Phone,
  Loader,
} from 'lucide-react';
import { tokenAPI } from '../services/api';

const ControlsPanel = ({ onAction, canCallNext = true, canComplete = true }) => {
  const [loading, setLoading] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);

  const getApiErrorMessage = (error, fallback) => {
    return (
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      fallback
    );
  };

  const handleCallNext = async () => {
    setLoading('next');
    try {
      await tokenAPI.callNext();
      onAction();
    } catch (error) {
      console.error('Error calling next token:', error);
      alert(getApiErrorMessage(error, 'Unable to call next token.'));
    } finally {
      setLoading('');
    }
  };

  const handleComplete = async () => {
    setLoading('complete');
    try {
      await tokenAPI.completeToken();
      onAction();
    } catch (error) {
      console.error('Error completing token:', error);
      alert(getApiErrorMessage(error, 'Unable to complete current token.'));
    } finally {
      setLoading('');
    }
  };

  const handleEmergencySubmit = async (e) => {
    e.preventDefault();
    if (!emergencyPhone.trim()) {
      alert('Please enter a phone number');
      return;
    }

    setLoading('emergency');
    try {
      await tokenAPI.createEmergencyToken(emergencyPhone);
      setEmergencyPhone('');
      setShowEmergencyForm(false);
      onAction();
    } catch (error) {
      console.error('Error creating emergency token:', error);
      alert('Failed to create emergency token');
    } finally {
      setLoading('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Call Next Button */}
      <motion.button
        onClick={handleCallNext}
        disabled={loading !== '' || !canCallNext}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-teal to-teal-dark text-navy font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === 'next' ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Play className="w-5 h-5" />
        )}
        <span>Call Next Token</span>
      </motion.button>
      {!canCallNext && (
        <p className="text-xs text-gray-400">
          No waiting tokens yet. Create a token first (AI voice webhook or `/api/tokens`).
        </p>
      )}

      {/* Complete Button */}
      <motion.button
        onClick={handleComplete}
        disabled={loading !== '' || !canComplete}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === 'complete' ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <CheckCircle className="w-5 h-5" />
        )}
        <span>Complete Current</span>
      </motion.button>
      {!canComplete && (
        <p className="text-xs text-gray-400">
          Nothing is in progress. Call the next token to start service.
        </p>
      )}

      {/* Emergency Token */}
      {!showEmergencyForm ? (
        <motion.button
          onClick={() => setShowEmergencyForm(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Add Emergency Token</span>
        </motion.button>
      ) : (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleEmergencySubmit}
          className="glass p-4 rounded-lg space-y-3"
        >
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Emergency Phone Number
            </label>
            <input
              type="tel"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              placeholder="+91XXXXXXXXXX"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading !== ''}
              className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              {loading === 'emergency' ? (
                <Loader className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                'Create Emergency Token'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowEmergencyForm(false);
                setEmergencyPhone('');
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default ControlsPanel;
