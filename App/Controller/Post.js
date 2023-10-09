const postModel = require("../model/posts");
const categorieModel = require("../model/categorie");

const Joi = require("joi");
const fs = require("fs");




exports.getPostSearched = async (req, res) => {
  let searchTitle = req.query.searchedName;
  let categories = await categorieModel.getAllCategories();
  let searchBlog = await postModel.searchPost(searchTitle);

  console.log('searchBlog:', searchBlog);

  try {
    if (searchBlog) {
      res.render("search", { searchBlog, categories, title: "search Page" });
    } else {
      res.status(404).send("No posts found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};




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


exports.addPostWithCategorie = async (req, res) => {
  const postSchema = Joi.object({
    title: Joi.string().required(),
    auteur: Joi.string().required(),
    content: Joi.string().required(),
    categories: Joi.array().items(Joi.number()).required(),
  });
  const { error , value} = postSchema.validate(req.body);

  if (error) {
    return res.send('Invalid input. Please check your data.' );
  }
    let title = req.body.title;
    let auteur = req.body.auteur;
    let content = req.body.content;
    let pathImageTemp = req.file.path;
    let extention = req.file.mimetype.split("/")[1];
    let target = "public/upload/" + req.file.filename + "." + extention;
    let imageName = req.file.filename + "." + extention;
    let categories_id = req.body.categories;
    fs.readFile(pathImageTemp, (err, data) => {
      fs.writeFile(target, data, () => {
        let add = postModel.addPostWithCategorie(title, auteur ,content, imageName, categories_id);
        if (add == false) {
          console.log(`Erreur lors de l'insertion du post :`, err);
        } else {
          console.log("Post inséré avec succès");
          res.redirect("/");
        }
        console.log("image upload avec succès");
      });
    });
  }




exports.updatePost = async (req, res) => {
  const updateSchema = Joi.object({
    title: Joi.string().required(),
    auteur: Joi.string().required(),
    content: Joi.string().required(),
    categories: Joi.array().items(Joi.number()).required(),
  });
  const { error , value} = updateSchema.validate(req.body);

  if (error) {
    return res.send('Invalid input. Please check your data.' );
  }
  let title = req.body.title;
  let auteur = req.body.auteur;
  let content = req.body.content;
  let idPost = req.params.id;

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

exports.getPostByCategorie = async (req,res) => {
  let idCategorie = req.params.id;
  let article = await postModel.getPostByCategorie(idCategorie);
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
}



exports.deletePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    await postModel.deletePost(idPost); 
    console.log("Post has been deleted successfully");
    res.redirect("/"); 
    return true
  } catch (err) {
    console.error(`Error deleting the post:`, err);
    res.status(500).send("Error deleting the post");
    return false
  }
};
