import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import UpdateForm from "../UpdateForm"

export default function ListingPage () {
    const {id} = useParams();
    const [listing, setListing] = useState (null)

    const navigate = useNavigate();

    useEffect ( () => {
        fetch("http://localhost:4000/listings/"+id)
        .then(res => res.json())
        .then(json => setListing(json))
    }, [])

    
    function showListingUpdateForm () {
        const formDiv = document.getElementById("listing-upate-form");
        const showBtn = document.getElementById("update-listing-btn")
        if (formDiv.classList.contains("hide")) {
            formDiv.classList.remove("hide") 
            showBtn.textContent="Cancel update"
        } else {
            formDiv.classList.add("hide")
            showBtn.textContent="Update listing"   
        }
        console.log("Show/hide button")
    }
    

    
    function handleDelete () {
        fetch(`http://localhost:4000/listings/${listing.id}`, {
            method: "DELETE"
        })
        .then(response=>response.json())
        navigate('/listings');
    }
    

    return (
        <>
            {
                listing
                ?
                <main>
                <h1>Listing details</h1>
                    <div className="listing" value={listing.id}>
                        {/* Check if need value={listingID} expect not */}
                        <h2>{`Located at: ${listing.address}, ${listing.suburb} ${listing.postcode}`}</h2>
                        <h3>{`Last updated: ${listing.dateUpdated} ${listing.timeUpdated}`}</h3>
                        <ul>
                            {listing.items.map((item) => ( 
                                        <li key={item}>{item}</li>
                                    ))}
                            { !listing.otherItems ? null : <li>Other items: {listing.otherItems}</li>}           
                        </ul>
                        <a href={`https://www.google.com/maps/place/${listing.address}-${listing.suburb}-${listing.postcode}`}><Button variant="success">Get directions</Button></a>
                        <Button id="update-listing-btn" variant="warning" onClick={showListingUpdateForm}>Update listing</Button>
                        <Button variant="danger" onClick={handleDelete}>Mark as taken</Button>
                        <p id="success-delete" className="hide">Thanks! This has been marked as taken.</p>
                        <div id="listing-upate-form" className="hide">
                            <UpdateForm listingDetails={listing}/>
                        </div>
                    </div>
            </main>
                :
                null
            }
        </>
    )
}