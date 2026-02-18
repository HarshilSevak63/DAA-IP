import React, { useState } from 'react';
import InputForm from './components/InputForm';
import MatrixVisualization from './components/MatrixVisualization';
import Explanation from './components/Explanation';
import ExecutionWalkthrough from './components/ExecutionWalkthrough';
import AlgorithmModal from './components/AlgorithmModal';
import { solveMatrixChain } from './services/api';

// import InputForm from './components/InputForm';
// import MatrixVisualization from './components/MatrixVisualization';
// import Explanation from './components/Explanation';
// import ExecutionWalkthrough from './components/ExecutionWalkthrough';
// import AlgorithmModal from './components/AlgorithmModal';
// import { solveMatrixChain } from './services/api';

function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAlgorithm, setShowAlgorithm] = useState(false);

    const handleCompute = async (dimensions) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await solveMatrixChain(dimensions);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
            <AlgorithmModal isOpen={showAlgorithm} onClose={() => setShowAlgorithm(false)} />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 relative animate-fade-in">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 sm:text-6xl sm:tracking-tight lg:text-7xl mb-6">
                        Matrix Chain Multiplication
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-xl text-slate-400 mb-8">
                        Visualize the Dynamic Programming optimization process with interactive steps and explanations.
                    </p>

                    <button
                        onClick={() => setShowAlgorithm(true)}
                        className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        View Algorithm Logic
                    </button>
                </div>

                {/* Main Content */}
                <div className="space-y-10">
                    <InputForm onCompute={handleCompute} isLoading={loading} />

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl backdrop-blur-sm animate-fade-in">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-300">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {result && (
                        <div className="animate-slide-up space-y-10">
                            {/* Output Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass-panel rounded-2xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                    <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-1">
                                        Minimum Cost
                                    </h3>
                                    <div className="mt-2 text-6xl font-extrabold text-white tracking-tight">
                                        {result.minimum_cost}
                                    </div>
                                    <p className="mt-2 text-slate-400 text-sm">
                                        Scalar Multiplications required
                                    </p>
                                </div>

                                <div className="glass-panel rounded-2xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                                    <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-1">
                                        Optimal Parenthesization
                                    </h3>
                                    <div className="mt-2 text-4xl font-mono text-white break-all leading-relaxed">
                                        {result.optimal_parenthesization}
                                    </div>
                                    <p className="mt-2 text-slate-400 text-sm">
                                        Execution Order
                                    </p>
                                </div>
                            </div>

                            {/* Execution Walkthrough */}
                            <ExecutionWalkthrough steps={result.execution_order} />

                            {/* Visualization Section */}
                            <MatrixVisualization
                                dpTable={result.dp_table}
                                splitTable={result.split_table}
                                n={result.n}
                            />

                            {/* Explanation Section */}
                            <Explanation steps={result.steps} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
