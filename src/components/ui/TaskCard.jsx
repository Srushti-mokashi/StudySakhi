import React from 'react';
import {
    Calendar,
    MoreVertical,
    CheckCircle2,
    Circle,
    Trash2,
    Edit2,
    Clock,
    Flag
} from 'lucide-react';
import { cn } from '../../utils/cn';

const TaskCard = ({ task, subject, onToggle, onDelete, onEdit }) => {
    const isCompleted = task.status === 'Completed';

    const priorityColors = {
        High: 'text-red-600 bg-red-50',
        Medium: 'text-orange-600 bg-orange-50',
        Low: 'text-blue-600 bg-blue-50',
    };

    return (
        <div className={cn(
            "group relative bg-white p-5 rounded-2xl border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-1",
            isCompleted && "bg-slate-50/50 opacity-75"
        )}>
            <div className="flex items-start justify-between mb-4">
                <button
                    onClick={() => onToggle(task.id)}
                    className={cn(
                        "mt-1 transition-colors",
                        isCompleted ? "text-green-500" : "text-slate-300 hover:text-primary-500"
                    )}
                >
                    {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div className="flex-1 px-3">
                    <h4 className={cn(
                        "font-semibold text-slate-800 leading-tight",
                        isCompleted && "line-through text-slate-400"
                    )}>
                        {task.title}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium mt-1 inline-block">
                        {subject?.name}
                    </span>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(task.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {task.description}
            </p>

            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Calendar size={14} />
                    <span>{task.dueDate}</span>
                </div>

                <div className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    priorityColors[task.priority]
                )}>
                    {task.priority}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
