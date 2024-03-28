import { useEffect, useState } from "react";
import { Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import image from "./assets/placeholder-image.jpeg"
import { Link } from "react-router-dom"
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


export default function ListingMap () {

    let position = {lat:-33.865143, lng:151.209900}
    const [coordinatesList, setCoordinatesList] = useState([]);

    setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    useEffect(() => {
        setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        fetch("http://localhost:4000/listings")
            .then(res => res.json())
            .then(listings => {
                const promises = listings.map(listing => {
                    let fullAddress = `${listing.address}, ${listing.suburb}, ${listing.postcode}`;
                    return fromAddress(fullAddress)
                        .then(({ results }) => results[0].geometry.location);
                });
                return Promise.all(promises);
            })
            .then(coordinates => {
                setCoordinatesList(coordinates);
            })
            .catch(error => console.log(error));
    }, []);

  return (
    <>
        {
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        ?
        <>
            <Link to="/listings"><Button className="mx-1 my-1 mb-5">See listings</Button></Link>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <OverlayTrigger 
                    placement="top" 
                    overlay={<Tooltip> &#8593; go to listings</Tooltip>}
                    delay={{ show: 250, hide: 400 }}
                    >
                        <div style={{ height: "25rem", width: "70%", margin:"auto" }}>
                            <Map defaultZoom={12} defaultCenter={position} mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}>
                                {
                                    coordinatesList.map ((listing) => {
                                        console.log(listing)
                                        return (
                                            <AdvancedMarker key={listing.lat} position={listing}>
                                                <Pin
                                                background={"grey"}
                                                borderColor={"black"}
                                                glyphColor={"orange"}
                                                />
                                            </AdvancedMarker>
                                        )
                                    }
                                    )
                                }
                        </Map>
                    </div>
                </OverlayTrigger>
            </APIProvider>
        </>
        :
        <Card style={{ width:"18rem" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>
              Sorry, the map is unavailble right now. Please enjoy the view while we get it fixed...
            </Card.Title>
          </Card.Body>
        </Card>
        }
    </>
  );
}
