const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')
const { json } = require('express')

exports.index = function(req, res){
    
    return res.render("members/index", {members: data.members})
}

//show
exports.show = function(req, res){
    //req.params
    const { id } = req.params
    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember) return res.send("Member not found!");



    //formatando os dados antes do envio
    const member = {
        ...foundMember,
        birth: age(foundMember.birth),   
        
    
    }

    return res.render("members/show", {member}) // enviando para página
}

exports.create = function(req,res){ 
   
    return res.render('members/create')
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
    const id = Number(data.members.length + 1);


    //destruturação
    

    data.members.push({
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

        // return res.redirect("/members");
        return res.redirect(`/members/${id}`);
        


    } )
    // return res.send(req.body) ;
}

//edit
exports.edit = function(req, res){
     //req.params
     const { id } = req.params
     const foundMember = data.members.find(function(member){
         return id == member.id 
     })
 
     if(!foundMember) return res.send("Member not found!");
 
     //yyyy-mm-dd
     const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', {member})
};

exports.put = function(req, res){
   
   const { id } = req.body
   let index = 0
   const foundMember = data.members.find(function(member, foundIndex){
       if (id == member.id){
           index = foundIndex
           return true
       } 
   })

   if(!foundMember) return res.send("Member not found!");  

   const member = {
       ...foundMember,
       ...req.body,
       birth: Date.parse(req.body.birth),
       id: Number(req.body.id)
   }

   data.members[index] = member

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
       if(err) return res.send("Writer Error!")
       return res.redirect(`/members/${id}`)
   })
}

exports.delete= function(req, res){
    const {id} = req.body
  
    const filteredMembers = data.members.filter(function(member){ 
        return member.id != id // filtro adiciona todos os itens exceto o valor igual
    })
    
    data.members = filteredMembers
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Writer file Error!")
        return res.redirect(`/members/`)
    })
}