import {useState, useEffect } from "react"
import {Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Filter from "../Filter";

export default function ListingIndex () {
    const [listings, setListings] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("")

    useEffect ( () => {
        fetch("http://localhost:4000/listings")
        .then(res => res.json())
        .then(json => setListings(json))
    },[])

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
      }

    const listingsToDisplay = listings
    .filter(
      (listing) => selectedCategory === "" || listing.items.includes(selectedCategory.toLowerCase()) 
    )
    .filter((listing) => (listing.suburb.toLowerCase().includes(search.toLowerCase())||listing.postcode.includes(search.toLowerCase())));

    return (
        <>
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
                    listingsToDisplay.map ((listing) => 
                        { return (
                        <Card key={listing.id}>
                            <h2>{`${listing.suburb} ${listing.postcode}`}</h2>
                            <h3>{`Last updated: ${listing.dateUpdated} ${listing.timeUpdated}`}</h3>
                            <ul>
                                {listing.items.map((item) => ( 
                                            <li key={item}>{item}</li>
                                        ))}
                                { !listing.otherItems ? null : <li>Other items: {listing.otherItems}</li>}           
                            </ul>
                            <Link to={`/listings/${listing.id}`}><Button variant="warning">More details</Button></Link>
                        </Card>
                        )
                    })
                    }

                </div>
                </>
                :
                <p>No listing found</p>
            }
        </>
    )
}

