const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')


publicDirectoryPath=path.join(__dirname,'../public')
viewPath=path.join(__dirname,'../templates/views')
partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'home page',
        name:'mohamed saad-eldeen'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'mohamed saad-eldeen'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help Page',
        message:'for help visit this link',
        name:'mohamed saad'
    })
})

app.get('/weather',(req,res)=>{
    let address=req.query.address
    geoCode(address,(error,body)=>{
        if(error){
            return res.send({error: error})
        }else{
            forecast(body.lat,body.long,(error,data)=>{
                if(error){
                    console.log(error);
                    return res.send({error})
                }
                res.send({
                    forecast: data ,
                    location:' and the location is '+body.location,
                    adress:address})
            })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'the help articale is not found back to help',
        name:'mohamed saad'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page Not Found!',
        name:'mohamed saad'
    })
})

app.listen(3000,()=>{
    console.log('server is running...');
})