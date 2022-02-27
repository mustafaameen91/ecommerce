const Store = require("../models/store.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const store = new Store({
      storeName: req.body.storeName,
      ownerPhone: req.body.ownerPhone,
      ownerName: req.body.ownerName,
   });

   Store.create(store, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Store.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Store.findById(req.params.id, (err, data) => {
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

   Store.updateById(req.params.id, new Store(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Store.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Store was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Store.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Stores were deleted successfully!` });
   });
};
