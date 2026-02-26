import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = ({ activePage }) => {
    const titles = {
        dashboard: 'Dashboard Overview',
        tasks: 'Study Planner',
        subjects: 'Subject Organizer',
        schedule: 'Study Schedule',
        progress: 'Growth Analytics'
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">{titles[activePage]}</h1>
                <p className="text-slate-500 text-sm">Welcome back, Student!</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
