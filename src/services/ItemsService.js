const axios = require("axios");
const connection = require("../db");
const { promisify } = require("util");

const queryAsync = promisify(connection.query).bind(connection);

const fetchItems = async () => {
  const version = "14.14.1";
  const response = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`
  );
  return response.data.data;
};

const saveItemsToDB = async () => {
  try {
    const items = await fetchItems();
    for (let key in items) {
      const item = items[key];
      const { name, description, image } = item;
      console.log(`Inserting item: ${name}`);
      try {
        await queryAsync(
          "INSERT INTO items (name, description, image) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE description = VALUES(description), image = VALUES(image)",
          [name, description, JSON.stringify(image)]
        );
        console.log(`Item ${name} added to the database`);
      } catch (insertError) {
        console.error(`Error inserting item ${name}: ${insertError.message}`);
      }
    }
  } catch (err) {
    console.error(`Error fetching items: ${err.message}`);
  }
};

module.exports = { saveItemsToDB };
