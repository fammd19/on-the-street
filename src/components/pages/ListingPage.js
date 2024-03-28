import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate, Link } from 'react-router-dom';
import { Button, Alert, Col, Row } from 'react-bootstrap';
import UpdateForm from "../UpdateForm"
import SingleListingMap from "../SingleListingMap"
import icon from "../assets/success-icon.svg"

export default function ListingPage ( { formData, setFormData } ) {
    const {id} = useParams();
    const [listing, setListing] = useState (null)
    let address = `${formData.address}, ${formData.suburb}, ${formData.postcode}`

    const navigate = useNavigate();

    useEffect ( () => {
        fetch("http://localhost:4000/listings/"+id)
        .then(res => res.json())
        .then(json => setListing(json))
    }, [id])
    
    function displayListingUpdateForm () {
        const formDiv = document.getElementById("listing-upate-form");
        const showBtn = document.getElementById("update-listing-btn")
        if (formDiv.classList.contains("hide")) {
            formDiv.classList.remove("hide") 
            showBtn.textContent="Cancel update"
        } else {
            formDiv.classList.add("hide")
            showBtn.textContent="Update listing"   
        }
    }

    function displayPrompt (id) {
        let prompt = document.getElementById(id);
        prompt.classList.remove("hide");
        setTimeout(() => prompt.classList.add("hide"), 5000);
      }
    
    function handleDelete () {
        fetch(`http://localhost:4000/listings/${listing.id}`, {
            method: "DELETE"
        })
        .then(response=>response.json())
        displayPrompt("success-delete")
        navigate('/listings');
    }
    

    return (
        <>
            <div className="mx-5 my-5">
                <Link className="ml-3" to="/listings"><Button variant="secondary">Back to listings</Button></Link>
                <Link className="mx-3" to="/share"><Button variant="secondary">Add a listing</Button></Link>
            </div>
            {
                listing
                ?  
                <Row className="mx-5">
                    <Col sm={12} md={10} lg={8}>
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
                            <ul>
                                { !listing.clothing ? null : <li>Clothing: {listing.clothing}</li>} 
                                { !listing.electricals ? null : <li>Electricals: {listing.electricals}</li>}  
                                { !listing.furniture ? null : <li>Furniture: {listing.furniture}</li>}   
                                { !listing.garden ? null : <li>Garden tools & accessories: {listing.garden}</li>} 
                                { !listing.kids ? null : <li>Kids toys & accessories: {listing.kids}</li>}  
                                { !listing.kitchenware ? null : <li>Kitchenware: {listing.kitchenware}</li>}  
                                { !listing.sports ? null : <li>Sports & hobbies: {listing.sports}</li>}  
                                { !listing.otherItems ? null : <li>Other items: {listing.otherItems}</li>}           
                            </ul>
                        }
                        <div>
                            <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/place/${listing.address}-${listing.suburb}-${listing.postcode}`}><Button className="mx-1 my-1" variant="success">Get directions</Button></a>
                            <Button className="mx-1 my-1" id="update-listing-btn" variant="warning" onClick={displayListingUpdateForm}>Update listing</Button>
                            <Button className="mx-1 my-1" variant="danger" onClick={handleDelete}>Mark as taken</Button>
                        </div>
                        <Alert variant="danger" id="success-delete" className="hide"><img alt="Success icon" src={icon} className="icon"/>Thanks! This has been marked as taken.</Alert>
                        <Alert variant="success" id="success-prompt" className="hide my-2"><img alt="Success icon" src={icon} className="icon"/>Listing updated successfully</Alert>
                        <div id="listing-upate-form" className="hide">
                            <UpdateForm 
                                listing={listing} setListing={setListing} displayListingUpdateForm={displayListingUpdateForm} displayPrompt={displayPrompt}
                                formData={formData} setFormData={setFormData}
                            />
                        </div>
                    </div>
                    
                    </Col>
                    <Col sm={8} md={6} lg={4}>
                        <SingleListingMap address={address} />  
                    </Col>
                </Row>
                :
                null
            }
        </>
    )
}