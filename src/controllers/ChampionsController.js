const {
  saveChampionsToDB,
  getById,
  getAllChampions,
} = require("../services/ChampionsService");

module.exports = {
  getAll: async (req, res) => {
    await saveChampionsToDB();
    const champions = await getAllChampions();
    res.json(champions);
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
