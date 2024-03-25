import { mapsApiKey, mapId } from "../Keys"
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

    setKey("");

    useEffect (()=> {
        fromAddress(address)
        .then(({ results }) => {
          const {lat, lng} = results[0].geometry.location;
          setPosition({lat,lng})
        })
        .catch(error => console.log(error))
    },[address])

  return (
    <APIProvider apiKey="">
      <div style={{ height: "25rem", width: "25rem" }}>
        <Map zoom={15} center={position} mapId={""}>
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
  );
}
