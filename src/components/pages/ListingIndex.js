import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Container } from 'react-bootstrap';
import Filter from "../Filter";

export default function ListingIndex () {
    const [listings, setListings] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("")

    useEffect ( () => {
        fetch("http://localhost:4000/listings")
        .then(res => res.json())
        .then(json => setListings(json))
        .catch(error => console.log(error.message))
    },[])

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
      }

    const listingsToDisplay = listings
    .filter(
      (listing) => selectedCategory === "" || listing.selectedCategory !== "" 
    )
    .filter((listing) => (listing.suburb.toLowerCase().includes(search.toLowerCase())||listing.postcode.includes(search.toLowerCase())));

    return (
        <Container className="mx-4">
            <div className="mx-2 mt-2 mb-4">
                <Link className="ml-3" to="/listings"><Button variant="success">Current listings</Button></Link>
                <Link className="mx-3" to="/share"><Button variant="secondary">Add a listing</Button></Link>
            </div>
            {
                listings.length>0
                ?
                <>
                <Filter
                search={search}
                onSearchChange={setSearch}
                onCategoryChange={handleCategoryChange}
                />
                <div className="listing">
                    {
                    listings.map ((listing) => 
                        { return (
                        <Card  className="my-3" key={listing.id}>
                            <Card.Body>
                                <Card.Title>{`${listing.suburb} ${listing.postcode}`}</Card.Title>
                                <Card.Subtitle className="text-muted">{`Last updated: ${listing.dateUpdated} ${listing.timeUpdated}`}</Card.Subtitle>
                                <Card.Text className="mt-2">
                                    <ul>
                                        { !listing.electricals ? null : <li>Electricals</li>} 
                                        { !listing.furniture ? null : <li>Furniture</li>} 
                                        { !listing.kitchenware ? null : <li>Kitchenware</li>} 
                                        { !listing.otherItems ? null : <li>Other items</li>}           
                                    </ul>
                                </Card.Text>
                                <Link to={`/listings/${listing.id}`}><Button variant="warning">More details</Button></Link>
                            </Card.Body>
                        </Card>
                        )
                    })
                    }

                </div>
                </>
                :
                <p>No listing found</p>
            }
        </Container>
    )
}

