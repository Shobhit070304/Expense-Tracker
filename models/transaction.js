const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/expense-tracker`);

const transactionSchema = mongoose.Schema({
  name: String,
  date:String,
  amount: String,
  description: String,
});

module.exports = mongoose.model("transaction", transactionSchema);