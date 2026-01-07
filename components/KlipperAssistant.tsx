import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ArrowLeft, ArrowRight, LightBulb, RobotIcon } from './Icons';
import { ChatBox } from './ChatBox';
import type { Step } from '../data/steps';

interface KlipperAssistantProps {
    steps: Step[];
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

export const KlipperAssistant: React.FC<KlipperAssistantProps> = ({ steps, currentStep, setCurrentStep }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [apiKeyExists, setApiKeyExists] = useState(false);

     const ai = useMemo(() => {
        if (process.env.API_KEY) {
            setApiKeyExists(true);
            return new GoogleGenAI({ apiKey: process.env.API_KEY });
        }
        setApiKeyExists(false);
        return null;
    }, []);

    useEffect(() => {
        if (!ai) return;

        const currentStepData = steps[currentStep];
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are a 3D printing expert focused exclusively on Klipper and Mainsail. Your sole purpose is to answer questions related to 3D printing. The user is currently on the step: "${currentStepData.title}". Your answers must be concise, friendly, and directly related to this topic or other 3D printing concepts. If the user asks a question that is not about 3D printing, Klipper, or Mainsail, you must politely decline to answer and state that you can only help with 3D printing questions. Do not answer off-topic questions under any circumstances.`,
            },
        });
        setChat(newChat);

    }, [ai, currentStep, steps]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const { title, description, tip } = steps[currentStep];

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10 transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4 text-center">
                Step {currentStep + 1}: {title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-center">
                {description}
            </p>

            <div className="bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-400 p-4 rounded-r-lg mb-8">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <LightBulb className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-bold text-primary-800 dark:text-primary-200">Pro Tip</p>
                        <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">{tip}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
                    <RobotIcon className="w-6 h-6" />
                    <span>Ask a Question</span>
                </h3>
                {apiKeyExists && chat ? (
                    <ChatBox key={currentStep} chat={chat} />
                ) : (
                    <div className="text-center p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-300">Chat is unavailable.</p>
                         <p className="text-sm text-gray-500 dark:text-gray-400">Please ensure your API key is configured to enable this feature.</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Previous step"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Next step"
                >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
