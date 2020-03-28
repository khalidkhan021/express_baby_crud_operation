const express=require('express');

const router=express.Router(); 

const Joi=require('joi');

const courses=[
    {id:1,name:'new course1'},
    {id:2,name:'new course1'},
    {id:3,name:'new course1'},
]

router.get('/',(req,res)=>{
    res.send(courses)
})
// routes.get('//:years/:month', (req,res) =>{
//     // console.log("Request***",process.env.port)
//     res.send(req.params)
// })

router.get('/:id',(req,res)=>{
    const courser= courses.find(c=>c.id===parseInt(req.params.id))
    if(!courser){
        res.status(404).send('Course Not Found')
    } 
    res.send(courser);
})

router.post('/', (req,res)=>{

    const schema={
        name: Joi.string().min(3).required()
    };
    const {error}=validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const course={
        id: courses.length+1,
        name: req.body.name
    }
   
    courses.push(course);
    res.send(course)
})


router.put('/', (req,res)=>{
    const courser= courses.find(c=>c.id===parseInt(req.body.id))
    const {error}=validateCourse(req.body)

    if(!courser){
        res.status(404).send('Course Not Found')
        return;
    } 
    
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    courser.name=req.body.name
    res.send(courser);
})
router.delete('/', (req, res) => {
    const courser= courses.find(c=>c.id===parseInt(req.body.id))
    const {error}=DeleteCourse(req.body)
    if(!courser){
        res.status(404).send('Course Not Found')
        return;
    } 
        
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const index=courses.indexOf(courser)
    courses.splice(index,1)
    res.send(courses)
        
});

function validateCourse (x) {
    const schema={
        name: Joi.string().min(3).required(),
        id:Joi.string().required(),
    };
    return Joi.validate(x,schema)
 }
 function DeleteCourse (x) {
    const schema={
        id:Joi.string().required(),
    };
    return Joi.validate(x,schema)
 }

module.exports=router