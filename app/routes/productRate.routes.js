module.exports = (app) => {
   const productRate = require("../controllers/productRate.controllers.js");

   app.post("/api/addProductRate", productRate.create);

   app.get("/api/productRates", productRate.findAll);

   app.get("/api/productRate/:id", productRate.findOne);

   app.put("/api/productRate/:id", productRate.update);

   app.delete("/api/productRate/:id", productRate.delete);

   app.delete("/api/productRates", productRate.deleteAll);
};
