import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCircle, faBullseyeArrow } from '@awesome.me/kit-1792c0f8ba/icons/sharp-duotone/thin'

function NumberCircle({ number }) {
  return (
    <span className="relative flex items-center justify-center w-8 h-8">
      <FontAwesomeIcon icon={faCircle} className="absolute text-violet-100 w-8 h-8" />
      <span className="relative z-10 text-violet-700 font-bold text-base">{number}</span>
    </span>
  );
}

function Instructions({ showInstructions, setShowInstructions }) {
  return (
    <section className="mb-8" aria-label="How to Use Prompt Monster">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-violet-700">
            <span role="img" aria-label="target"><FontAwesomeIcon icon={faBullseyeArrow} /></span> How to Use Prompt Monster
          </h2>
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-lg border border-violet-300 bg-white text-violet-700 hover:bg-violet-50 hover:border-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-400"
            onClick={() => setShowInstructions(!showInstructions)}
            aria-expanded={showInstructions}
            aria-label={showInstructions ? 'Hide instructions' : 'Show instructions'}
          >
            {showInstructions ? 'Hide' : 'Show'} Guide
          </button>
        </div>
        {showInstructions && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex gap-4 items-start">
              <NumberCircle number={1} />
              <div>
                <h3 className="font-semibold text-base text-violet-800 mb-1">Choose Your Approach</h3>
                <p className="text-slate-700">Start with a <strong>template</strong> from the library for common scenarios, or <strong>build from scratch</strong> by filling out the form manually.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <NumberCircle number={2} />
              <div>
                <h3 className="font-semibold text-base text-violet-800 mb-1">Fill in the Required Fields</h3>
                <p className="text-slate-700">Complete the <strong>Role</strong>, <strong>Task</strong>, and <strong>Goal</strong> fields. Add optional <strong>Context</strong> and <strong>Details</strong> for better results.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <NumberCircle number={3} />
              <div>
                <h3 className="font-semibold text-base text-violet-800 mb-1">Copy & Enhance Your Prompt</h3>
                <p className="text-slate-700">Copy the generated prompt and paste it into your favorite AI tool (ChatGPT, Claude, Gemini, etc.). <strong>Remember:</strong> This is your <em>starting point</em> - add any relevant context like source code, files, documents, or specific requirements to get the best results.</p>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mt-2">
              <h4 className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faLightbulb} /> Pro Tips
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li><strong>Add Context:</strong> Include relevant files, code snippets, or documents with your prompt</li>
                <li><strong>Be Specific:</strong> The more specific your task and goal, the better the AI response</li>
                <li><strong>Iterate:</strong> Use the generated prompt as a foundation and refine based on AI feedback</li>
                <li><strong>Template Power:</strong> Your modifications are preserved when switching templates</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Instructions;
