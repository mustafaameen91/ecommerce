module.exports = (app) => {
   const store = require("../controllers/store.controllers.js");

   app.post("/api/addStore", store.create);

   app.get("/api/stores", store.findAll);

   app.get("/api/store/:id", store.findOne);

   app.put("/api/store/:id", store.update);

   app.delete("/api/store/:id", store.delete);

   app.delete("/api/stores", store.deleteAll);
};
