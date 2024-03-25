import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import {
    setKey,
    fromAddress,
  } from "react-geocode";


export default function ListingMap ({address}) {

    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const [open, setOpen] = useState(false);

    setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    useEffect (()=> {
        fromAddress(address)
        .then(({ results }) => {
          const {lat, lng} = results[0].geometry.location;
          setPosition({lat,lng})
        })
        .catch(error => console.log(error))
    },[address])

  return (
    <>
        {
        address
        ?
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "25rem", width: "25rem" }}>
            <Map zoom={15} center={position} mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                <Pin
                background={"grey"}
                borderColor={"black"}
                glyphColor={"orange"}
                />
            </AdvancedMarker>
            {open && (
                <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p>{address}</p>
                </InfoWindow>
            )}
            </Map>
        </div>
        </APIProvider>
        :
        <h3>Map unavailable</h3>
        }
    </>
  );
}
