const con = require('../db')



  exports.getPosts = async ()=>{
    
    const [result] = await con.query('SELECT * FROM post',[])
    return result
  }

  exports.getPostById = async (id)=>{
    
    const [result] = await con.query('SELECT * FROM post WHERE postID = ?',id)
    return result
  }


  // exports.addPost = async (title,auteur,content,image)=>{

  //   const query = 'INSERT INTO post (title,auteur,content,image) VALUES (?,?,?,?)'
  //       con.query(query,[title,auteur,content,image],(err,results)=>{
  //           if (err) {
  //               console.log(`Erreur lors de l'insertion du post :`, err);
  //             } else {
  //               console.log('Post inséré avec succès');
  //             }
  //       })
  // }

  exports.addPost = async (title, auteur, content, image) => {
    const query = 'INSERT INTO post (title, auteur, content, image) VALUES (?, ?, ?, ?)';
    const values = [title, auteur, content, image];
  
    try {
      const [result] = await con.query(query, values);
      const postId = result.insertId; 
      console.log('from result : ' + postId);
      return postId;
    } catch (err) {
      console.log(`Erreur lors de l'insertion du post :`, err);
      throw err;
    }
  };

  exports.addPostWithCategorie = async (title, auteur, content, image, categories_id) => {
    try {
      const postId = await this.addPost(title, auteur, content, image);
  
      // Ensure that categories_id is an array
      if (!Array.isArray(categories_id)) {
        categories_id = [categories_id];
      }
  
      for (const categoryId of categories_id) {
        await con.query('INSERT INTO post_categories (post_id, categorie_id) VALUES (?, ?)', [postId, categoryId]);
      }
  
      console.log('Post and categories added successfully.');
    } catch (err) {
      console.error('Error adding post with categories:', err);
      throw err;
    }
  };
  
  
  
  

  exports.updatePost = async (title , auteur , content , image , postID)=>{
    const query = 'UPDATE post set title = ? , auteur = ? , content = ?  , image = ? WHERE postID = ? '
    const params = [title , auteur , content , image , postID]

    con.query(query,params,(err,res)=>{
      res.render('update',{ title: `Page de gestion` });
      if (err) {
        console.log(`Erreur lors d'update du post :`, err);
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

  exports.searchPost = async (titleSearched) => {
    const query = 'SELECT * FROM post WHERE title LIKE ?';
    const searchTerm = `%${titleSearched}%`;
  
    try {
      const [result] = await con.query(query, [searchTerm]);
      console.log('Post a été trouvé avec succès');
      return result;
    } catch (err) {
      console.log(`Erreur lors de la recherche du post :`, err);
      throw err;
    }
  };
  
  

  





