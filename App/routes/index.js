const express =  require('express');
const router = express.Router();
const postController = require('../Controller/Post');
const categorieController = require('../Controller/Categorie');

router.get('/', (req,res)=>{
    res.render('home',{ title: `Page d'accueil` });
})
router.get('/article', (req,res)=>{
    res.render('article',{ title: `Page d'article` });
})

router.get('/gestion/addArticle', (req,res)=>{
    res.render('gestion',{ title: `Page de gestion` });
})


module.exports = router

