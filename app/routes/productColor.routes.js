module.exports = (app) => {
   const productColor = require("../controllers/productColor.controllers.js");

   app.post("/api/addProductColor", productColor.create);

   app.get("/api/productColors", productColor.findAll);

   app.get("/api/productColor/:id", productColor.findOne);

   app.put("/api/productColor/:id", productColor.update);

   app.delete("/api/productColor/:id", productColor.delete);

   app.delete("/api/productColors", productColor.deleteAll);
};
