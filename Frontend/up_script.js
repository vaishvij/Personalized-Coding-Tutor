// Monaco Editor Setup
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }});
require(["vs/editor/editor.main"], function () {
  window.editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: '# Write your Python code here',
    language: 'python',
    theme: 'vs-dark'
  });
});

// Run Code
document.getElementById('run-code').addEventListener('click', async () => {
  const code = window.editor.getValue();
  const response = await fetch('/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  });
  const data = await response.json();
  document.getElementById('output').textContent = data.output;
});

// Submit Code for Feedback
document.getElementById('submit-code').addEventListener('click', async () => {
  const code = window.editor.getValue();
  const response = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  });
  const data = await response.json();
  document.getElementById('output').textContent = data.output;

  // Show Feedback
  document.getElementById('feedback').style.display = 'block';
  document.getElementById('mistakes').innerHTML = `<b>Mistakes:</b> ${data.mistakes}`;
  document.getElementById('strengths').innerHTML = `<b>Strengths:</b> ${data.strengths}`;
  document.getElementById('learning-path').innerHTML = `<b>Next Steps:</b> ${data.learning_path}`;
});
