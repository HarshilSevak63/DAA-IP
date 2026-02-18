import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const AlgorithmModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div
                className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Algorithm Explanation
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-10">

                    {/* Concept */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-3">
                            <span className="bg-blue-500/20 text-blue-300 w-8 h-8 flex items-center justify-center rounded-lg text-sm border border-blue-500/30">1</span>
                            The Problem
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            Given a sequence of matrices <InlineMath math="A_1, A_2, \dots, A_n" />, where matrix <InlineMath math="A_i" /> has dimensions <InlineMath math="p_{i-1} \times p_i" />,
                            find the most efficient way to multiply them together as <InlineMath math="A_1 A_2 \dots A_n" />.
                            The goal is to minimize the total number of scalar multiplications.
                        </p>
                    </section>

                    {/* Recurrence */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-8 h-8 flex items-center justify-center rounded-lg text-sm border border-purple-500/30">2</span>
                            Recurrence Relation
                        </h3>
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 text-slate-300 overflow-x-auto">
                            <p className="mb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Base Case</p>
                            <div className="text-slate-200">
                                <BlockMath math="m[i, i] = 0" />
                            </div>

                            <p className="mt-8 mb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Recursive Step</p>
                            <div className="text-slate-200">
                                <BlockMath math="m[i, j] = \min_{i \le k < j} \{ m[i, k] + m[k+1, j] + p_{i-1}p_kp_j \}" />
                            </div>
                        </div>
                    </section>

                    {/* Algorithm */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-3">
                            <span className="bg-green-500/20 text-green-300 w-8 h-8 flex items-center justify-center rounded-lg text-sm border border-green-500/30">3</span>
                            Dynamic Programming Approach
                        </h3>
                        <div className="bg-slate-950/80 text-emerald-300 p-6 rounded-xl font-mono text-sm shadow-inner overflow-x-auto border border-white/5">
                            <pre className="whitespace-pre">
                                {`MATRIX-CHAIN-ORDER(p)
  n = p.length - 1
  let m[1..n, 1..n] and s[1..n-1, 2..n] be new tables
  
  for i = 1 to n
      m[i, i] = 0
      
  for l = 2 to n            // l is the chain length
      for i = 1 to n - l + 1
          j = i + l - 1
          m[i, j] = ∞
          
          for k = i to j - 1
              q = m[i, k] + m[k+1, j] + p[i-1]*p[k]*p[j]
              if q < m[i, j]
                  m[i, j] = q
                  s[i, j] = k
                  
  return m and s`}
                            </pre>
                        </div>
                    </section>

                    {/* Complexity */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-orange-500/10 p-5 rounded-xl border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                            <h4 className="font-bold text-orange-300 mb-2 text-xs uppercase tracking-wider">Time Complexity</h4>
                            <p className="text-3xl font-bold text-orange-400 font-mono"><InlineMath math="O(n^3)" /></p>
                        </div>
                        <div className="bg-teal-500/10 p-5 rounded-xl border border-teal-500/20 hover:bg-teal-500/20 transition-colors">
                            <h4 className="font-bold text-teal-300 mb-2 text-xs uppercase tracking-wider">Space Complexity</h4>
                            <p className="text-3xl font-bold text-teal-400 font-mono"><InlineMath math="O(n^2)" /></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmModal;
