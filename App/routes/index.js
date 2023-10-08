const express =  require('express');
const router = express.Router();
const postController = require('../Controller/Post');
const categorieController = require('../Controller/Categorie');
const postModel = require('../model/posts')
const multer  = require('multer')
const upload = multer({ dest: 'temp' })


router.get('/', postController.getAllPosts)

// --------------------------- Gestion ------------------------------
router.get('/gestion', categorieController.getAllCategories)
router.post('/gestion/addArticle',upload.single("image"),postController.addPost);
router.get('/gestion/getallpost', postController.getAllPosts); //khasni ncreer route akhor
router.get('/gestion/search/getPosts', postController.getPostSearched); //khasni ncreer route akhor

router.post('/gestion/update/:id',async (req, res)=>{
    let idPost = req.params.id;
    let article = await postModel.getPostById(idPost);
    try {
        if (article) {
          res.render("update", { article , title: `Page de gestion`});
        } else {
          res.status(404).send("No posts found.");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
});
router.post('/gestion/addCategorie',categorieController.addCategorie);


// --------------------------- Article ------------------------------
router.get('/article/:id', postController.getPostById);
router.post('/article/delete/:id', postController.deletePost);
router.post('/article/update/:id',upload.single("image"), postController.updatePost);
// router.get('/search',postController.searchPost)

// --------------------------- Categorie ------------------------------

router.post('/categorie/delete/', categorieController.deleteCategorie);
router.post('/categorie/update/', categorieController.updateCategorie);



module.exports = router

