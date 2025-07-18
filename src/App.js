import React from 'react';
import roles from './data/Role.json';

function App() {
  const [idea, setIdea] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('');
  const [customRole, setCustomRole] = React.useState('');
  const [task, setTask] = React.useState('');
  const [context, setContext] = React.useState('');
  const [requirements, setRequirements] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    if (e.target.value !== 'other') {
      setCustomRole('');
    }
  };

  // Find role description if a predefined role is selected
  const selectedRoleObj = roles.find(r => r.name === selectedRole);
  const roleDescription = selectedRoleObj ? selectedRoleObj.description : '';

  // Build context section
  let contextSection = '';
  if (selectedRoleObj && roleDescription) {
    contextSection += `Role Description: ${roleDescription}`;
    if (context) contextSection += `\n${context}\n`;
  } else if (context) {
    contextSection = context;
  }

  const prompt =
    (selectedRole === 'other' ? customRole : selectedRole) && task && idea
      ? `Acting as a "${selectedRole === 'other' ? customRole : selectedRole}" I want to "${task}" so that I can "${idea}".` +
      (contextSection ? `\n\nHere is the context: ${contextSection}` : '') +
      (requirements ? `\n\nDetails: ${requirements}` : '')
      : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ width: '100%', padding: '2em 0 1em 0', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 700, fontSize: '2.5em', color: '#3730a3', marginBottom: '0.2em' }}>Prompt Generator</h1>
        <p style={{ color: '#6366f1', fontSize: '1.2em', marginBottom: 0 }}>Create effective prompts for GPT apps</p>
      </header>
      <main style={{ width: '100%', maxWidth: 480, margin: '2em auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(55,48,163,0.08)', padding: '2em', display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
        <div>
          <label htmlFor="role-select" style={{ fontWeight: 600, color: '#3730a3' }}>Role <span style={{ color: 'red' }}>*</span></label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={handleRoleChange}
            style={{ width: '100%', padding: '0.75em', fontSize: '1em', marginTop: '0.5em', borderRadius: 8, border: '1px solid #c7d2fe', background: '#f3f4f6' }}
            required
          >
            <option value="">Select a role...</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
            <option value="other">Other (specify below)</option>
          </select>
          {selectedRole === 'other' && (
            <input
              type="text"
              value={customRole}
              onChange={e => setCustomRole(e.target.value)}
              style={{ width: '100%', padding: '0.75em', fontSize: '1em', marginTop: '0.75em', borderRadius: 8, border: '1px solid #c7d2fe', background: '#f3f4f6' }}
              placeholder="Enter your role..."
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="task-input" style={{ fontWeight: 600, color: '#3730a3' }}>Task <span style={{ color: 'red' }}>*</span></label>
          <input
            id="task-input"
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            style={{ width: '100%', padding: '0.75em', fontSize: '1em', marginTop: '0.5em', borderRadius: 8, border: '1px solid #c7d2fe', background: '#f3f4f6' }}
            placeholder="What do you want the AI to do?"
            required
          />
        </div>
        <div>
          <label htmlFor="idea-input" style={{ fontWeight: 600, color: '#3730a3' }}>Goal <span style={{ color: 'red' }}>*</span></label>
          <input
            id="idea-input"
            type="text"
            value={idea}
            onChange={e => setIdea(e.target.value)}
            style={{ width: '100%', padding: '0.75em', fontSize: '1em', marginTop: '0.5em', borderRadius: 8, border: '1px solid #c7d2fe', background: '#f3f4f6' }}
            placeholder="Describe your goal..."
            required
          />
        </div>
        <div>
          <label htmlFor="context-input" style={{ fontWeight: 600, color: '#3730a3' }}>Context</label>
          <input
            id="context-input"
            type="text"
            value={context}
            onChange={e => setContext(e.target.value)}
            style={{ width: '100%', padding: '0.75em', fontSize: '1em', marginTop: '0.5em', borderRadius: 8, border: '1px solid #c7d2fe', background: '#f3f4f6' }}
            placeholder="Any background context for the task..."
          />
        </div>
        <div>
          <label htmlFor="requirements-input" style={{ fontWeight: 600, color: '#3730a3' }}>Details</label>
          <input
            id="requirements-input"
            type="text"
            value={requirements}
            onChange={e => setRequirements(e.target.value)}
            style={{ width: '100%', padding: '0.75em', fontSize: '1em', marginTop: '0.5em', borderRadius: 8, border: '1px solid #c7d2fe', background: '#f3f4f6' }}
            placeholder="Specify requirements, dos/don'ts, output formats..."
          />
        </div>
        <section style={{ marginTop: '2em', background: '#f3f4f6', borderRadius: 12, padding: '1.5em', boxShadow: '0 2px 8px rgba(55,48,163,0.04)' }}>
          <h2 style={{ color: '#3730a3', fontWeight: 700, fontSize: '1.3em', marginBottom: '1em' }}>Generated Prompt</h2>
          {prompt ? (
            <>
              <textarea
                readOnly
                style={{ width: '100%', minHeight: '120px', fontSize: '1em', padding: '1em', borderRadius: '8px', border: '1px solid #c7d2fe', background: '#fff', marginBottom: '1em' }}
                value={prompt}
              />
              <button
                onClick={handleCopy}
                style={{ background: copied ? '#6366f1' : '#3730a3', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75em 1.5em', fontSize: '1em', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </>
          ) : (
            <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
              Please fill in <strong>Role</strong>, <strong>Task</strong>, and <strong>Goal</strong> to generate your prompt.
            </div>
          )}
        </section>
      </main>
      <footer style={{ textAlign: 'center', color: '#a5b4fc', fontSize: '0.95em', margin: '2em 0 1em 0' }}>
        &copy; {new Date().getFullYear()} <a href="https://risadams.com">Ris Adams</a>. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
