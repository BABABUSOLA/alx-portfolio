const express = require("express")
const router = require("./routes/index.js");

const cors = require("cors");
const app = express();

const port = parseInt(process.env.PORT, 10) || 8080;

app.use(cors()); //enable cors
app.use(express.json());
app.use('/api/v1/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;