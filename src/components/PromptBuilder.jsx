import React from 'react';

function PromptBuilder({
  roles,
  formData,
  handleFieldChange,
  currentTemplate,
  userModifications
}) {
  return (
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
  );
}

export default PromptBuilder;
