import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, Row, Container} from 'react-bootstrap';
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
        (listing) => {
            if ( selectedCategory !== "" ) {
            for (let key in listing) {
                if (key === selectedCategory && listing[key] !== "" ) {
                    return listing
                }
            }
        } else {
            return listing   
        }
        }
    )
    .filter((listing) => (listing.suburb.toLowerCase().includes(search.toLowerCase())||listing.postcode.includes(search.toLowerCase())));

    return (
        <Container>
        <Row  className="my-5 mx-4 justify-content-md-center">
            <Col>
                <Link className="ml-3" to="../listings"><Button disabled variant="success">Current listings</Button></Link>
                <Link className="mx-3" to="/share"><Button variant="success">Add a listing</Button></Link>
            </Col>
        </Row>
        <div className="mx-4">

                {
                listings.length>0
                ?
                <>
                <Filter
                search={search}
                onSearchChange={setSearch}
                onCategoryChange={handleCategoryChange}
                />
                <Col lg={12} className="listing">
                    {
                    listingsToDisplay.map ((listing) => 
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
                                        <Link to={`/listings/${listing.id}`}><Button variant="primary">More details</Button></Link>
                                    </Card.Body>
                                </Card>
                        )
                    })
                    }

                </Col>
                </>
                :
                <p>No listing found</p>
            }
        </div>
        </Container>
    )
}

