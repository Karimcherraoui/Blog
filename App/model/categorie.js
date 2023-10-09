const con = require('../db')


exports.addCategorie = async (name)=>{

    const query = 'INSERT INTO categorie (name) VALUES (?)'

    con.query(query,name,(err,res)=>{

        if (err) {
            console.log(`Erreur lors de l'insertion du categorie :`, err);
          } else {
            console.log('Categorie inséré avec succès');
          }

    })

}

exports.getAllCategories = async ()=>{
    const [result] = await con.query('SELECT * FROM categorie')
    return result
}

exports.updateCategorie = async (name,id) => {
    let query = 'UPDATE categorie SET name = ? WHERE categorieID = ?'

    con.query(query,[name,id],(err,res)=>{
        if (err) {
            console.log(`Erreur lors de la modification du categorie :`, err);
          } else {
            console.log('categorie est modifier avec succès');
          }
    })
}


exports.deleteCategorie = async (id)=>{

    const query = 'DELETE FROM categorie WHERE categorieID = ? ';
    con.query(query,id,(err,results)=>{
      if (err) {
        console.log(`Erreur lors de suppression du categorie :`, err);
      } else {
        console.log('Categorie est supprimer avec succès');
      }
    })
}