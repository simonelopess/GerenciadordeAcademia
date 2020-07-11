const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')
const { json } = require('express')

exports.index = function(req, res){
    
    return res.render("instructors/index", {instructors: data.instructors})
}


exports.show = function(req, res){
    //req.params
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor) return res.send("Instructor not found!");



    //formatando os dados antes do envio
    const instructor = {
        ...foundInstructor,
        birth: age(foundInstructor.birth),   
        gender:"",
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", {instructor}) // enviando para página
}

exports.create = function(req,res){ 
   
    return res.render('instructors/create')
}

exports.post = function(req, res){
    //recebendo os dados no servidor

    const keys = Object.keys(req.body)

    for(key of keys){
       if (req.body[key] == ""){
           return res.send('Please, fill all field')
       }
    }   

    let {avatar_url, birth, name, services, gender} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now(); 
    const id = Number(data.instructors.length + 1);


    //destruturação
    

    data.instructors.push({
        id,
        avatar_url,
        name, 
        birth, 
        gender,
        services,
        created_at,                 
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error");

        // return res.redirect("/instructors");
        return res.redirect(`/instructors/${id}`);
        


    } )
    // return res.send(req.body) ;
}

exports.edit = function(req, res){
     //req.params
     const { id } = req.params
     const foundInstructor = data.instructors.find(function(instructor){
         return id == instructor.id 
     })
 
     if(!foundInstructor) return res.send("Instructor not found!");
 
     //yyyy-mm-dd
     const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', {instructor})
};

exports.put = function(req, res){
   
   const { id } = req.body
   let index = 0
   const foundInstructor = data.instructors.find(function(instructor, foundIndex){
       if (id == instructor.id){
           index = foundIndex
           return true
       } 
   })

   if(!foundInstructor) return res.send("Instructor not found!");  

   const instructor = {
       ...foundInstructor,
       ...req.body,
       birth: Date.parse(req.body.birth),
       id: Number(req.body.id)
   }

   data.instructors[index] = instructor

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
       if(err) return res.send("Writer Error!")
       return res.redirect(`/instructors/${id}`)
   })
}

exports.delete= function(req, res){
    const {id} = req.body
  
    const filteredInstructors = data.instructors.filter(function(instructor){ 
        return instructor.id != id // filtro adiciona todos os itens exceto o valor igual
    })
    
    data.instructors = filteredInstructors
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Writer file Error!")
        return res.redirect(`/instructors/`)
    })
}