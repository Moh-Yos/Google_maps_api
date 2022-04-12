import React,{useState} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"

import  parksData from './data/skateboard-parks.json';

import mapStyles from './mapStyles';

import { Polyline} from "react-google-maps"

console.log(parksData[0].features);

// const MyMapComponent = withScriptjs(withGoogleMap((props) =><GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat:45.421532, lng: -75.697189 }}
//   >
//      {props.isMarkerShown && <Marker position={{ lat:45.421532, lng: -75.697189 }} />}
//     {parksData[0].features.map((park)=>(
      
//        <Marker 
//        key={park.properties.PARK_ID}  
//        position={{lat:park.geometry.coordinates[1],lng:park.geometry.coordinates[0]}} 
//        onClick={()=>setSelectedPark(park)}
//        />
//     ))}

//   </GoogleMap>
// ))


export default function App(){
  const [selectedPark,setSelectedPark]=useState(null);

  
  let pathCoordinates=[]
    // { lat:45.421532, lng: -75.697189 },
    // { lat: 45.37540158749613, lng: -75.6259961314857 },
  

  parksData[0].features.map((park)=>{
    console.log(park.geometry.coordinates);
    let obj=
    {
     lat: park.geometry.coordinates[1],
     lng: park.geometry.coordinates[0]
    } 
    pathCoordinates.push(obj)
  })

  console.log(pathCoordinates);

//  for(let i=0;i<parksData[0].features.length;i++){
//    let obj= parksData[0].features[i].geometry.coordinates[1]
//    pathCoordinates.push()
//  }
  

  const MyMapComponent = withScriptjs(withGoogleMap((props) =><GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat:45.421532, lng: -75.697189 }}
    defaultOptions={{styles:mapStyles}}
  >
     {props.isMarkerShown && <Marker position={{ lat:45.421532, lng: -75.697189 }} />}
    {parksData[0].features.map((park)=>(
      
       <Marker 
       key={park.properties.PARK_ID}  
       position={{lat:park.geometry.coordinates[1],lng:park.geometry.coordinates[0]}} 
       onClick={()=>setSelectedPark(park)}
       icon={{
         url:'/favicon.ico',
         scaledSize :new window.google.maps.Size(25,25)

       }}
       />
    ))}


    {selectedPark  && (
      <InfoWindow 
      position={{
        lat:selectedPark.geometry.coordinates[1],
        lng:selectedPark.geometry.coordinates[0]
      }}
      onCloseClick={()=>{
        setSelectedPark(null)
      }}
      >
        <div>
        <h2>{selectedPark.properties.NAME}</h2>
        <p>{selectedPark.properties.DESCRIPTION}</p>
        </div>
      </InfoWindow>
    )}

    <Polyline 
  path={pathCoordinates} 
  options={{ 
  strokeColor: 'blue',
  strokeOpacity: 1,
  strokeWeight: 2,
  icons: [{ 
    icon: "hello",
    offset: '0',
    repeat: '10px'
  }],
}}
/>

  </GoogleMap>
))


  return <div style={{width:'100vw'}}>
   <MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA4_YJ7KVB7lhXcXVxDkM7Bn-xdzpfZVYs"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `800px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
  </div>
}

