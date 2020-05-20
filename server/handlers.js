/// HANDLER FILE
const items = require("./data/items");
const companies = require("./data/companies");
const ordersMade = require("./data/order-Info");

const filterByQueries = (queries, category) => {
  let filteredItems = items;
  let searchParameter = null;

  if (category)
    filteredItems = filteredItems.filter((item) => item.category === category);

  if (queries) {
    for (let searchQuery in queries) {
      searchParameter = queries[searchQuery];
      if (typeof searchParameter === "string") {
        filteredItems = filteredItems.filter(
          (item) => item[searchQuery] === searchParameter
        );
      } else {
        let subSearch = [];
        searchParameter.forEach((parameter) => {
          const aPartOfFiltering = filteredItems.filter(
            (item) => item[searchQuery] === parameter
          );
          subSearch = subSearch.concat(aPartOfFiltering);
        });
        filteredItems = subSearch;
      }
    }
  }
  return filteredItems;
};
// use the queries as values to filter the array with
// for example '/items?body_location=Arms&category=Fitness' will be all the items that are 'Arms' and 'Fitness'
const handleQueries = (req, res) => {
  let filtered = filterByQueries(req.query);
  // if (filtered.length) {
  res.status(200).send({ status: 200, items: filtered });
  // } else {
  // res.status(404).send({status: 404, message: 'no items in category'})
  // }
};

const handleCompany = (req, res) => {
  const { companyId } = req.params;
  const parsedId = parseInt(companyId);
  const company = companies.find((comp) => comp.id === parsedId);
  return res.json({ company });
};

const handleCheckout = (req, res) => {
  const { orders, orderInfo } = req.body;
  orders.forEach((order) => {
    const item = items.find((anItem) => anItem.id === order.itemId);
    item.numInStock -= order.numOrdered;
  });

  let uniqueId = new Date().valueOf().toString();
  ordersMade[uniqueId] = { orders, orderInfo };
  res.status(200).send({ status: 200, orderId: uniqueId });
};

const handleCategoryFilter = (req, res) => {
  const { category } = req.params;
  const itemsInCategory = filterByQueries(req.query, category);
  res.status(200).send({ status: 200, items: itemsInCategory });
};

const filterBySearchQuery = (query, queries) => {
  let filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  if (queries) {
    for (let searchQuery in queries) {
      searchParameter = queries[searchQuery];
      if (typeof searchParameter === "string") {
        filteredItems = filteredItems.filter(
          (item) => item[searchQuery] === searchParameter
        );
      } else {
        let subSearch = [];
        searchParameter.forEach((parameter) => {
          const aPartOfFiltering = filteredItems.filter(
            (item) => item[searchQuery] === parameter
          );
          subSearch = subSearch.concat(aPartOfFiltering);
        });
        filteredItems = subSearch;
      }
    }
  }
  return filteredItems;
};

const handleSearchQuery = (req, res) => {
  const { searchQuery } = req.params;
  const searchResults = filterBySearchQuery(searchQuery, req.query);
  res.status(200).send({ status: 200, searchResults });
};

const handleItemId = (req, res) => {
  const { itemId } = req.params;
  const parsedId = parseInt(itemId);
  const item = items.find((item) => item.id === parsedId);
  return res.json({ item });
};

module.exports = {
  handleItemId,
  handleQueries,
  handleCompany,
  handleCheckout,
  handleCategoryFilter,
  handleSearchQuery,
};
