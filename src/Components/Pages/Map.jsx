import React, { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";
import "./Map.css"; // CSS for fullscreen styling
import { useLocation, useNavigate } from "react-router-dom";
import { queryBakeries } from "../../services/bakeryServices";
import CustomPopUp from "../UI/map/pin/CustomPopUp";

// Add your Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null) // Store the Mapbox map instance
  const [bakeries, setBakeries] = useState([])
  const [startingLocationView, setStartingLocationView] = useState([-74.006, 40.7128]) //New York
  const [userApproximateLocation, setUserApproximateLocation] = useState([])

  const location = useLocation()
  const navigate = useNavigate()

  // Use URLSearchParams to parse the query string
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("query");

  const loadMap = () => {
    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      // style: import.meta.env.VITE_MAPBOX_CSS, //Nate Maps Design
      center: startingLocationView,
      zoom: 12,
    });
    setMap(initialMap);
    return initialMap
  }

  const getUserLocationViaRequest = async () => {
    try {
      
        // spoof user location base on request
        //https://www.youtube.com/watch?v=UAQogFwyna0 around 15:16 he will explain how
        const response = await fetch("http://ip-api.com/json/")
        
        const data = await response.json()
        
        if(typeof data.lat === 'number' && typeof data.lon === "number")
          setUserApproximateLocation([data.lon, data.lat])
          return [data.lon, data.lat]

    } catch (error) {
      return startingLocationView
    }
  }

  //3. fetch the route from mapbox via api key
  const fetchRoute = async (start, end) => {
    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates;
      } else {
        throw new Error("No routes found");

        
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      alert('Sorry No Routes Found')
      return null;
    }
  };

  //2. second write the drawRoute Function
  const drawRoute = (map, coordinates) => {
    // Remove existing route layers and sources if they exist
    if (map.getSource("route")) {
      map.removeLayer("route-outline");
      map.removeLayer("route");
      map.removeSource("route");
    }


    

    // Add a new GeoJSON source for the route
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      },
    });
  
    // Add a route outline layer for better visibility
    map.addLayer({
      id: "route-outline",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#ab9d8e",
        "line-width": 10,
        "line-opacity": 1,
        "line-dasharray": [2, 4]
      },
    });
  
    // Add the main route layer
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#ab9d8e",
        "line-width": 6,
        "line-opacity": 0.9,
      },
    });
  
    // Adjust the map's bounds to fit the route
    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );
    map.fitBounds(bounds, { padding: 100 });
  };

  //1.first is plot the route
  const handlePlotRoute = async(userApproximateLocation, bakeryLocation) => {
    console.log('i was cliked') //test if i call it correctly

    
    if (!map) return;

    const start = userApproximateLocation //array of long lat this is the user locaton
    const end = bakeryLocation //array of long and lat this is the bakery location

    const routeCoordinates = await fetchRoute(start, end);
    if (routeCoordinates) {
      drawRoute(map, routeCoordinates);
    }
  }

  useEffect(() => {
    // Initialize the map
    const mapInstance = loadMap()

    // Clean up on component unmount
    return () => mapInstance.remove();
  }, []);

  

  useEffect(() => {
    if (!map) return; // Ensure map is initialized

    // Fetch bakeries and add markers
    const pinBakeriesLocation = async () => {
      const res = await queryBakeries(queryValue);
      setBakeries(res);

      res.forEach((bakery, index) => {
        const { longitude: lng, latitude: lat } = bakery;
        try {
          
          //create a custom marker for bakery
          const bakeryMarker = document.createElement('img');
          bakeryMarker.src = '/location_pin_heart.gif'
          bakeryMarker.style.width = '100px'
          bakeryMarker.style.height = '100px'
          bakeryMarker.style.marginTop = '0.3rem'
          bakeryMarker.style.cursor = 'pointer'

          //Create a popup
          const popupNode = document.createElement('div'); // Create a container for the React component
          const root = createRoot(popupNode); // Initialize React root

          //so we can send it to plot route
          const bakeryLocForRouteHandling = [bakery.longitude, bakery.latitude]

          root.render(<CustomPopUp bakery={bakery} navigate={navigate} handlePlotRoute={ () => handlePlotRoute(userApproximateLocation, bakeryLocForRouteHandling)}/>);
      
          // pin the the bakeries in the map
          new mapboxgl.Marker({ element: bakeryMarker, width: '100px', height: '100px' })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setDOMContent(popupNode))
            .addTo(map);

          // Fly to the location
          map.flyTo({ center: [lng, lat], zoom: 13 });
        } catch (error) {
          console.log('The error is', error);
        }
      });
    };

    const pinApproximateUserLocation = async () => {
      //create a user marker
      const userLocation = document.createElement('img');
      userLocation.src = '/user-pin.svg'
      userLocation.style.width = '30px'
      userLocation.style.height = '30px'
      userLocation.style.cursor = 'pointer'


      const longLat = await getUserLocationViaRequest()

      const lng = longLat[0]
      const lat = longLat[1]
      
      new mapboxgl.Marker( { color: '#745537'} ) //change the color of the user location to the color of doughtabase
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML(
              "<div style={{ width: '100%',display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}> <img src='/blinking.gif' alt='/CZ5s.gif' style={{ width: '100px' }} /> <h6>Your Approximate</h6> <h6>Location</h6></div>"
            ))
            .addTo(map);
    }

    pinApproximateUserLocation()

    pinBakeriesLocation();
  }, [map, queryValue]);

  return (
    <>
      
      <div ref={mapContainerRef} className="map-container" />


      {/* <button
       onClick={() => getUserLocationViaRequest() } //this is just an approximate user location NOT ACURATE
       className="z-1"
       style={{
        position: 'absolute',
        right: '3%',
        top: '10%',
        borderRadius: '100vw'
       }}
      >
        <i className="fa-solid fa-user"></i>
      </button> */}
    </>
  );
};

export default Map;
