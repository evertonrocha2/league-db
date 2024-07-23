const express = require("express");
const app = express();
const playerRoutes = require("./routes"); // Certifique-se de que o caminho está correto

app.use("/api", playerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
