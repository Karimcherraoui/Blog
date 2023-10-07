
const categorieModel = require("../model/categorie");


exports.addCategorie = async (req,res) =>{
        let nameCategorie = req.body.name
        let add = categorieModel.addCategorie(nameCategorie)
        if (add == false) {
            console.log(`Erreur lors de l'insertion du categorie :`, err);
          } else {
            console.log("Categorie inséré avec succès");
            res.redirect("/");
          }
}


exports.getAllCategories = async (req, res) => {
    let categories = await categorieModel.getAllCategories();
    try {
      if (categories) {
        res.render("gestion", { categories , title:"gestion Page"});
      } else {
        res.status(404).send("No categorie found.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
//   exports.getHome = async (req, res) => {
//     try {
//       const categories = await categorieModel.getAllCategories();
//       if (categories) {
//         res.render("home", { categories, title: "Home Page" });
//       } else {
//         res.status(404).send("No categorie found.");
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   };

  exports.updateCategorie = async (req,res) => {
    let nameCategorie = req.body.nameCategorie
    let idCategorie = req.body.categorieID
    let update = categorieModel.updateCategorie(nameCategorie,idCategorie)
    if (update == false) {
        console.log(`Erreur lors de modification du categorie :`, err);
      } else {
        console.log("Categorie est modifier avec succès");
        res.redirect("/");
      }


  }


exports.deleteCategorie = async (req, res) => {
    try {
      const idCategorie = req.body.categorieID;
      console.log('id from controller :' + idCategorie)

      await categorieModel.deleteCategorie(idCategorie); 
      console.log("categorie has been deleted successfully");
      res.redirect("/"); 
    } catch (err) {
      console.error(`Error deleting the categorie:`, err);
      res.status(500).send("Error deleting the categorie");
    }
  };
