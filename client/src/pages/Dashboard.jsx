import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import TokenCard from '../components/TokenCard';
import QueueList from '../components/QueueList';
import ControlsPanel from '../components/ControlsPanel';
import StatsPanel from '../components/StatsPanel';
import { tokenAPI } from '../services/api';
import { initSocket, disconnectSocket } from '../services/socket';
import { Wifi, WifiOff } from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const [queueState, setQueueState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);

  // Fetch initial queue state
  const fetchQueueState = async () => {
    try {
      const response = await tokenAPI.getStatus();
      if (response.success) {
        setQueueState(response.data);
      }
    } catch (error) {
      console.error('Error fetching queue state:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle queue updates from socket
  const handleQueueUpdate = (data) => {
    setQueueState(data);
  };

  useEffect(() => {
    // Fetch initial state
    fetchQueueState();

    // Initialize socket connection
    const socket = initSocket(handleQueueUpdate);

    socket.on('connect', () => {
      setSocketConnected(true);
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
    });

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleAction = () => {
    // Refresh queue state after action
    fetchQueueState();
  };

  const waitingCount = queueState?.waiting_list?.length || 0;
  const hasCurrent = Boolean(queueState?.current_token);

  if (loading) {
    return (
      <DashboardLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading queue state...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onLogout={onLogout}>
      {/* Connection Status */}
      <div className="mb-4 flex items-center justify-end gap-2">
        {socketConnected ? (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <Wifi className="w-4 h-4" />
            <span>Connected</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <WifiOff className="w-4 h-4" />
            <span>Disconnected</span>
          </div>
        )}
      </div>

      {/* Stats Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <StatsPanel stats={queueState} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Current Token & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Active Token */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Current Token</h2>
            {queueState?.current_token ? (
              <TokenCard token={queueState.current_token} isCurrent={true} />
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No token currently in progress</p>
                <p className="text-sm mt-2">
                  {waitingCount > 0
                    ? 'Click "Call Next Token" to start service.'
                    : 'Waiting queue is empty. Create a token first via AI voice webhook or `/api/tokens`.'}
                </p>
              </div>
            )}
          </motion.div>

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ControlsPanel
              onAction={handleAction}
              canCallNext={waitingCount > 0 && !hasCurrent}
              canComplete={hasCurrent}
            />
          </motion.div>
        </div>

        {/* Right Column - Waiting Queue */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QueueList waitingList={queueState?.waiting_list || []} />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
