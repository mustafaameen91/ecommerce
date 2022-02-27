module.exports = (app) => {
   const productImage = require("../controllers/productImage.controllers.js");

   app.post("/api/addProductImage", productImage.create);

   app.get("/api/productImages", productImage.findAll);

   app.get("/api/productImage/:id", productImage.findOne);

   app.put("/api/productImage/:id", productImage.update);

   app.delete("/api/productImage/:id", productImage.delete);

   app.delete("/api/productImages", productImage.deleteAll);
};
