import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, Row} from "react-bootstrap";
import Filter from "../Filter";
import icon from "../assets/listing-icon.svg"


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
                <Row>
                    {
                    listingsToDisplay.map ((listing) => 
                        { return (
                            <Col lg={6} className="listing">
                                <Card  className="my-1" key={listing.id}>
                                    <Card.Body>
                                        <Card.Title><img src={icon} alt="Listing icon" className="icon"/>{`${listing.suburb} ${listing.postcode}`}</Card.Title>
                                        <Card.Subtitle className="text-muted">{`Last updated: ${listing.dateUpdated} ${listing.timeUpdated}`}</Card.Subtitle>
                                        <Card.Text className="mt-2">
                                            <ul>
                                                { !listing.clothing ? null : <li>Clothing</li>}
                                                { !listing.electricals ? null : <li>Electricals</li>} 
                                                { !listing.furniture ? null : <li>Furniture</li>} 
                                                { !listing.garden ? null : <li>Garden tools & items</li>}
                                                { !listing.kids ? null : <li>Kids toys & accessories</li>}
                                                { !listing.kitchenware ? null : <li>Kitchenware</li>} 
                                                { !listing.sports ? null : <li>Sports & hobbies equipment</li>}
                                                { !listing.otherItems ? null : <li>Other items</li>}           
                                            </ul>
                                        </Card.Text>
                                        <Link to={`/listings/${listing.id}`}><Button variant="primary">More details</Button></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                    }

                </Row>
                </>
                :
                <p>No listing found</p>
            }
        </div>
    )
}

