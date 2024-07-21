const { saveChampionsToDB, getById } = require("../services/ChampionsService");

module.exports = {
  getAll: async (req, res) => {
    await saveChampionsToDB();
    res.status(200).json("All champions are loaded");
  },
  getById: async (req, res) => {
    try {
      const champion = await getById(req.params.id);
      if (champion) {
        res.json(champion);
      } else {
        res.status(404).json({ error: "No champion found with that id" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to retrieve champion", details: err.message });
    }
  },
};
