const postModel = require("../model/posts");
const categorieModel = require("../model/categorie");

const Joi = require("joi");
const fs = require("fs");

exports.getAllPosts = async (req, res) => {
  let blogs = await postModel.getPosts();
 let categories = await categorieModel.getAllCategories();

  try {
    if (blogs) {
      res.render("home", { blogs ,categories, title:"Home Page"});
    } else {
      res.status(404).send("No posts found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPostById = async (req, res) => {

    let idPost = req.params.id;
    console.log(idPost)
    let article = await postModel.getPostById(idPost);
    
    try {
      if (article) {
        res.render("article", { article ,title:article.title });
      } else {
        res.status(404).send("No posts found.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

exports.addPost = async (req, res) => {
  let title = req.body.title;
  let auteur = req.body.auteur;
  let content = req.body.content;
  let pathImageTemp = req.file.path;
  let extention = req.file.mimetype.split("/")[1];
  let target = "public/upload/" + req.file.filename + "." + extention;
  let imageName = req.file.filename + "." + extention;

  fs.readFile(pathImageTemp, (err, data) => {
    fs.writeFile(target, data, () => {
      let add = postModel.addPost(title, auteur ,content, imageName);
      if (add == false) {
        console.log(`Erreur lors de l'insertion du post :`, err);
      } else {
        console.log("Post inséré avec succès");
        res.redirect("/");
      }
      console.log("image upload avec succès");
    });
  });
};


exports.updatePost = async (req, res) => {
  let title = req.body.title;
  let auteur = req.body.auteur;
  let content = req.body.content;
  let idPost = req.params.id;

  // Check if a file was uploaded
  if (req.file) {
    let pathImageTemp = req.file.path;
    let extention = req.file.mimetype.split("/")[1];
    let target = "public/upload/" + req.file.filename + "." + extention;
    let imageName = req.file.filename + "." + extention;

    fs.readFile(pathImageTemp, (err, data) => {
      fs.writeFile(target, data, () => {
        let update = postModel.updatePost(title, auteur, content, imageName, idPost);
        if (update == false) {
          console.log(`Erreur lors de l'insertion du post :`, err);
        } else {
          console.log("Post inséré avec succès");
          res.redirect("/");
        }
        console.log("image upload avec succès");
      });
    });
  } else {
    // Handle the case when no file was uploaded
    console.log("No file uploaded");
    let imagePrevious = req.body.imagePrevious

    let update = postModel.updatePost(title, auteur, content,imagePrevious,idPost); 
    if (update == false) {
      console.log(`Erreur lors de l'insertion du post :`, err);
    } else {
      console.log("Post inséré avec succès");
      res.redirect("/");
    }
  }
};



exports.deletePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    await postModel.deletePost(idPost); 

    console.log("Post has been deleted successfully");
    res.redirect("/"); 
  } catch (err) {
    console.error(`Error deleting the post:`, err);
    res.status(500).send("Error deleting the post");
  }
};
