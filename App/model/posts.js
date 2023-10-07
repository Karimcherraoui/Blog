const con = require('../db')



  exports.getPosts = async ()=>{
    
    const [result] = await con.query('SELECT * FROM post',[])
    return result
  }

  exports.getPostById = async (id)=>{
    
    const [result] = await con.query('SELECT * FROM post WHERE postID = ?',id)
    return result
  }


  exports.addPost = async (title,auteur,content,image)=>{

    const query = 'INSERT INTO post (title,auteur,content,image) VALUES (?,?,?,?)'
        con.query(query,[title,auteur,content,image],(err,results)=>{
            if (err) {
                console.log(`Erreur lors de l'insertion du post :`, err);
              } else {
                console.log('Post inséré avec succès');
              }
        })

  }

  exports.updatePost = async (title , auteur , content , image , postID)=>{
    const query = 'UPDATE post set title = ? , auteur = ? , content = ?  , image = ? WHERE postID = ? '
    const params = [title , auteur , content , image , postID]

    con.query(query,params,(err,res)=>{
      res.render('update',{ title: `Page de gestion` });
      if (err) {
        console.log(`Erreur lors de l'update du post :`, err);
      } else {
        console.log('Post update avec succès');
      }
    })
  }

  exports.deletePost = async (id)=>{
    const query = 'DELETE FROM post WHERE postID = ?';
    con.query(query,id,(err,results)=>{
      if (err) {
        console.log(`Erreur lors de suppression du post :`, err);
      } else {
        console.log('Post est supprimer avec succès');
      }
    })
  }

  





