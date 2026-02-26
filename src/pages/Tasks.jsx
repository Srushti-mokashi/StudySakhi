import React, { useState } from 'react';
import { Filter, Search, Plus, SlidersHorizontal } from 'lucide-react';
import TaskCard from '../components/ui/TaskCard';
import SubjectTag from '../components/ui/SubjectTag';

const Tasks = ({ tasks, subjects, onToggleTask, onDeleteTask, onEditTask, onAddTask }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [activeSubject, setActiveSubject] = useState('all');

    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filter === 'All' || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());
        const matchesSubject = activeSubject === 'all' || task.subjectId === activeSubject;
        return matchesStatus && matchesSearch && matchesSubject;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <SubjectTag
                        subject={{ name: 'All Subjects', id: 'all', color: '#cbd5e1' }}
                        active={activeSubject === 'all'}
                        onClick={() => setActiveSubject('all')}
                    />
                    {subjects.map(sub => (
                        <SubjectTag
                            key={sub.id}
                            subject={sub}
                            active={activeSubject === sub.id}
                            onClick={setActiveSubject}
                        />
                    ))}
                </div>

                <button
                    onClick={onAddTask}
                    className="btn-primary whitespace-nowrap lg:px-6 py-3"
                >
                    <Plus size={20} />
                    Create Task
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search your tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {['All', 'Pending', 'Completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === status
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            subject={subjects.find(s => s.id === task.subjectId)}
                            onToggle={onToggleTask}
                            onDelete={onDeleteTask}
                            onEdit={onEditTask}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="text-slate-300" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">No tasks found</h3>
                        <p className="text-slate-500 max-w-xs">We couldn't find any tasks matching your criteria. Try adjusting your filters or search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;
