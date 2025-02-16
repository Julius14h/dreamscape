const runPython = require("../utils/runPython");

const analyzeDream = async (req, res) => {
  const { dreamText } = req.body;
  if (!dreamText) return res.status(400).json({ error: "Dream text is required" });

  try {
    const interpretations = await runPython(dreamText);
    res.json({ interpretations });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { analyzeDream };
