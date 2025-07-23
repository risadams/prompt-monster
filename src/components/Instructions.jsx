import React from 'react';

function Instructions({ showInstructions, setShowInstructions }) {
  return (
    <section className="usage-instructions" aria-label="How to Use Prompt Monster">
      <div className="card instructions-card">
        <div className="card-header">
          <h2 className="card-title instructions-title">🎯 How to Use Prompt Monster</h2>
          <button
            className="btn btn-ghost btn-sm toggle-instructions"
            onClick={() => setShowInstructions(!showInstructions)}
            aria-expanded={showInstructions}
            aria-label={showInstructions ? "Hide instructions" : "Show instructions"}
          >
            {showInstructions ? "Hide" : "Show"} Guide
          </button>
        </div>
        {showInstructions && (
          <div className="instructions-content">
            <div className="instruction-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Choose Your Approach</h3>
                <p>Start with a <strong>template</strong> from the library for common scenarios, or <strong>build from scratch</strong> by filling out the form manually.</p>
              </div>
            </div>
            <div className="instruction-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Fill Required Fields</h3>
                <p>Complete the <strong>Role</strong>, <strong>Task</strong>, and <strong>Goal</strong> fields. Add optional <strong>Context</strong> and <strong>Details</strong> for better results.</p>
              </div>
            </div>
            <div className="instruction-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Copy & Enhance Your Prompt</h3>
                <p>Copy the generated prompt and paste it into your favorite AI tool (ChatGPT, Claude, Gemini, etc.). <strong>Remember:</strong> This is your <em>starting point</em> - add any relevant context like source code, files, documents, or specific requirements to get the best results.</p>
              </div>
            </div>
            <div className="pro-tips">
              <h4>💡 Pro Tips</h4>
              <ul>
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
