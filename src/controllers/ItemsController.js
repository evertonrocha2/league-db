const axios = require("axios");

module.exports = {
  fetchItems: async (req, res) => {
    try {
      const version = "14.14.1";

      const itemResponse = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`
      );
      const items = itemResponse.data.data;

      const playerResponse = await axios.get(
        "http://localhost:3000/api/players"
      );
      const players = playerResponse.data;

      players.forEach((player) => {
        console.log(
          `\nJogador: ${player.summonerName}, Campeão: ${player.championName}`
        );
        player.items.forEach((itemId) => {
          const itemDetails = items[itemId];
          if (itemDetails) {
            console.log(`Nome do item: ${itemDetails.name}`);
          } else {
            console.log(`Item com ID ${itemId} não encontrado.`);
          }
        });
      });

      res.json(items);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to retrieve items", details: err.message });
    }
  },
};
