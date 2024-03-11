import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import UpdateForm from "../UpdateForm"

function Listing ( {listingId, listingDetails, setListingDetails} ) {

    const [isLoading, setLoading] = useState(true); 
    const navigate = useNavigate();

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
    },[listingId, setListingDetails])
    
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
        fetch(`http://localhost:4000/listings/${listingDetails.id}`, {
            method: "DELETE"
        })
        .then(response=>response.json())
        displayDeletePrompt ()
        navigate('/find');
    }

    function displayDeletePrompt () {
        let prompt = document.getElementById("success-delete");
        prompt.classList.remove("hide");
        setTimeout(() => prompt.classList.add("hide"), 5000);
      }

    return (
        <main>
            <h1>Listing details</h1>
            {
                isLoading 
                ? 
                <p>Loading...</p> 
                : 
                <div className="listing" value={listingId}>
                    {/* Check if need value={listingID} expect not */}
                    <h2>{`Located at: ${listingDetails.address}, ${listingDetails.suburb} ${listingDetails.postcode}`}</h2>
                    <h3>{`Last updated: ${listingDetails.dateUpdated} ${listingDetails.timeUpdated}`}</h3>
                    <ul>
                        {listingDetails.items.map((item) => ( 
                                    <li key={item}>{item}</li>
                                ))}
                        { !listingDetails.otherItems ? null : <li>Other items: {listingDetails.otherItems}</li>}           
                    </ul>
                    <a href={`https://www.google.com/maps/place/${listingDetails.address}-${listingDetails.suburb}-${listingDetails.postcode}`}><Button variant="success">Get directions</Button></a>
                    <Button id="update-listing-btn" variant="warning" onClick={showListingUpdateForm}>Update listing</Button>
                    <Button variant="danger" onClick={handleDelete}>Mark as taken</Button>
                    <p id="success-delete" className="hide">Thanks! This has been marked as taken.</p>
                    <div id="listing-upate-form" className="hide">
                        <UpdateForm listingDetails={listingDetails}/>
                    </div>
                </div>
                }
        </main>
    )
}

export default  Listing