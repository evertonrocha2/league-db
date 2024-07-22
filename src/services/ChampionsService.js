const axios = require("axios");
const connection = require("../db");
const { promisify } = require("util");

const queryAsync = promisify(connection.query).bind(connection);

const saveChampionsToDB = async () => {
  try {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/9.24.1/data/en_US/champion.json"
    );
    const champions = response.data.data;

    for (let key in champions) {
      const champion = champions[key];
      const { name, title, info, blurb, stats } = champion;

      const infoString = JSON.stringify(info);
      const statsString = JSON.stringify(stats);
      console.log(`Inserting champion: ${name}`);
      console.log(`Stats: ${statsString}`);

      try {
        await queryAsync(
          "INSERT INTO champions (name, title, info, blurb, stats) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), info = VALUES(info), blurb = VALUES(blurb), stats = VALUES(stats)",
          [name, title, infoString, blurb, statsString]
        );
        console.log(`Champion ${name} added to the database`);
      } catch (insertError) {
        console.error(
          `Error inserting champion ${name}: ${insertError.message}`
        );
      }
    }
  } catch (err) {
    console.error(`Error fetching champions: ${err.message}`);
  }
};

const getById = async (id) => {
  try {
    const result = await queryAsync("SELECT * FROM champions WHERE id = ?", [
      id,
    ]);
    return result[0];
  } catch (err) {
    throw new Error(`Failed to fetch champion by id: ${err.message}`);
  }
};

const getAllChampions = async () => {
  try {
    const results = await queryAsync("SELECT * FROM champions");
    return results;
  } catch (err) {
    throw new Error(`Failed to fetch all champions: ${err.message}`);
  }
};

module.exports = { saveChampionsToDB, getById, getAllChampions };
