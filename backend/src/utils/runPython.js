const { exec } = require("child_process");
const path = require("path");

const runPython = (dreamText) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../scripts/analyze_dream.py");
    const pythonPath = "/home/juliushenriques/deerhacks/dreamscape/backend/.venv/bin/python3"; // Use venv Python
    const env = { ...process.env, GOOGLE_API_KEY: process.env.GOOGLE_API_KEY }; // Pass API key

    exec(`${pythonPath} ${scriptPath} --text "${dreamText}"`, { env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Python Error: ${stderr}`);
        return reject("Error processing dream analysis");
      }
      try {
        const interpretations = JSON.parse(stdout.trim());
        resolve(interpretations);
      } catch (parseError) {
        reject("Invalid response format from Python script");
      }
    });
  });
};

module.exports = runPython;