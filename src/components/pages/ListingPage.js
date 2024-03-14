import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
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
                <main className="mx-5">
                    <h1>Listing details</h1>
                    <div className="listing" value={listing.id}>
                        {/* Check if need value={listingID} expect not */}
                        <h2>{`Located at: ${listing.address}, ${listing.suburb} ${listing.postcode}`}</h2>
                        <h3>
                            {
                                listing.dateUpdated && listing.timeUpdated
                                ?
                                `Last updated: ${listing.dateUpdated} ${listing.timeUpdated}`
                                :
                                `Last updated: ${listing.date} ${listing.time}`
                            }
                        </h3>
                        {
                            listing.items.length > 0
                             ?
                            <ul>
                                {listing.items.map((item) => ( 
                                                <li key={item}>{item}</li>
                                        ))}
                                { !listing.otherItems ? null : <li>Other items: {listing.otherItems}</li>}           
                            </ul>
                            :
                            <div>
                                { !listing.otherItems ? null : <p>Other items: {listing.otherItems}</p>} 
                            </div>
                        }
                        <div>
                            <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/place/${listing.address}-${listing.suburb}-${listing.postcode}`}><Button className="mx-1" variant="success">Get directions</Button></a>
                            <Button className="mx-1" id="update-listing-btn" variant="warning" onClick={showListingUpdateForm}>Update listing</Button>
                            <Button className="mx-1" variant="danger" onClick={handleDelete}>Mark as taken</Button>
                        </div>
                        <Alert variant="danger" id="success-delete" className="hide">Thanks! This has been marked as taken.</Alert>
                        <div id="listing-upate-form" className="hide">
                            <UpdateForm listing={listing} />
                        </div>
                    </div>
            </main>
                :
                null
            }
        </>
    )
}