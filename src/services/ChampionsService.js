const axios = require("axios");
const connection = require("../db");

const saveChampionsToDB = async () => {
  try {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/9.24.1/data/en_US/champion.json"
    );
    const champions = response.data.data;
    for (let key in champions) {
      const champion = champions[key];
      const { id, name, title, info, blurb } = champion;
      const infoString = JSON.stringify(info);
      connection.query(
        "INSERT INTO champions (id, name, title, info, blurb) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), title = VALUES(title), info = VALUES(info), blurb = VALUES(blurb)",
        [id, name, title, infoString, blurb],
        (err, result) => {
          if (err) throw err;
          console.log(`Champion ${name} added to the database`);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { saveChampionsToDB };
