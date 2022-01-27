const { promiseImpl, resolveInclude } = require('ejs');
const express = require('express') ;
const app = express();
const request = require( 'request');
const port = 5400;

const URL = "http://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=7664925c189cef0345ad8d8345f951c3"

//static file path
 app.use(express.static(__dirname+'/public'));
  //html or render path
  app.set('views','./src/views');
  //view engine specification
  app.set('view engine','ejs')

function getWeather(){
    var option={
        url:URL,
        header:{
            'User-Agent':'request'
        }
    }
    return new Promise(function(resolve,reject){
        request.get(option,function(err,resp,body){
            if(err){
                reject(err)
            }
            else{
                resolve(body)
            }
        })
    })
}
//weather api Route
app.get("/weather",(req,res)=>{
    var dataPromise=getWeather();
//get user details after that get follower from URL
    dataPromise.then(JSON.parse).then(function(result){
        res.render('main',{result,title:'***Weather App***'})
    })
})

app.get('/' ,(req,res) =>{
    request(URL,(err,response,body)=>{
        if(err){
            console.log(err);
        }
        else{
            const output= JSON.parse(body);
            res.send(output);
        }
    })
})

app.listen(port ,(err) => {
if(err) { console. Log( "error in api call")}
else {console.log ('App is running on port' +port)}
})