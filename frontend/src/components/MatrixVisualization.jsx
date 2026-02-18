import React from 'react';

const MatrixVisualization = ({ dpTable, splitTable, n }) => {
    if (!dpTable || !splitTable) return null;

    // dpTable is (n+1)x(n+1) but 0th index is unused/padding in our backend logic usually
    // Backend returns m and s size (n+1)x(n+1).
    // We want to display indices 1 to n.

    const indices = Array.from({ length: n }, (_, i) => i + 1);

    return (
        <div className="glass-panel p-8 rounded-2xl animate-fade-in relative overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">3</span>
                DP Table Visualization
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Cost Table m */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 overflow-x-auto">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        DP Cost Table <code className="text-sm bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">m[i][j]</code>
                    </h3>
                    <table className="matrix-table">
                        <thead>
                            <tr>
                                <th className="bg-slate-800/80">i \ j</th>
                                {indices.map(j => (
                                    <th key={j}>{j}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {indices.map(i => (
                                <tr key={i}>
                                    <th>{i}</th>
                                    {indices.map(j => {
                                        const val = dpTable[i][j];
                                        // Only show upper triangular
                                        if (j < i) return <td key={j} className="matrix-cell-empty"></td>;

                                        // val might be 0, so check strictly for undefined/null if needed, but 0 is valid.
                                        // backend initializes with 0 or inf.
                                        // diagonal is 0.
                                        const isInf = val === null || val > 999999999; // Simple check for infinity
                                        return (
                                            <td key={j} className={`matrix-cell-filled transition-all duration-300 ${i === j ? 'bg-slate-800/60 text-slate-500' : 'hover:scale-105'}`}>
                                                {isInf ? '∞' : val}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-xs text-slate-400">
                        Lower diagonal is not used. Main diagonal is 0.
                    </p>
                </div>

                {/* Split Table s */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 overflow-x-auto">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        Split Table <code className="text-sm bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">s[i][j]</code>
                    </h3>
                    <table className="matrix-table">
                        <thead>
                            <tr>
                                <th className="bg-slate-800/80">i \ j</th>
                                {indices.map(j => (
                                    <th key={j}>{j}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {indices.map(i => (
                                <tr key={i}>
                                    <th>{i}</th>
                                    {indices.map(j => {
                                        const val = splitTable[i][j];
                                        if (j <= i) return <td key={j} className="matrix-cell-empty"></td>; // s is only defined for j > i

                                        return (
                                            <td key={j} className="matrix-cell-filled font-bold text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300">
                                                {val}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-xs text-slate-400">
                        Shows optimal split index k for each subchain Ai...Aj.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MatrixVisualization;
