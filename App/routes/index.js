const express =  require('express');
const router = express.Router();
const postController = require('../Controller/Post');
const postModel = require('../model/posts')
const categorieController = require('../Controller/Categorie');
const multer  = require('multer')
const upload = multer({ dest: 'temp' })


router.get('/', postController.getAllPosts)

// --------------------------- Gestion ------------------------------
router.get('/gestion', (req,res)=>{
    res.render('gestion',{ title: `Page de gestion` });
})
router.post('/gestion/addArticle',upload.single("image"),postController.addPost);
router.get('/gestion/getallpost', postController.getAllPosts);
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
// --------------------------- Article ------------------------------
router.get('/article/:id', postController.getPostById);
router.post('/article/delete/:id', postController.deletePost);

router.post('/article/update/:id',upload.single("image"), postController.updatePost);




module.exports = router

