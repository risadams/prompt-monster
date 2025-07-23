import React, { useState, useCallback, useEffect } from 'react';
import roles from './data/Role.json';
import Header from './components/Header';
import Instructions from './components/Instructions';
import TemplateLibrary from './components/TemplateLibrary';
import PromptBuilder from './components/PromptBuilder';
import PromptSection from './components/PromptSection';
import Footer from './components/Footer';

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
  const [showInstructions, setShowInstructions] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  // Template search/filter state
  const [templateSearch, setTemplateSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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
      <Header />
      <main id="main-content" className="main-content" role="main">
        <Instructions showInstructions={showInstructions} setShowInstructions={setShowInstructions} />
        <div className="content-grid">
          <TemplateLibrary
            templates={templates}
            currentTemplate={currentTemplate}
            clearTemplate={clearTemplate}
            applyTemplate={applyTemplate}
            templateSearch={templateSearch}
            setTemplateSearch={setTemplateSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            uniqueRoles={uniqueRoles}
            uniqueCategories={uniqueCategories}
            filteredTemplates={filteredTemplates}
          />
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
              <PromptBuilder
                roles={roles}
                formData={formData}
                handleFieldChange={handleFieldChange}
                currentTemplate={currentTemplate}
                userModifications={userModifications}
              />
              <PromptSection prompt={prompt} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
