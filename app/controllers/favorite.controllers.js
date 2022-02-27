const Favorite = require("../models/favorite.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const favorite = new Favorite({
      userId: req.body.userId,
      productId: req.body.productId,
   });

   Favorite.create(favorite, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Favorite.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Favorite.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Favorite.updateById(req.params.id, new Favorite(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Favorite.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Favorite was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Favorite.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Favorites were deleted successfully!` });
   });
};
