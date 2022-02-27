module.exports = (app) => {
   const product = require("../controllers/product.controllers.js");

   app.post("/api/addProduct", product.create);

   app.get("/api/products", product.findAll);

   app.get("/api/product/:id", product.findOne);

   app.put("/api/product/:id", product.update);

   app.delete("/api/product/:id", product.delete);

   app.delete("/api/products", product.deleteAll);
};
