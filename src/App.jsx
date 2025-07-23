import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faHeadSideCircuit, faRefresh, faTimes } from '@awesome.me/kit-1792c0f8ba/icons/sharp-duotone/thin'
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
  const [showTemplatesDrawer, setShowTemplatesDrawer] = useState(false);
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

    if (window.innerWidth < 1024) setShowTemplatesDrawer(false);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-indigo-200 to-white font-sans text-slate-900">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 z-50 bg-white text-indigo-700 px-4 py-2 rounded shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 py-6" role="main">
        {/* Show Templates button for medium and below */}
        <button
          className="lg:hidden fixed top-4 right-4 z-40 bg-violet-700 text-white px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
          onClick={() => setShowTemplatesDrawer(true)}
          aria-label="Show Templates"
        >
          <FontAwesomeIcon icon={faBookOpen} /> Show Templates
        </button>
        <Instructions showInstructions={showInstructions && window.innerWidth >= 1024} setShowInstructions={setShowInstructions} />
        {/* Responsive layout: golden ratio columns on large, single column on medium and below */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-[61.8%_38.2%] gap-8">
          {/* Prompt Builder always first, full width of column */}
          <section className="w-full order-1" aria-label="Prompt Builder">
            <div className="liquid-glass p-8 transition hover:shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-violet-700">
                  <span role='img' aria-label='monster'>
                    <FontAwesomeIcon icon={faHeadSideCircuit} />
                  </span>
                  Prompt Builder
                </h2>
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-lg border border-violet-300 bg-white text-violet-700 hover:bg-violet-50 hover:border-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-400"
                    onClick={resetForm}
                    aria-label="Reset entire form to initial state"
                    title="Clear all fields and reset template"
                  >
                    <FontAwesomeIcon icon={faRefresh} />
                    Reset Form
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
          {/* Template Library: only visible as column on large screens */}
          <aside className="hidden lg:block w-full order-2">
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
              fullWidth={true}
            />
          </aside>
        </div>
        {/* Slideout Drawer for Template Library on medium and below */}
        {showTemplatesDrawer && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="flex-1 liquid-glass backdrop-blur-lg" onClick={() => setShowTemplatesDrawer(false)} />
            {/* Drawer: full width on medium and below */}
            <aside className="relative w-full h-full bg-white shadow-2xl animate-slideInRight flex flex-col">
              <button
                className="absolute top-3 right-3 z-10 text-white bg-violet-700 hover:bg-violet-800 w-10 h-10 flex items-center justify-center rounded-full shadow-lg text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-400"
                onClick={() => setShowTemplatesDrawer(false)}
                aria-label="Close Templates"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="pt-12 pb-4 px-2 overflow-y-auto flex-1">
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
                  fullWidth={true}
                />
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
