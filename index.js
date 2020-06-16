const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const plants = require("./routes/plants");
const tips = require("./routes/tips");

app.use(cors());

app.use("/", plants);
app.use("/", tips)

app.listen(port, () => {
    console.log(
        `Your friendly Sprite is active and listening on ${port}! 
        So skrzatAPP and work ;)`
        )
});