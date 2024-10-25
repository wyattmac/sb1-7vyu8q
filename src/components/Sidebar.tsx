import { MapPin, FolderOpen, Users, Calendar, Settings, FileText, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: FolderOpen, label: 'Projects', id: 'projects' },
    { icon: Users, label: 'Clients', id: 'clients' },
    { icon: FileText, label: 'Field Notes', id: 'notes' },
    { icon: Calendar, label: 'Schedule', id: 'schedule' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="h-screen w-64 bg-slate-800 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <MapPin className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold">SurveyPro</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors ${
              currentPage === item.id ? 'bg-slate-700 text-white' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}