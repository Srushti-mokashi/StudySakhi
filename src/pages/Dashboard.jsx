import React from 'react';
import {
    Users,
    CheckCircle,
    Clock,
    Calendar as CalendarIcon,
    Plus
} from 'lucide-react';
import DashboardCard from '../components/ui/DashboardCard';
import ProgressBar from '../components/ui/ProgressBar';
import TaskCard from '../components/ui/TaskCard';

const Dashboard = ({ tasks, subjects, onToggleTask, onDeleteTask, onEditTask, onAddTask }) => {
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const pendingTasks = tasks.length - completedTasks;
    const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = tasks.filter(t => t.dueDate === today);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="Total Tasks"
                    value={tasks.length}
                    icon={Users}
                    color="blue"
                    trend="up"
                    trendValue={12}
                />
                <DashboardCard
                    title="Completed"
                    value={completedTasks}
                    icon={CheckCircle}
                    color="green"
                    trend="up"
                    trendValue={8}
                />
                <DashboardCard
                    title="Pending"
                    value={pendingTasks}
                    icon={Clock}
                    color="orange"
                    trend="down"
                    trendValue={5}
                />
                <DashboardCard
                    title="Today's Tasks"
                    value={todaysTasks.length}
                    icon={CalendarIcon}
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Study Progress</h2>
                            <p className="text-slate-500 text-sm">Overall completion across all subjects</p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-primary-600">{Math.round(completionRate)}%</span>
                            <p className="text-xs text-slate-400 font-medium">Done</p>
                        </div>
                    </div>

                    <ProgressBar progress={completionRate} color="bg-primary-600" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        {subjects.slice(0, 4).map(sub => {
                            const subTasks = tasks.filter(t => t.subjectId === sub.id);
                            const subCompleted = subTasks.filter(t => t.status === 'Completed').length;
                            const subRate = subTasks.length > 0 ? (subCompleted / subTasks.length) * 100 : 0;

                            return (
                                <div key={sub.id} className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sub.color }} />
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{sub.name}</span>
                                    </div>
                                    <ProgressBar progress={subRate} color="bg-slate-900" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col">
                        <h2 className="text-xl font-bold mb-2">Today's Schedule</h2>
                        <p className="text-slate-400 text-sm mb-6">Focus on these tasks for today</p>

                        <div className="space-y-4 flex-1">
                            {todaysTasks.length > 0 ? todaysTasks.map(task => (
                                <div key={task.id} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/20 transition-all cursor-pointer">
                                    <div>
                                        <h4 className="font-semibold text-sm">{task.title}</h4>
                                        <p className="text-xs text-slate-400">{subjects.find(s => s.id === task.subjectId)?.name}</p>
                                    </div>
                                    <button onClick={() => onToggleTask(task.id)} className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                                        {task.status === 'Completed' ? <CheckCircle size={14} /> : null}
                                    </button>
                                </div>
                            )) : (
                                <div className="flex flex-col items-center justify-center h-48 text-center">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <CalendarIcon className="text-slate-500" />
                                    </div>
                                    <p className="text-slate-400 text-sm italic">No tasks for today.<br />Take a break or plan ahead!</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onAddTask}
                            className="mt-6 w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all active:scale-95"
                        >
                            <Plus size={18} />
                            Add New Task
                        </button>
                    </div>

                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
