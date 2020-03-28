const express =require('express');
const Mycourses=require('./routes/courses')

const app = express();
app.use(express.json());
app.use('/api/courses',Mycourses);


app.get('/' ,(req,res)=>{
    res.send('Hello world');
});


const port =process.env.port||8000;
 app.listen(port,()=>{console.log("console form port 8000")});