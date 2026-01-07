import React from 'react';
import type { Step } from '../data/steps';

interface SidebarProps {
    steps: Step[];
    currentStep: number;
    onStepSelect: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ steps, currentStep, onStepSelect }) => {
    return (
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 h-full sticky top-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Tutorial Steps
                </h2>
                <nav>
                    <ul className="space-y-2">
                        {steps.map((step, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => onStepSelect(index)}
                                    className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 group ${
                                        currentStep === index
                                            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 font-semibold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    aria-current={currentStep === index ? 'step' : undefined}
                                >
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold transition-colors duration-200 ${
                                         currentStep === index
                                         ? 'bg-primary-500 text-white'
                                         : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                                    }`}>
                                        {index + 1}
                                    </span>
                                    <span className="flex-1">{step.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};
