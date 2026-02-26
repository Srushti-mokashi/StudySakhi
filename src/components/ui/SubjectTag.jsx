import React from 'react';
import { cn } from '../../utils/cn';

const SubjectTag = ({ subject, active, onClick }) => {
    if (!subject) return null;

    return (
        <button
            onClick={() => onClick && onClick(subject.id)}
            className={cn(
                "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
                active
                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            )}
        >
            <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: subject.color }}
            />
            {subject.name}
        </button>
    );
};

export default SubjectTag;
