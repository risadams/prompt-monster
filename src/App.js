import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './utils.css';
import roles from './data/Role.json';
import templates from './data/Templates.json';

function App() {
  // State management
  const [formData, setFormData] = useState({
    idea: '',
    selectedRole: '',
    customRole: '',
    task: '',
    context: '',
    requirements: ''
  });
  const [templateSearch, setTemplateSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    const { selectedRole, customRole, task, idea } = formData;
    const hasRole = selectedRole && (selectedRole !== 'other' || customRole.trim());
    const hasTask = task.trim();
    const hasIdea = idea.trim();
    setIsFormValid(hasRole && hasTask && hasIdea);
  }, [formData]);

  // Handle form field changes
  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Clear custom role if switching away from 'other'
      ...(field === 'selectedRole' && value !== 'other' ? { customRole: '' } : {})
    }));
  }, []);

  // Generate prompt
  const generatePrompt = useCallback(() => {
    const { selectedRole, customRole, task, idea, context, requirements } = formData;
    
    if (!isFormValid) return '';

    const roleToUse = selectedRole === 'other' ? customRole : selectedRole;
    const selectedRoleObj = roles.find(r => r.name === selectedRole);
    
    let prompt = `Acting as a "${roleToUse}" I want to "${task}" so that I can "${idea}".`;
    
    // Add context section
    let contextSection = '';
    if (selectedRoleObj?.description) {
      contextSection = `Role Description: ${selectedRoleObj.description}`;
      if (context.trim()) {
        contextSection += `\n${context}`;
      }
    } else if (context.trim()) {
      contextSection = context;
    }
    
    if (contextSection) {
      prompt += `\n\nHere is the context: ${contextSection}`;
    }
    
    if (requirements.trim()) {
      prompt += `\n\nDetails: ${requirements}`;
    }
    
    return prompt;
  }, [formData, isFormValid]);

  const prompt = generatePrompt();

  // Copy to clipboard
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

  // Filter templates
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    template.role.toLowerCase().includes(templateSearch.toLowerCase()) ||
    template.task.toLowerCase().includes(templateSearch.toLowerCase())
  );

  // Apply template
  const applyTemplate = useCallback((template) => {
    setFormData({
      selectedRole: template.role,
      customRole: '',
      task: template.task,
      idea: template.goal,
      context: template.context || '',
      requirements: template.details || ''
    });
    
    // Announce to screen readers
    const announcement = `Applied template: ${template.name}`;
    const announcer = document.createElement('div');
    announcer.textContent = announcement;
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }, []);

  return (
    <div className="app-container">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="app-header" role="banner">
        <div className="header-content">
          <img
            src={`${process.env.PUBLIC_URL}/logo.svg`}
            alt="Prompt Monster - A friendly purple monster mascot"
            className="monster-logo"
          />
          <h1 className="app-title">Prompt Monster</h1>
          <p className="app-subtitle">
            Unleash your creativity with monstrously good prompts! 🎭
          </p>
        </div>
      </header>

      <main id="main-content" className="main-content" role="main">
        <div className="content-grid">
          {/* Template Library Sidebar */}
          <aside className="template-library" aria-label="Template Library">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Template Library</h2>
              </div>
              
              <div className="form-group">
                <label htmlFor="template-search" className="sr-only">
                  Search templates
                </label>
                <input
                  id="template-search"
                  type="text"
                  className="search-input"
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="🔍 Search templates..."
                  aria-describedby="search-help"
                />
                <div id="search-help" className="sr-only">
                  Search through available prompt templates by name, role, or task
                </div>
              </div>

              <div className="templates-container" role="list" aria-label="Available templates">
                {filteredTemplates.length === 0 ? (
                  <div className="no-templates" role="status">
                    No templates found. Try adjusting your search terms.
                  </div>
                ) : (
                  filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="template-item"
                      role="listitem"
                    >
                      <div className="template-name">{template.name}</div>
                      <div className="template-role">👤 {template.role}</div>
                      <div className="template-task">
                        <strong>Task:</strong> {template.task}
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => applyTemplate(template)}
                        aria-label={`Apply template: ${template.name}`}
                      >
                        Use Template
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* Main Form */}
          <section className="prompt-builder" aria-label="Prompt Builder">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Prompt Builder</h2>
              </div>

              <form onSubmit={(e) => e.preventDefault()} noValidate>
                {/* Role Selection */}
                <div className="form-group">
                  <label htmlFor="role-select" className="form-label">
                    Role <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <select
                    id="role-select"
                    className="form-select"
                    value={formData.selectedRole}
                    onChange={(e) => handleFieldChange('selectedRole', e.target.value)}
                    required
                    aria-describedby="role-help"
                  >
                    <option value="">Select a role...</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                    <option value="other">Other (specify below)</option>
                  </select>
                  <div id="role-help" className="sr-only">
                    Choose the role you want the AI to assume, or select "Other" to specify a custom role
                  </div>
                </div>

                {/* Custom Role Input */}
                {formData.selectedRole === 'other' && (
                  <div className="form-group">
                    <label htmlFor="custom-role" className="form-label">
                      Custom Role <span className="required-indicator" aria-label="required">*</span>
                    </label>
                    <input
                      id="custom-role"
                      type="text"
                      className="form-input"
                      value={formData.customRole}
                      onChange={(e) => handleFieldChange('customRole', e.target.value)}
                      placeholder="Enter your custom role..."
                      required
                      aria-describedby="custom-role-help"
                    />
                    <div id="custom-role-help" className="sr-only">
                      Specify the custom role you want the AI to assume
                    </div>
                  </div>
                )}

                {/* Task Input */}
                <div className="form-group">
                  <label htmlFor="task-input" className="form-label">
                    Task <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <input
                    id="task-input"
                    type="text"
                    className="form-input"
                    value={formData.task}
                    onChange={(e) => handleFieldChange('task', e.target.value)}
                    placeholder="What do you want the AI to do?"
                    required
                    aria-describedby="task-help"
                  />
                  <div id="task-help" className="sr-only">
                    Describe the specific task you want the AI to perform
                  </div>
                </div>

                {/* Goal Input */}
                <div className="form-group">
                  <label htmlFor="idea-input" className="form-label">
                    Goal <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <input
                    id="idea-input"
                    type="text"
                    className="form-input"
                    value={formData.idea}
                    onChange={(e) => handleFieldChange('idea', e.target.value)}
                    placeholder="Describe your goal or desired outcome..."
                    required
                    aria-describedby="idea-help"
                  />
                  <div id="idea-help" className="sr-only">
                    Explain what you want to achieve with this task
                  </div>
                </div>

                {/* Context Input */}
                <div className="form-group">
                  <label htmlFor="context-input" className="form-label">
                    Context
                  </label>
                  <input
                    id="context-input"
                    type="text"
                    className="form-input"
                    value={formData.context}
                    onChange={(e) => handleFieldChange('context', e.target.value)}
                    placeholder="Any background context for the task..."
                    aria-describedby="context-help"
                  />
                  <div id="context-help" className="sr-only">
                    Provide any additional background information that might be helpful
                  </div>
                </div>

                {/* Requirements Input */}
                <div className="form-group">
                  <label htmlFor="requirements-input" className="form-label">
                    Details
                  </label>
                  <textarea
                    id="requirements-input"
                    className="form-textarea"
                    value={formData.requirements}
                    onChange={(e) => handleFieldChange('requirements', e.target.value)}
                    placeholder="Specify requirements, constraints, output formats, or any other details..."
                    aria-describedby="requirements-help"
                    rows="4"
                  />
                  <div id="requirements-help" className="sr-only">
                    Add specific requirements, constraints, or formatting instructions
                  </div>
                </div>
              </form>

              {/* Generated Prompt Section */}
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
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer" role="contentinfo">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://risadams.com" target="_blank" rel="noopener noreferrer">
            Ris Adams
          </a>
          . All rights reserved. Made with 💜 for the AI community.
        </p>
      </footer>
    </div>
  );
}

export default App;
