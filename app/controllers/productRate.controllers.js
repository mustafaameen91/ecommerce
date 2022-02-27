const ProductRate = require("../models/productRate.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const productRate = new ProductRate({
      rate: req.body.rate,
      productId: req.body.productId,
   });

   ProductRate.create(productRate, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProductRate.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProductRate.findById(req.params.id, (err, data) => {
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

   ProductRate.updateById(
      req.params.id,
      new ProductRate(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProductRate.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ProductRate was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProductRate.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All ProductRates were deleted successfully!` });
   });
};
