const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')

//show
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

//createe
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

//edit
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