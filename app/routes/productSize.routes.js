module.exports = (app) => {
   const productSize = require("../controllers/productSize.controllers.js");

   app.post("/api/addProductSize", productSize.create);

   app.get("/api/productSizes", productSize.findAll);

   app.get("/api/productSize/:id", productSize.findOne);

   app.put("/api/productSize/:id", productSize.update);

   app.delete("/api/productSize/:id", productSize.delete);

   app.delete("/api/productSizes", productSize.deleteAll);
};
