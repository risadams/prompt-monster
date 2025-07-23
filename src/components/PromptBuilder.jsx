import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrainCircuit, faDiagramNested, faPencilAlt, faBullseyePointer, faMemoCircleInfo, faUserAstronaut } from '@awesome.me/kit-1792c0f8ba/icons/sharp-duotone/thin'

function PromptBuilder({
  roles,
  formData,
  handleFieldChange,
  currentTemplate,
  userModifications
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6">
      {/* Role Selection */}
      <div>
        <label htmlFor="role-select" className="block font-semibold text-slate-700 mb-1">
          <FontAwesomeIcon icon={faUserAstronaut} />
          Role <span className="text-pink-600" aria-label="required">*</span>
        </label>
        <select
          id="role-select"
          className="block w-full rounded-lg border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 bg-white px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
        <div>
          <label htmlFor="custom-role" className="block font-semibold text-slate-700 mb-1">
            Custom Role <span className="text-pink-600" aria-label="required">*</span>
          </label>
          <input
            id="custom-role"
            type="text"
            className="block w-full rounded-lg border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 bg-white px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
      <div>
        <label htmlFor="task-input" className="block font-semibold text-slate-700 mb-1">
          <FontAwesomeIcon icon={faDiagramNested} />
          Task <span className="text-pink-600" aria-label="required">*</span>
          {currentTemplate && userModifications.task && (
            <span className="ml-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-0.5 font-medium" title="You've modified this field from the template">
              <FontAwesomeIcon icon={faPencilAlt} />
              Modified
            </span>
          )}
        </label>
        <input
          id="task-input"
          type="text"
          className="block w-full rounded-lg border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 bg-white px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
      <div>
        <label htmlFor="idea-input" className="block font-semibold text-slate-700 mb-1">
          <FontAwesomeIcon icon={faBullseyePointer} />
          Goal <span className="text-pink-600" aria-label="required">*</span>
          {currentTemplate && userModifications.idea && (
            <span className="ml-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-0.5 font-medium" title="You've modified this field from the template">
              <FontAwesomeIcon icon={faPencilAlt} />
              Modified
            </span>
          )}
        </label>
        <input
          id="idea-input"
          type="text"
          className="block w-full rounded-lg border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 bg-white px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
      <div>
        <label htmlFor="context-input" className="block font-semibold text-slate-700 mb-1">
          <FontAwesomeIcon icon={faBrainCircuit} />
          Context
          {currentTemplate && userModifications.context && (
            <span className="ml-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-0.5 font-medium" title="You've modified this field from the template">
              <FontAwesomeIcon icon={faPencilAlt} />
              Modified
            </span>
          )}
        </label>
        <input
          id="context-input"
          type="text"
          className="block w-full rounded-lg border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 bg-white px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
      <div>
        <label htmlFor="requirements-input" className="block font-semibold text-slate-700 mb-1">
          <FontAwesomeIcon icon={faMemoCircleInfo} />
          Details
          {currentTemplate && userModifications.requirements && (
            <span className="ml-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-0.5 font-medium" title="You've modified this field from the template">
              <FontAwesomeIcon icon={faPencilAlt} />
              Modified
            </span>
          )}
        </label>
        <textarea
          id="requirements-input"
          className="block w-full rounded-lg border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 bg-white px-3 py-2 text-base text-slate-800 shadow-sm transition"
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
