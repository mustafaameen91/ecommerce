const ProductImage = require("../models/productImage.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const productImage = new ProductImage({
      imagePath: req.body.imagePath,
      productId: req.body.productId,
   });

   ProductImage.create(productImage, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProductImage.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProductImage.findById(req.params.id, (err, data) => {
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

   ProductImage.updateById(
      req.params.id,
      new ProductImage(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProductImage.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ProductImage was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProductImage.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All ProductImages were deleted successfully!` });
   });
};
