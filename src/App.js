import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

var stAdd = 0;
var clicked = false;
var platform = new H.service.Platform({
  apikey: 'hrkLOsAw9wOcsK9J9e8vuBvK7fraOL8ZiYfwWAwlDsY'
});
var defaultLayers = platform.createDefaultLayers();

function App() {

  const [kraj, setKraj] = useState('');

  const [showLocations, setShowLocations] = useState([]);

function refresh() {
  window.location.reload(false); 

}

function add()
{
 
  if(stAdd === 0)
  {
    var st =document.getElementById("inpuText").value ;
    var re = st.split(", ");
    
  document.getElementById("k1").innerHTML =  "From: " + re[0] ;
  document.getElementById("l1").innerHTML =  re[2] ;
  document.getElementById("lo1").innerHTML =  re[3] ;
  stAdd++;  
  }
  else if(stAdd === 1)
  {
  
     st =document.getElementById("inpuText").value ;
     re = st.split(", ");
    console.log(re[1]);
    
  document.getElementById("k2").innerHTML = "To: " + re[0] ;
  document.getElementById("l2").innerHTML =  re[2] ;
  document.getElementById("lo2").innerHTML =  re[3] ;

  document.getElementById("img").style.display = "block";
  document.getElementById("button-send").style.display = "block";

  stAdd++;
  }
}

  
  const sendFunction = function(){
    axios({
      "method":"POST",
      "url":"http://localhost:4000",
      "headers":{
        "content-type":"application/api",
      },
      "params": {
       
        "lat1":document.getElementById("l1").innerHTML,
        "lon1": document.getElementById("lo1").innerHTML,
        "lat2":document.getElementById("l2").innerHTML,
        "lon2": document.getElementById("lo2").innerHTML
      }
      })
      .then((response)=>{
        
        if(response.data.data === "Error"){
          document.getElementById("lat").innerHTML =  "ERROR";
        } 
        else
        {
          document.getElementById("map").style.display = "block";
          document.getElementById("btn-refresh").style.display = "block";
          document.getElementById("btn-add").style.display = "none";
          document.getElementById("tempImg1").style.display = "inline";
          document.getElementById("tempImg2").style.display = "inline";
          document.getElementById("tempImg3").style.display = "inline";
          document.getElementById("tempImg4").style.display = "inline";

          var map = new H.Map(document.getElementById('map'),
          defaultLayers.vector.normal.map,{
          center: {lat:50, lng:5},
          zoom: 4,
          pixelRatio: window.devicePixelRatio || 1
        });

        window.addEventListener('resize', () => map.getViewPort().resize());

        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        var ui = H.ui.UI.createDefault(map, defaultLayers);
      
            var parisMarker = new H.map.Marker({lat:response.data.wearesult[0].lat, lng:response.data.wearesult[0].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[1].lat, lng:response.data.wearesult[1].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[2].lat, lng:response.data.wearesult[2].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[3].lat, lng:response.data.wearesult[3].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[4].lat, lng:response.data.wearesult[4].lon});
            map.addObject(parisMarker);

          document.getElementById('temp').setAttribute('data-tip', "X: " + response.data.wearesult[0].lat + ", Y: " + response.data.wearesult[0].lon);
          document.getElementById("temp").innerHTML =  "1. stop: " + response.data.wearesult[0].temp + "°C";
          
          document.getElementById('temp2').setAttribute('data-tip', "X: " + response.data.wearesult[1].lat + ", Y: " + response.data.wearesult[1].lon);
          document.getElementById("temp2").innerHTML =  "2. stop: " + response.data.wearesult[1].temp + "°C";

          document.getElementById('temp3').setAttribute('data-tip', "X: " + response.data.wearesult[2].lat + ", Y: " + response.data.wearesult[2].lon);
          document.getElementById("temp3").innerHTML =  "3. stop: " + response.data.wearesult[2].temp + "°C";

          document.getElementById('temp4').setAttribute('data-tip', "X: " + response.data.wearesult[3].lat + ", Y: " + response.data.wearesult[3].lon);
          document.getElementById("temp4").innerHTML =  "4. stop: " + response.data.wearesult[3].temp + "°C";

          document.getElementById('temp5').setAttribute('data-tip', "X: " + response.data.wearesult[4].lat + ", Y: " + response.data.wearesult[4].lon);
          document.getElementById("temp5").innerHTML =  "5. stop: " + response.data.wearesult[4].temp + "°C";
          
          
        setShowLocations(response.data.data);

      }
      })
      .catch((error)=>{
        console.log(error)
    })
  }

  var unirest = require("unirest");

  var req = unirest("GET", "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php");
  
  req.query({
    "location": kraj
  });
  
  req.headers({
    "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
    "x-rapidapi-key": "8ff52ea582msh5e8ce0a5497a535p1602eajsn83adbd057b2f"
  });
  
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
  console.log(res.body);
   
    if (res.body.Results === undefined ) {
      
 }
 else{
   if(res.body.Results[5] === undefined)
   {

   }
   else
   {
    document.getElementById("txt1").value = res.body.Results[0].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt2").value = res.body.Results[1].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt3").value = res.body.Results[2].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt4").value = res.body.Results[3].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt5").value = res.body.Results[4].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
   }
}
    
  });
 
  return (
    
    <div className="App">
      
      <div >
      <h1 className="text-center"> GolobMaps </h1><br/><br/>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Destination</span>
          </div>
          <input onChange={(e) => setKraj(e.target.value)} list="browsers" name="browser" id="inpuText" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
            <datalist id="browsers">
              <option  id="txt1" value=" "/>
              <option  id="txt2" value=" "/>
              <option  id="txt3" value=" "/>
              <option id="txt4" value=" "/>
              <option  id="txt5" value=" "/>
            </datalist>
            <div className="input-group-append" id="btn-add">
              <button onClick={add} className="btn" type="button" id="button-addon2">Add</button>
            </div>
            <div className="input-group-append" id="btn-refresh">
              <button onClick={refresh} className="btn" type="button" id="button-addon2">Refresh</button>
            </div>
        </div>
      
      <br/>
     
      </div>
     <div id="blabla">

     </div>
     <div id="blabla2">

     </div>
  <div id="fromTo">
      <p id="k1"></p>
      <p id="l1"></p>
      <p id="lo1"></p>
      <img src={require('./assets/arrow.png')} id="img" />
      <p id="k2"></p>
      <p id="l2"></p>
      <p id="lo2"></p>
  </div>
  <div>
      <button onClick={sendFunction} className="btn btn-primary" type="button" id="button-send">Send</button>
  </div>
  <br /><br />
<span id="stops">
  <span id="temp" data-tip=""></span> <img id="tempImg1" src={require('./assets/arrow-right.png')} className="arrow-right" />
  <span id="temp2" data-tip=""></span> <img id="tempImg2" src={require('./assets/arrow-right.png')} className="arrow-right" />
  <span id="temp3" data-tip=""></span> <img id="tempImg3" src={require('./assets/arrow-right.png')} className="arrow-right" />
  <span id="temp4" data-tip=""></span> <img id="tempImg4" src={require('./assets/arrow-right.png')} className="arrow-right" />
  <span id="temp5" data-tip=""></span>
  <ReactTooltip />
</span>
<br/><br/><br/>
<div id="map"></div>
<br/><br/><br/>
    </div>
  );
}



export default App;
