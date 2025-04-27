let editor; // global editor variable

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs' }});

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('codespace'), {
    value: "# Write your code here\n",
    language: 'python',
    theme: 'vs-dark'
  });
});

/*document.getElementById('submit-butt').addEventListener('click', async function () {
  const code = editor.getValue();

  try {
    const response = await fetch('http://localhost:5000/submit-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    document.getElementById('output-text').innerText = data.output || 'No output received.';
    document.getElementById('feedback-text').innerText = data.message || 'No feedback received';
  } catch (error) {
    console.error('Error submitting code:', error);
    document.getElementById('output-text').innerText = 'Error connecting to server!';
    document.getElementById('feedback-text').innerText = 'Error connecting to server!';
  }
});*/
