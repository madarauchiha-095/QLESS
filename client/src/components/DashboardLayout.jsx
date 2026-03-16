import { LogOut, Building2 } from 'lucide-react';

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="glass-strong border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-teal" />
            <div>
              <h1 className="text-xl font-bold">Hospital Queue Management</h1>
              <p className="text-sm text-gray-400">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
