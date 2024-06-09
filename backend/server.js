const express = require("express")
const router = require("./routes/index.js");
const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;


app.use(express.json());
app.use('/api/v1/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;