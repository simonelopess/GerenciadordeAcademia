const {age, date} = require('../../lib/utils')
const { json } = require('express')

const Instructor = require('../model/Instructor')


module.exports = {
  index(req, res)  {
    let {filter, page, limit} = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter, 
      page, 
      limit,
      offset,
      callback(instructors){
        return res.render('instructors/index', {instructors,filter})
      }
    }
    Instructor.paginate(params)
   

    // if(filter){
    //   Instructor.findBy(filter, function(instructors){
    //     return res.render('instructors/index', {instructors,filter})
    //   })
    // } else{
    //   Instructor.all(function(instructors){
    //     return res.render('instructors/index', {instructors})
    // })
    // }
    
    
  },
  show(req, res)  {
    Instructor.find(req.params.id, function(instructor){
        if(!instructor) return res.send("Instructor not found")
        instructor.birth = age(instructor.birth)
        instructor.services = instructor.services.split(",")

        instructor.created_at = date(instructor.created_at).format

        return res.render("instructors/show", {instructor})
    })
  },
  create(req, res)  { 
    return res.render('instructors/create')
  },
  post(req, res)  {
      //recebendo os dados no servidor

    const keys = Object.keys(req.body)

    for(key of keys){
       if (req.body[key] == ""){
           return res.send('Please, fill all field')
       }
    }   

    // let {avatar_url, birth, name, services, gender} = req.body;

    Instructor.create(req.body, function(instructor){
        return res.redirect(`/instructors/${instructor.id}`)
    })
  },
  edit(req, res)  {
    Instructor.find(req.params.id, function(instructor){
        if(!instructor) return res.send("Instructor not found")
        instructor.birth = date(instructor.birth).iso
        
        return res.render("instructors/edit", {instructor})
    })

  },
  put(req, res)  {

    const keys = Object.keys(req.body)

    for(key of keys){
       if (req.body[key] == ""){
           return res.send('Please, fill all field')
       }
    }   

    Instructor.update(req.body, function(){
        return res.redirect(`/instructors/${req.body.id}`)
    })
    
  },
  delete(req, res)  {
    
    Instructor.delete(req.body.id, function(){
        return res.redirect(`/instructors`)
    })
    
  }
}
