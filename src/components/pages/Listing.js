import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Listing ( {listingId, listingDetails, setListingDetails} ) {

    const [isLoading, setLoading] = useState(true); 

    useEffect( ()=> {       
        if (listingId) {
            fetch(`http://localhost:4000/listings/${listingId}`)
            .then(response => response.json())
            .then(json => setListingDetails(json))
            .then(setLoading(false));
            fetch("http://localhost:4000/prevId/0", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ prevId: listingId })
            }); 
        }
        else {
            fetch("http://localhost:4000/prevId/0")
            .then(response => response.json())
            .then(json => fetch(`http://localhost:4000/listings/${json.prevId}`)
            .then(response => response.json())
            .then(json => setListingDetails(json))
            .then(setLoading(false)))
        }
    },[listingDetails.currentListing])
    

    return (
        <main>
            <h1>Listing details</h1>
            {
                isLoading 
                ? 
                <p>Loading...</p> 
                : 
                <div className="listing" value={listingId}>
                    <h3>{`Last updated: ${listingDetails.dateUpdated} ${listingDetails.timeUpdated}`}</h3>
                    {/* <ul>
                        {listingDetails.items.map((item) => ( 
                                    <li key={item}>{item}</li>
                                ))}
                        { !listingDetails.otherItems ? null : <li>Other items: {listingDetails.otherItems}</li>}           
                    </ul> */}
                    <Button variant="warning">Update listing</Button>
                </div>
                }
        </main>
    )
}

export default  Listing