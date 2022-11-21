import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import usePlacesAutoComplete from 'use-places-autocomplete'

const containerStyle = {
  width: "400px",
  height: '390px'
};

var center = {
  lat: -3.745,
  lng: -38.523
};

function error() {
  alert('This website displays personalized information based on your location. Since you are not sharing your location, we cannot show you this personalized information. ');
}

function Map(props) {
  const [loc, setLoc] = useState(center);
  const [zoom, setZoom] = useState(11);
  const [foodbanks, setFoodbanks] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA4VTTVpg6hKxqRpxxp__9jr9-1VAsPtNk",
    libraries: ["places"]
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(loc);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  function success(pos) {
    const crd = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    if (crd.lat != loc.lat) { setLoc(crd) }
    setZoom(12);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    try {
      let service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: loc,
        name: ['Food Bank'],
        rankBy: window.google.maps.places.RankBy.DISTANCE
      }, nearbySearchCallback)
    }
    catch (err) {
      //not loaded map
    }
  }, [loc])

  function nearbySearchCallback(results, status) {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      setFoodbanks(results);
    }
  }

  return isLoaded ? (
    <div>
      <h2 className="map-h2">Find A Food Bank Near You:</h2>

      <div className="inner">
        <Search />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={loc}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <tbody>
            {
              foodbanks !== null ? foodbanks.map((x) => {
                return <Marker position={x.geometry.location} label={x.name}/>
              }) : 0
            }
          </tbody>
        </GoogleMap>
      </div>
    </div>
  ) : <></>
}

export default Map;

function Search() {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 1, lng: () => 1 },
      radius: 10000
    }
  })
}