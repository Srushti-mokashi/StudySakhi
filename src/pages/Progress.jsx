import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';

const Progress = ({ tasks, subjects }) => {
    // Data for Tasks per Subject (Bar Chart)
    const tasksPerSubject = subjects.map(sub => ({
        name: sub.name,
        total: tasks.filter(t => t.subjectId === sub.id).length,
        completed: tasks.filter(t => t.subjectId === sub.id && t.status === 'Completed').length,
        color: sub.color
    }));

    // Data for Task Status Distribution (Pie Chart)
    const completedCount = tasks.filter(t => t.status === 'Completed').length;
    const pendingCount = tasks.length - completedCount;
    const statusData = [
        { name: 'Completed', value: completedCount, color: '#10B981' },
        { name: 'Pending', value: pendingCount, color: '#F59E0B' }
    ];

    // Mock Daily Productivity (Line Chart)
    const productivityData = [
        { day: 'Mon', tasks: 3 },
        { day: 'Tue', tasks: 5 },
        { day: 'Wed', tasks: 2 },
        { day: 'Thu', tasks: 7 },
        { day: 'Fri', tasks: 4 },
        { day: 'Sat', tasks: 1 },
        { day: 'Sun', tasks: 6 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart: Tasks per Subject */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-8">Tasks per Subject</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tasksPerSubject}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="total" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="completed" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Completion Distribution */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-8">Completion Overview</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-bold text-slate-800">
                                {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
                            </span>
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Completed</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                        {statusData.map(item => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-medium text-slate-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekely Stats */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8">Daily Productivity</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={productivityData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="tasks"
                                stroke="#0ea5e9"
                                strokeWidth={4}
                                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6, stroke: '#fff' }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Progress;
