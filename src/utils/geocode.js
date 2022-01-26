const request=require('request')


const geocode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibW9oYW1lZC1zYWFkIiwiYSI6ImNreGozOXV1aDAybTMycG9iM3I5czk0ZjYifQ.S5jJS5MKB9vdy0VI7VoeMg'

    request({url,json:true},(error,res)=>{
        if(error){
            callback("please check your internet connection!",undefined)
        }
        else if(res.body.features.length === 0){
            callback("please enter valid place!",undefined)
        }
        else{
           let lat=res.body.features[0].center[1]
           let long=res.body.features[0].center[0]
           let location= res.body.features[0].place_name 
           callback(undefined,{lat,long,location})  
        }
        
    })
}


module.exports=geocode