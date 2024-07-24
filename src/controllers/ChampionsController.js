const axios = require("axios");
const {
  saveChampionsToDB,
  getById,
  getAllChampions,
} = require("../services/ChampionsService");

module.exports = {
  getAll: async (req, res) => {
    try {
      await saveChampionsToDB();
      const champions = await getAllChampions();
      res.json(champions);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to retrieve champions", details: err.message });
    }
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
  fetchPlayers: async (req, res) => {
    try {
      const response = await axios.get(
        "https://americas.api.riotgames.com/lol/match/v5/matches/BR1_2971670760?api_key=RGAPI-629b35f6-7ffb-4b9a-9a79-ba73b6f345d4"
      );
      const participants = response.data.info.participants.map(
        (participant) => ({
          summonerName: participant.summonerName,
          championName: participant.championName,
          kills: participant.kills,
          deaths: participant.deaths,
          assists: participant.assists,
          items: [
            participant.item0,
            participant.item1,
            participant.item2,
            participant.item3,
            participant.item4,
            participant.item5,
          ],
        })
      );
      res.json(participants);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to retrieve players", details: err.message });
    }
  },
};
