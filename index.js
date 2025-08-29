const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());


app.use(cors({
  origin: "*"
}));

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) { 
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    let allAlpha = data.filter(item => /^[a-zA-Z]+$/.test(item)).join("");
    let reversed = allAlpha.split("").reverse();
    let concat_string = reversed.map((ch, i) =>
      i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");

    const response = {
      is_success: true,
      user_id: "anurag_27092004".toLowerCase(),
      email: "anuragb745@gmail.com",
      roll_number: "22BIT0052",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    };

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Server Error",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
