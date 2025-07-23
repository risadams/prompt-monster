import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCopy, faCheck } from '@awesome.me/kit-1792c0f8ba/icons/sharp-duotone/thin'

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
    <section className="mt-8" aria-label="Generated Prompt">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-violet-700 mb-2">Generated Prompt</h3>
      </div>
      {prompt ? (
        <>
          <textarea
            className="w-full min-h-[120px] rounded-lg border-2 border-slate-200 bg-slate-50 p-4 text-base text-slate-800 shadow-sm mb-4 resize-y focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
            value={prompt}
            readOnly
            aria-label="Generated prompt text"
            aria-describedby="prompt-help"
          />
          <div id="prompt-help" className="sr-only">
            This is your generated prompt based on the information you provided
          </div>
          <div className="flex gap-2 mb-4">
            <button
              className={`inline-flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-violet-400 ${copied ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
              onClick={handleCopy}
              aria-label={copied ? 'Prompt copied to clipboard' : 'Copy prompt to clipboard'}
              type="button"
            >
              {copied ? (
                <><FontAwesomeIcon icon={faCheck} /> Copied!</>
              ) : (
                <><FontAwesomeIcon icon={faCopy} /> Copy to Clipboard</>
              )}
            </button>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-green-900 text-sm">
              <strong><FontAwesomeIcon icon={faLightbulb} /> Remember:</strong> This is your starting point! Paste this into your AI tool and add any relevant context like source code, files, documents, or specific examples to get the best results.
            </p>
          </div>
        </>
      ) : (
        <div className="text-slate-400 italic">Fill out the form to generate your prompt.</div>
      )}
    </section>
  );
}

export default PromptSection;
