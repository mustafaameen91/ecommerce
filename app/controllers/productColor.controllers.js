const ProductColor = require("../models/productColor.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const productColor = new ProductColor({
      productSizeId: req.body.productSizeId,
      color: req.body.color,
      quantity: req.body.quantity,
   });

   ProductColor.create(productColor, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProductColor.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProductColor.findById(req.params.id, (err, data) => {
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

   ProductColor.updateById(
      req.params.id,
      new ProductColor(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProductColor.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ProductColor was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProductColor.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All ProductColors were deleted successfully!` });
   });
};
