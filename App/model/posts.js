const con = require('../db')




exports.addPost = (title,content,picture,publishingDate)=>{

    
    const query = 'INSERT INTO post (title,content,image,datePublication) VALUES (?,?,?,?)'
    const values = [title,content,picture,publishingDate];

    con.query(query,values,(err,results)=>{
        if (err) {
            console.error(`Erreur lors de l'insertion du post :`, err);
          } else {
            console.log('Post inséré avec succès');
          }
    })


}
