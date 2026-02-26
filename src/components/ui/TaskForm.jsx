import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, subjects, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subjectId: subjects[0]?.id || '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        status: 'Pending'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Task Title</label>
                <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    placeholder="e.g. Read Physics Chapter 4"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[100px]"
                    placeholder="What needs to be done?"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                    <select
                        value={formData.subjectId}
                        onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                    >
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Due Date</label>
                    <input
                        type="date"
                        required
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Priority</label>
                <div className="flex gap-3">
                    {['Low', 'Medium', 'High'].map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setFormData({ ...formData, priority: p })}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${formData.priority === p
                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 mt-4 active:scale-95"
            >
                {initialData ? 'Update Study Task' : 'Create Study Task'}
            </button>
        </form>
    );
};

export default TaskForm;
