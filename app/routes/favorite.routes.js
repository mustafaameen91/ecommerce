module.exports = (app) => {
   const favorite = require("../controllers/favorite.controllers.js");

   app.post("/api/addFavorite", favorite.create);

   app.get("/api/favorites", favorite.findAll);

   app.get("/api/favorite/:id", favorite.findOne);

   app.put("/api/favorite/:id", favorite.update);

   app.delete("/api/favorite/:id", favorite.delete);

   app.delete("/api/favorites", favorite.deleteAll);
};
