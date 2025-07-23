import React, { useState, useMemo } from 'react';

function TemplateLibrary({
  templates,
  currentTemplate,
  clearTemplate,
  applyTemplate
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
  );
}

export default TemplateLibrary;
