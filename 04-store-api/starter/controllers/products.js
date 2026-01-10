const Product = require('../models/Product');
//const { StatusCodes } = require('http-status-codes');
//const asyncWrapper = require('../middleware/async'); // optional if i have async wrapper ,  NO file named async.js

const getAllProducts = (async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  //1. Filter by featured
  if (featured) {
    queryObject.featured = featured === 'true';
  }

  // 2. Filter by company
  if (company) {
    queryObject.company = company;
  }

  // 3.Filter by name (partial match with regex)
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // case-insensitive
  }

  // 4. Numeric filters: price, rating (e.g., price>30,rating>=4)
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|<=|=|>=|>)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        if (!queryObject[field]) queryObject[field] = {};
        queryObject[field][operator] = Number(value);
      }
    });
  }

  let result = Product.find(queryObject);

  // 5. Sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt'); // default
  }

  // 6. Select fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  //7. Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
});

// Static method for experimentation
const getAllProductsStatic = async(req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };


//StatusCodes.OK = 200 i.e. OK – request was successful
//npm install http-status-codes to use StatusCodes.OK instead of 200 to use the http-status-codes package