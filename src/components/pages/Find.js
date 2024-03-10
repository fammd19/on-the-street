import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListingSummary from '../ListingSummary'
import './pages.css';

function Find ( {setListingId} ) {

    const [listings, setListings] = useState([])

    useEffect( ()=> {
        fetch("http://localhost:4000/listings")
        .then(response=>response.json())
        .then(json => setListings(json))
    },[])


    return (
        <main>
            <a href="./find"><Button variant="success">Find</Button></a>
            <a href="./share"><Button variant="secondary">Share</Button></a>
            <div>
                { !listings
                ? 
                <p>Loading...</p>
                : 
                <div id="listings">{listings.map((listing) => ( 
                        <ListingSummary key={listing.id} listing={listing} setListingId={setListingId}/>
                    ))}
                </div>
                }

            </div>
        </main>
    )
}

export default Find