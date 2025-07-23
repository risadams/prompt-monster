import { faSparkles, faUser } from '@awesome.me/kit-1792c0f8ba/icons/sharp-duotone/thin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useMemo } from 'react';

function TemplateLibrary({
  templates,
  currentTemplate,
  clearTemplate,
  applyTemplate,
  fullWidth = false
}) {
  const [templateSearch, setTemplateSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const uniqueCategories = useMemo(() => [...new Set(templates.flatMap(template => template.categories || []))].sort(), [templates]);
  const uniqueRoles = useMemo(() => [...new Set(templates.flatMap(template => template.roles || []))].sort(), [templates]);

  const filteredTemplates = useMemo(() => templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      (template.roles && template.roles.some(role => role.toLowerCase().includes(templateSearch.toLowerCase()))) ||
      template.task.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesRole = !roleFilter || (template.roles && template.roles.includes(roleFilter));
    const matchesCategory = !categoryFilter || (template.categories && template.categories.includes(categoryFilter));
    return matchesSearch && matchesRole && matchesCategory;
  }), [templates, templateSearch, roleFilter, categoryFilter]);

  return (
    <aside className={`${fullWidth ? 'sticky top-0 h-full w-full max-w-full' : 'sticky top-4 h-fit w-full max-w-xs'}`} aria-label="Template Library">
      <div className="liquid-glass p-6 mb-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-violet-700">Template Library</h2>
          {currentTemplate && (
            <div className="flex flex-col gap-1 bg-violet-50 border border-violet-200 rounded-lg px-3 py-2">
              <span className="text-xs text-violet-700 font-semibold uppercase tracking-wide">Active Template:</span>
              <span className="text-sm font-bold text-violet-900">{currentTemplate.name}</span>
              <button
                className="inline-flex items-center gap-2 px-2 py-1 text-xs font-semibold rounded border border-violet-300 bg-white text-violet-700 hover:bg-violet-50 hover:border-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-400 mt-1"
                onClick={clearTemplate}
                aria-label="Clear current template"
                title="Clear current template and reset modification tracking"
              >
                Clear Template
              </button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="template-search" className="sr-only">
            Search templates
          </label>
          <input
            id="template-search"
            type="text"
            className="block w-full rounded-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 bg-slate-50 px-3 py-2 text-base text-slate-800 shadow-sm transition mb-2"
            value={templateSearch}
            onChange={(e) => setTemplateSearch(e.target.value)}
            placeholder="🔍 Search templates..."
            aria-describedby="search-help"
          />
          <div id="search-help" className="sr-only">
            Search through available prompt templates by name, role, or task
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="role-filter" className="block text-sm font-medium text-slate-700 mb-1">Filter by Role</label>
          <select
            id="role-filter"
            className="block w-full rounded-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 bg-slate-50 px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
        <div className="mb-4">
          <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 mb-1">Filter by Category</label>
          <select
            id="category-filter"
            className="block w-full rounded-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 bg-slate-50 px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
        <div className="flex items-center justify-between gap-2 mb-4 border-t border-b border-slate-100 py-2">
          <button
            className="inline-flex items-center gap-2 px-2 py-1 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-violet-400 transition focus:outline-none focus:ring-2 focus:ring-violet-400"
            onClick={() => {
              setTemplateSearch('');
              setRoleFilter('');
              setCategoryFilter('');
            }}
            disabled={!templateSearch && !roleFilter && !categoryFilter}
            aria-label="Clear all filters"
            type="button"
          >
            Clear Filters
          </button>
          <span className="text-xs text-slate-500 font-medium">
            {filteredTemplates.length} of {templates.length} templates
          </span>
        </div>
        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1" role="list" aria-label="Available templates">
          {filteredTemplates.length === 0 ? (
            <div className="text-slate-400 italic text-center py-8" role="status">
              No templates found. Try adjusting your search terms.
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm transition cursor-pointer ${currentTemplate?.id === template.id ? 'ring-2 ring-violet-400 border-violet-400 bg-violet-50/60' : 'hover:border-violet-200 hover:shadow-md'}`}
                role="listitem"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-violet-800">{template.name}</span>
                  {currentTemplate?.id === template.id && (
                    <span className="ml-2 text-xs text-violet-600 bg-violet-100 rounded px-2 py-0.5 font-medium" aria-label="Currently active template">
                      <FontAwesomeIcon icon={faSparkles} /> Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-indigo-600 mb-1">
                  <FontAwesomeIcon icon={faUser} /> {template.roles ? template.roles.join(', ') : ''}</div>
                <div className="text-sm text-slate-700 mb-2">
                  <strong>Task:</strong> {template.task}
                </div>
                <button
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-violet-300 bg-white text-violet-700 hover:bg-violet-50 hover:border-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-400 mt-1 ${currentTemplate?.id === template.id ? 'opacity-70' : ''}`}
                  onClick={() => applyTemplate(template)}
                  aria-label={`${currentTemplate?.id === template.id ? 'Reapply' : 'Apply'} template: ${template.name}`}
                  type="button"
                >
                  {currentTemplate?.id === template.id ? 'Reapply Template' : 'Use Template'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

export default TemplateLibrary;
