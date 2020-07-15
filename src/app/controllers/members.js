const {age, date} = require('../../lib/utils')
const { json } = require('express')

module.exports = {
  index(req, res)  {
    return res.render("members/index")
  },
  show(req, res)  {
    return
  },
  create(req, res)  { 
    return res.render('members/create')
  },
  post(req, res)  {
      //recebendo os dados no servidor

    const keys = Object.keys(req.body)

    for(key of keys){
       if (req.body[key] == ""){
           return res.send('Please, fill all field')
       }
    }   

    

    return
    
  },
  edit(req, res)  {
    return

  },
  put(req, res)  {

    const keys = Object.keys(req.body)

    for(key of keys){
       if (req.body[key] == ""){
           return res.send('Please, fill all field')
       }
    }   

    

    return  
  },
  delete(req, res)  {
      return
  }
}
