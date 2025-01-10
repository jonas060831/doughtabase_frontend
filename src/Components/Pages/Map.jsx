import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css"; // CSS for fullscreen styling

// Add your Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; 


const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Container ID
      style: import.meta.env.VITE_MAPBOX_CSS, // Style URL
      center: [-74.006, 40.7128], // Starting position [lng, lat]
      zoom: 12, // Starting zoom
    });

    // Clean up on component unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
