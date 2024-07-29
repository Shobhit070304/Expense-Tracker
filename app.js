const express = require("express");
const app = express();
const path = require("path");
const transactionModel = require("./models/transaction");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let transactions = await transactionModel.find({});


  let total = 0;
  transactions.forEach(function (transaction) {
    if (transaction.amount[0] === "-") {
      total -= parseFloat(transaction.amount.slice(1))
    } else {
      total += parseFloat(transaction.amount);
    }
  });
   total = parseFloat(total.toFixed(2));
  

  res.render("home", { transactions, total });
});

app.post("/transaction", async (req, res) => {
  let { name, date, amount, description } = req.body;

  let newtransaction = await transactionModel.create({
    name: name,
    date: date,
    amount: amount,
    description: description,
  });

  res.redirect("/");
});

app.listen(3000);
