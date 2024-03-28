import { useEffect, useState } from "react";
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

    // useEffect (()=> {
    //     fetch("http://localhost:4000/listings")
    //     .then(res => res.json())
    //     .then(listings => listings.map(listing => {
    //         let fullAddress = `${listing.address}, ${listing.suburb}, ${listing.postcode}`
    //         fromAddress(fullAddress)
    //         .then(({ results }) => {
    //             coordinatesList.push(results[0].geometry.location)
    //             setCoordinatesList(coordinatesList)
    //         })
    //     }))
    //     .catch(error => console.log(error))
    // },[setCoordinatesList])

  return (
    <>
        {
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        ?
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <OverlayTrigger 
                placement="top" 
                overlay={<Tooltip> Click to go to listings</Tooltip>}
                >
            <div style={{ height: "25rem", width: "25rem" }}>
                
                    <Link to="/listings">
                        <Map zoom={10} center={position} mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}>
                            {
                                coordinatesList.map ((listing) => {
                                    console.log(listing)
                                    return (
                                        <AdvancedMarker position={listing}>
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
                    </Link>
                
            </div>
            </OverlayTrigger>
        </APIProvider>
        :
        <Card style={{ width:"18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/100" />
          <Card.Body>
            <Card.Title>
              Sorry, the map is unavailble right now. Please enjoy this picture instead while we get it fixed...
            </Card.Title>
          </Card.Body>
        </Card>
        }
    </>
  );
}
