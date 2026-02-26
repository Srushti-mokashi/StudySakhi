import React from 'react';
import { cn } from '../../utils/cn';

const DashboardCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
    const colorMap = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>

                    {trend && (
                        <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-md",
                                trend === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                                {trend === 'up' ? '+' : '-'}{trendValue}%
                            </span>
                            <span className="text-slate-400">vs last week</span>
                        </div>
                    )}
                </div>

                <div className={cn("p-3 rounded-xl border", colorMap[color] || colorMap.blue)}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
