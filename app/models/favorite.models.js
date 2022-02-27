const sql = require("./db.js");

const Favorite = function (favorite) {
   this.userId = favorite.userId;
   this.productId = favorite.productId;
};

Favorite.create = (newFavorite, result) => {
   sql.query("INSERT INTO favorite SET ?", newFavorite, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created favorite: ", { id: res.insertId, ...newFavorite });
      result(null, { id: res.insertId, ...newFavorite });
   });
};

Favorite.getAll = (result) => {
   sql.query("SELECT * FROM favorite", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("favorite: ", res);
      result(null, res);
   });
};

Favorite.findById = (favoriteId, result) => {
   sql.query(
      `SELECT * FROM favorite WHERE idFavorite = ${favoriteId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found favorite: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Favorite.updateById = (id, favorite, result) => {
   sql.query(
      "UPDATE favorite SET ? WHERE idFavorite = ?",
      [favorite, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated favorite: ", { id: id, ...favorite });
         result(null, { id: id, ...favorite });
      }
   );
};

Favorite.remove = (id, result) => {
   sql.query("DELETE FROM favorite WHERE idFavorite = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted favorite with id: ", id);
      result(null, res);
   });
};

module.exports = Favorite;
