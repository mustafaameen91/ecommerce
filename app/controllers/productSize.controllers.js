const ProductSize = require("../models/productSize.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const productSize = new ProductSize({
      size: req.body.size,
      productId: req.body.productId,
      quantity: req.body.quantity,
   });

   ProductSize.create(productSize, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProductSize.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProductSize.findById(req.params.id, (err, data) => {
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

   ProductSize.updateById(
      req.params.id,
      new ProductSize(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProductSize.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ProductSize was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProductSize.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All ProductSizes were deleted successfully!` });
   });
};
