import React from 'react';
import {
    LayoutDashboard,
    CheckSquare,
    BookOpen,
    BarChart2,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = ({ activePage, setActivePage, collapsed, setCollapsed }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'subjects', label: 'Subjects', icon: BookOpen },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'progress', label: 'Progress', icon: BarChart2 },
    ];

    return (
        <div
            className={cn(
                "h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col sticky top-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-2 font-bold text-xl text-primary-600">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                            S
                        </div>
                        <span>StudyBuddy</span>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white mx-auto">
                        S
                    </div>
                )}
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                                isActive
                                    ? "bg-primary-50 text-primary-600 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                            )}
                        >
                            <Icon size={20} className={cn(isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!collapsed && <span className="font-medium">Collapse</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
