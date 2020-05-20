"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 4000;
}
const {
  handleItemId,
  handleQueries,
  handleCompany,
  handleCheckout,
  handleCategoryFilter,
  handleSearchQuery,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(cors())

  // use the queries as values to filter the array with
  // for example '/items?body_location=Arms&category=Fitness' will be all the items that are 'Arms' and 'Fitness'
  .get("/items", handleQueries)
  .get("/items/filter/:category", handleCategoryFilter)
  .get("/items/:itemId", handleItemId)
  .get("/companies/:companyId", handleCompany)
  .post("/checkout", handleCheckout)
  .get("/search/:searchQuery", handleSearchQuery)
  //parse JSON object received with num of items purchased
  //find with items ID all the items in the order
  //modify the numInStock
  //send confimation message 'order completed success'
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
