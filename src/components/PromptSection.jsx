import React, { useState, useCallback } from 'react';

function PromptSection({ prompt }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [prompt]);

  return (
    <section className="prompt-section" aria-label="Generated Prompt">
      <div className="prompt-header">
        <h3 className="prompt-title">Generated Prompt</h3>
      </div>
      {prompt ? (
        <>
          <textarea
            className="prompt-output"
            value={prompt}
            readOnly
            aria-label="Generated prompt text"
            aria-describedby="prompt-help"
          />
          <div id="prompt-help" className="sr-only">
            This is your generated prompt based on the information you provided
          </div>
          <div className="prompt-actions">
            <button
              className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
              onClick={handleCopy}
              aria-label={copied ? 'Prompt copied to clipboard' : 'Copy prompt to clipboard'}
            >
              {copied ? (
                <>✅ Copied!</>
              ) : (
                <>📋 Copy to Clipboard</>
              )}
            </button>
          </div>
          <div className="prompt-reminder">
            <p className="reminder-text">
              <strong>💡 Remember:</strong> This is your starting point! Paste this into your AI tool and add any relevant context like source code, files, documents, or specific examples to get the best results.
            </p>
          </div>
        </>
      ) : (
        <div className="prompt-placeholder" role="status">
          <p>
            Ready to create a monstrously effective prompt? 🎪<br />
            Fill in the <strong>Role</strong>, <strong>Task</strong>, and <strong>Goal</strong> fields above to generate your AI prompt.
          </p>
        </div>
      )}
    </section>
  );
}

export default PromptSection;
