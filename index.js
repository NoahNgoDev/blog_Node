const express = require('express');
const app = express();
const PORT = 3000;

//router
app.get('/', (req, res) => {
    return res.send("hello");
})

app.listen(PORT, () => {
    console.log("gate port: " + PORT);
})