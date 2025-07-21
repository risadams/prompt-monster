import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './utils.css';
import roles from './data/Role.json';
// Dynamically import all templates from /data/templates/*.json
const templateContext = require.context('./data/templates', false, /\.json$/);
const templates = templateContext.keys()
  .map((key) => templateContext(key))
  .flat()
  ;

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
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [userModifications, setUserModifications] = useState({
    task: false,
    idea: false,
    context: false,
    requirements: false
  });
  const [templateSearch, setTemplateSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
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

    // Track user modifications for template preservation
    if (currentTemplate && ['task', 'idea', 'context', 'requirements'].includes(field)) {
      const templateValue = currentTemplate[field === 'idea' ? 'goal' :
        field === 'requirements' ? 'details' : field];
      const isModified = value !== (templateValue || '');

      setUserModifications(prev => ({
        ...prev,
        [field]: isModified
      }));
    }
  }, [currentTemplate]);

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

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(templates.flatMap(template => template.categories || []))].sort();

  // Get unique roles for filter dropdown
  const uniqueRoles = [...new Set(templates.flatMap(template => template.roles || []))].sort();

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      (template.roles && template.roles.some(role => role.toLowerCase().includes(templateSearch.toLowerCase()))) ||
      template.task.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesRole = !roleFilter || (template.roles && template.roles.includes(roleFilter));
    const matchesCategory = !categoryFilter || (template.categories && template.categories.includes(categoryFilter));
    return matchesSearch && matchesRole && matchesCategory;
  });

  // Apply template with user modification preservation
  const applyTemplate = useCallback((template) => {
    // If switching templates, preserve user modifications
    const newFormData = {
      selectedRole: template.roles ? template.roles[0] : '',
      customRole: '',
      // Only update if user hasn't modified the field
      task: userModifications.task ? formData.task : template.task,
      idea: userModifications.idea ? formData.idea : template.goal,
      context: userModifications.context ? formData.context : (template.context || ''),
      requirements: userModifications.requirements ? formData.requirements : (template.details || '')
    };

    setFormData(newFormData);
    setCurrentTemplate(template);

    // Reset modification tracking for fields that were updated from template
    setUserModifications(prev => ({
      task: prev.task && newFormData.task !== template.task,
      idea: prev.idea && newFormData.idea !== template.goal,
      context: prev.context && newFormData.context !== (template.context || ''),
      requirements: prev.requirements && newFormData.requirements !== (template.details || '')
    }));

    // Announce to screen readers
    const announcement = `Applied template: ${template.name}. User modifications preserved.`;
    const announcer = document.createElement('div');
    announcer.textContent = announcement;
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }, [formData, userModifications]);

  // Clear current template
  const clearTemplate = useCallback(() => {
    setCurrentTemplate(null);
    setUserModifications({
      task: false,
      idea: false,
      context: false,
      requirements: false
    });

    // Announce to screen readers
    const announcement = `Template cleared. All fields are now user-defined.`;
    const announcer = document.createElement('div');
    announcer.textContent = announcement;
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData({
      idea: '',
      selectedRole: '',
      customRole: '',
      task: '',
      context: '',
      requirements: ''
    });
    setCurrentTemplate(null);
    setUserModifications({
      task: false,
      idea: false,
      context: false,
      requirements: false
    });
    setTemplateSearch('');
    setRoleFilter('');
    setCategoryFilter('');

    // Announce to screen readers
    const announcement = `Form reset to initial state.`;
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
        {/* Usage Instructions */}
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

        <div className="content-grid">
          {/* Template Library Sidebar */}
          <aside className="template-library" aria-label="Template Library">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Template Library</h2>
                {currentTemplate && (
                  <div className="current-template-indicator">
                    <div className="current-template-info">
                      <span className="current-template-label">Active Template:</span>
                      <span className="current-template-name">{currentTemplate.name}</span>
                    </div>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={clearTemplate}
                      aria-label="Clear current template"
                      title="Clear current template and reset modification tracking"
                    >
                      Clear Template
                    </button>
                  </div>
                )}
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

              {/* Role Filter */}
              <div className="form-group">
                <label htmlFor="role-filter" className="filter-label">
                  Filter by Role
                </label>
                <select
                  id="role-filter"
                  className="filter-select"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  aria-describedby="role-filter-help"
                >
                  <option value="">All Roles ({templates.length})</option>
                  {uniqueRoles.map((role) => {
                    const count = templates.filter(t => t.roles && t.roles.includes(role)).length;
                    return (
                      <option key={role} value={role}>
                        {role} ({count})
                      </option>
                    );
                  })}
                </select>
                <div id="role-filter-help" className="sr-only">
                  Filter templates by specific role
                </div>
              </div>

              {/* Category Filter */}
              <div className="form-group">
                <label htmlFor="category-filter" className="filter-label">
                  Filter by Category
                </label>
                <select
                  id="category-filter"
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-describedby="category-filter-help"
                >
                  <option value="">All Categories ({templates.length})</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div id="category-filter-help" className="sr-only">
                  Filter templates by specific category
                </div>
              </div>

              {/* Filter Actions */}
              <div className="filter-actions">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setTemplateSearch('');
                    setRoleFilter('');
                    setCategoryFilter('');
                  }}
                  disabled={!templateSearch && !roleFilter && !categoryFilter}
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </button>
                <span className="filter-results">
                  {filteredTemplates.length} of {templates.length} templates
                </span>
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
                      className={`template-item ${currentTemplate?.id === template.id ? 'template-active' : ''}`}
                      role="listitem"
                    >
                      <div className="template-name">
                        {template.name}
                        {currentTemplate?.id === template.id && (
                          <span className="active-indicator" aria-label="Currently active template">
                            ✨ Active
                          </span>
                        )}
                      </div>
                      <div className="template-role">👤 {template.roles ? template.roles.join(', ') : ''}</div>
                      <div className="template-task">
                        <strong>Task:</strong> {template.task}
                      </div>
                      <button
                        className={`btn ${currentTemplate?.id === template.id ? 'btn-secondary' : 'btn-secondary'} btn-sm`}
                        onClick={() => applyTemplate(template)}
                        aria-label={`${currentTemplate?.id === template.id ? 'Reapply' : 'Apply'} template: ${template.name}`}
                      >
                        {currentTemplate?.id === template.id ? 'Reapply Template' : 'Use Template'}
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
                <div className="form-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={resetForm}
                    aria-label="Reset entire form to initial state"
                    title="Clear all fields and reset template"
                  >
                    🔄 Reset Form
                  </button>
                </div>
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
                    {currentTemplate && userModifications.task && (
                      <span className="modification-indicator" title="You've modified this field from the template">
                        ✏️ Modified
                      </span>
                    )}
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
                    {currentTemplate && userModifications.idea && (
                      <span className="modification-indicator" title="You've modified this field from the template">
                        ✏️ Modified
                      </span>
                    )}
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
                    {currentTemplate && userModifications.context && (
                      <span className="modification-indicator" title="You've modified this field from the template">
                        ✏️ Modified
                      </span>
                    )}
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
                    {currentTemplate && userModifications.requirements && (
                      <span className="modification-indicator" title="You've modified this field from the template">
                        ✏️ Modified
                      </span>
                    )}
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
