const express = require('express');
var axios = require('axios');
var cors = require('cors');
const app = express();
const port = 4000;


app.set('view engine', 'html');
app.use(cors());

app.post('/', function(req, res){
  var weather = [];
  var wearesult= [];
  var lat = [];
  var lon = [];

  lat.push(req.query.lat1);
  lat.push(req.query.lat2);
  lon.push(req.query.lon1);
  lon.push(req.query.lon2);

  
  axios('https://route.ls.hereapi.com/routing/7.2/calculateroute.json?' + 
  'apiKey=' + 'hereapiKeyHere&'  + 
  'waypoint0=geo!' + lat[0] + ',' + lon[0] + '&' + 
  'waypoint1=geo!' + lat[1] + ',' + lon[1] + '&mode=fastest;pedestrian;traffic:disabled')

  .then((response)=>{
  var way = response.data.response.route[0].leg[0].maneuver;
var a=0;
  
  way.forEach(element => {
    axios('https://api.openweathermap.org/data/2.5/weather?lat=' + element.position.latitude + '&lon=' + element.position.longitude + '&units=metric&appid=' + 'weatherApiKeyHere')
    .then((response)=>{

      weather.push({lat: element.position.latitude, lon: element.position.longitude, temp: response.data.main.temp});
      console.log("lat:", element.position.latitude, "lon:", element.position.longitude, "temp:", response.data.main.temp);
      console.log("--------------------------------------------------------");
      a++;
      var long = way.length;
      if(long-a == 0)
      {
        var dis = way.length/5; 
        var st = 0;
        for(var k=0; k<5; k++)
        {
              var max = weather[st].temp;
              var maxobj = st;
              
              for(var j = 0; j<dis-1; j++)
              {                
                if(max < weather[st].temp)
                {
                  max = weather[st].temp;
                  maxobj = st;
                }
                st++;
              }
              wearesult [k] = weather[maxobj];
       }
   
      console.log(wearesult);
      console.log("--------------------------------------------------------");
      res.send({ wearesult});
      }
    

    })
    .catch((error)=>{
  console.log(error)
  res.send({data: "Error"});
})


  })
 

})
.catch((error)=>{
  console.log(error)
  res.send({data: "Error"});
})

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))



