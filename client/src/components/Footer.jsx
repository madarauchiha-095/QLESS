import { Building2, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-teal" />
              <span className="text-xl font-bold">Hospital Queue</span>
            </div>
            <p className="text-gray-400">
              AI-powered queue management system for modern healthcare facilities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@hospitalqueue.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 pt-8 border-t border-gray-800">
          <p>&copy; 2026 Hospital Queue Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
