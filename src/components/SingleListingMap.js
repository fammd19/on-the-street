import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
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
          console.log(position)
        })
        .catch(error => console.log(error))
    },[address])

  return (
    <>
        {
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
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
        <Card style={{ width:"18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/100" />
          <Card.Body>
            <Card.Title>
              Sorry, map unavailble for this listing.  Please enjoy this picture instead while we get it fixed...
            </Card.Title>
          </Card.Body>
        </Card>
        }
    </>
  );
}
