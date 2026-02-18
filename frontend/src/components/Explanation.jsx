import React, { useState, useEffect } from 'react';

const Explanation = ({ steps }) => {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (!steps) return;
        setVisibleCount(0);

        // Faster animation if many steps
        const delay = steps.length > 50 ? 20 : 50;

        const interval = setInterval(() => {
            setVisibleCount(prev => {
                if (prev < steps.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, delay);

        return () => clearInterval(interval);
    }, [steps]);

    if (!steps || steps.length === 0) return null;

    const renderStep = (step, index) => {
        if (index >= visibleCount) return null;

        // Section Header
        if (step.startsWith('---')) {
            return (
                <li key={index} className="pt-6 pb-3 animate-fade-in-up">
                    <span className="font-bold text-indigo-300 bg-indigo-500/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border border-indigo-500/30">
                        {step.replace(/---/g, '').trim()}
                    </span>
                </li>
            );
        }

        // Calculation Detail (k=...)
        if (step.trim().startsWith('k=')) {
            // "k=1: cost=2000 (0 + 0 + 10*30*5)"
            const parts = step.split(':');
            const kPart = parts[0].trim(); // k=1
            const rest = parts.slice(1).join(':').trim(); // cost=2000 (...)

            return (
                <li key={index} className="flex gap-4 pl-4 border-l-2 border-slate-700 py-2 hover:bg-white/5 transition-colors animate-fade-in-left rounded-r-lg group">
                    <span className="text-slate-500 select-none text-xs flex items-center w-6 justify-end">{index + 1}.</span>
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="font-semibold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded text-xs border border-pink-500/20">{kPart}</span>
                        <span className="text-slate-300 group-hover:text-slate-200 transition-colors">{rest}</span>
                    </div>
                </li>
            );
        }

        // Result Update (m[i][j]...)
        if (step.trim().startsWith('m[')) {
            // "m[1][2]: Min cost is 2000 at k=1. Candidates: ..."
            const colonIndex = step.indexOf(':');
            const mPart = step.substring(0, colonIndex).trim();
            const rest = step.substring(colonIndex + 1).trim();

            return (
                <li key={index} className="flex gap-4 pl-4 border-l-2 border-emerald-500/50 bg-emerald-500/10 py-3 rounded-r-lg animate-fade-in-right my-1">
                    <span className="text-emerald-500/50 select-none text-xs flex items-center w-6 justify-end">{index + 1}.</span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                        <span className="font-bold text-emerald-400">{mPart}</span>
                        <span className="text-emerald-100/80 text-sm">{rest}</span>
                    </div>
                </li>
            );
        }

        // Default
        return (
            <li key={index} className="flex gap-4 py-2 animate-fade-in hover:bg-white/5 rounded-lg px-2 transition-colors">
                <span className="text-slate-600 select-none w-6 flex-shrink-0 text-right text-xs pt-1">{index + 1}.</span>
                <span className="text-slate-300">{step}</span>
            </li>
        );
    };

    return (
        <div className="glass-panel rounded-2xl p-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">4</span>
                Step-by-Step Algorithm Execution
            </h3>

            <div className="bg-slate-950/50 rounded-xl border border-white/5 max-h-[600px] overflow-y-auto font-mono text-sm shadow-inner custom-scrollbar relative">
                <ul className="p-6 space-y-1">
                    {steps.map((step, index) => renderStep(step, index))}
                </ul>

                {visibleCount < steps.length && (
                    <div className="absolute bottom-6 right-6 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                        Calculating...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explanation;
