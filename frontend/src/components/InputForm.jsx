import React, { useState } from 'react';
import { InlineMath } from 'react-katex';

const InputForm = ({ onCompute, isLoading }) => {
    const [inputValue, setInputValue] = useState('10, 30, 5, 60');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Parse input
        try {
            const dims = inputValue.split(',')
                .map(s => s.trim())
                .filter(s => s !== '')
                .map(Number);

            if (dims.some(isNaN)) {
                throw new Error("All dimensions must be valid numbers.");
            }
            if (dims.length < 2) {
                throw new Error("At least 2 dimensions are required.");
            }

            onCompute(dims);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="glass-panel rounded-2xl p-8 mb-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">1</span>
                Input Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-slate-300 mb-2">
                        Matrix Dimensions Array (P)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="dimensions"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="glass-input block w-full rounded-xl py-3 px-4 sm:text-lg"
                                placeholder="e.g. 10, 30, 5, 60"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-slate-500 text-xs">Comma separated</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 whitespace-nowrap ${isLoading
                                ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Computing...
                                </span>
                            ) : 'Compute Optimal Order'}
                        </button>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">
                        Enter dimensions separated by commas. Example: <code className="bg-slate-800 text-indigo-300 px-2 py-1 rounded mx-1 border border-white/10">10, 30, 5, 60</code> for 3 matrices (<InlineMath math="A_1: 10 \times 30" />, <InlineMath math="A_2: 30 \times 5" />, <InlineMath math="A_3: 5 \times 60" />).
                    </p>
                </div>
                {error && (
                    <div className="p-4 bg-red-500/10 text-red-300 rounded-xl text-sm border border-red-500/20 flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default InputForm;
