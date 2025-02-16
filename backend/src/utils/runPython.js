const { exec } = require("child_process");
const path = require("path");

const runPython = (dreamText) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../scripts/analyze_dream.py");
    
    exec(`python3 ${scriptPath} --text "${dreamText}"`, (error, stdout, stderr) => {
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
