import React, { useState } from 'react';
import { InlineMath } from 'react-katex';

const ExecutionWalkthrough = ({ steps }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="glass-panel rounded-2xl p-8 mb-8 animate-fade-in relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/20 text-pink-300 text-sm">2</span>
                Detailed Analysis of Optimal Parenthesization
            </h3>
            <p className="text-slate-400 mb-8">
                Explanation of how the final cost is derived from the optimal order:
            </p>
            <div className="relative border-l-2 border-slate-700 ml-4 pl-10 space-y-8">
                {steps.map((step, index) => (
                    <div key={step.step} className="relative bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 transition-all hover:bg-slate-800/60 hover:border-pink-500/30 group">
                        {/* Timeline dot */}
                        <div className="absolute -left-[49px] top-8 w-5 h-5 rounded-full border-4 border-slate-900 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform"></div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <h4 className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors">
                                Step {step.step}: <span className="text-pink-400">{step.description}</span>
                            </h4>
                            <span className="mt-2 md:mt-0 bg-slate-900/50 text-indigo-300 text-xs px-3 py-1.5 rounded-lg border border-indigo-500/20 shadow-sm font-mono">
                                Step Cost: {step.cost}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500 font-medium uppercase text-xs tracking-wider w-24">Operation</span>
                                    <code className="text-slate-300 bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
                                        <InlineMath math={step.matrix_dims} />
                                    </code>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500 font-medium uppercase text-xs tracking-wider w-24">Calculation</span>
                                    <code className="text-blue-400 font-mono text-xs">{step.calculation}</code>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
                                <span className="text-slate-500 font-medium uppercase text-xs tracking-wider w-16">Result</span>
                                <div>
                                    <span className="font-bold text-slate-200 block">{step.result_name}</span>
                                    <span className="text-xs text-slate-500">Dimensions: {step.result_dims}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 ml-4 p-5 bg-gradient-to-r from-slate-800 to-indigo-900/20 text-slate-200 rounded-xl text-base border border-indigo-500/20 flex items-center justify-between shadow-lg">
                <span className="font-medium text-slate-400">Total Scalar Multiplications:</span>
                <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{steps.reduce((acc, s) => acc + s.cost, 0)}</span>
            </div>
        </div>
    );
};
export default ExecutionWalkthrough;
