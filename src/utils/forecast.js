const request=require('request')

const forecast= (lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=ecc1aecfd9e30cffa7024eae2956e26e&query='+lat+','+long
    request({url,json:true},(error,res)=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(res.body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,'the weather today is '+res.body.current.weather_descriptions+" , temprature is "+res.body.current.feelslike+" degree")
        }
    })

}

module.exports=forecast
