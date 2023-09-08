const express = require("express");
const app = express();
const port = process.env.PORT || 7850;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

app.post("/convert", async(req, res) => {
    const {fromCurrency, toCurrency, amount } = req.body;

    try{
        const response = await axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`
          );

        const rate = response.data[toCurrency];
        if (!rate) {
            return res.status(400).json({ error: 'Invalid currency pair' });
        }

        const convertedAmount = amount * rate;

        return res.json({ convertedAmount });

    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});