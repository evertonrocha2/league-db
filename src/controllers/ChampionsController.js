const { saveChampionsToDB } = require("../services/ChampionsService");

module.exports = {
  getAll: async (req, res) => {
    await saveChampionsToDB();
    res.status(200).json("All champions are loaded");
  },
  getById: async (req, res) => {
    let json = { error: "", result: [] };
    let champion = await ChampionsService.getById(req.params.id);
    if (champion) {
      return res.json(champion);
    } else {
      json.error = "No champion found with that id";
    }
  },
};
