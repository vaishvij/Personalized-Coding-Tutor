require.config({
  paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }
});

require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: '# Write your Python code here',
    language: 'python',
    theme: 'vs-dark',
    automaticLayout: true
  });

  // ✅ Store reference globally
  window.editor = editor;

  // ✅ Now define run and submit buttons globally
  window.run = function () {
    const code = window.editor.getValue();

    fetch('/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById('output').textContent = data.output;
    })
    .catch(error => {
      document.getElementById('output').textContent = 'Error: ' + error;
    });
  };

  window.submit = function () {
    alert("Submit functionality coming soon!");
  };
});
