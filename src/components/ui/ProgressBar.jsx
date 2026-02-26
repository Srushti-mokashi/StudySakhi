import React from 'react';
import { cn } from '../../utils/cn';

const ProgressBar = ({ progress, label, color = 'bg-primary-600' }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                {label && <span className="text-sm font-medium text-slate-600">{label}</span>}
                <span className="text-sm font-bold text-slate-800">{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-500 ease-out rounded-full", color)}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
