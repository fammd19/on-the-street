import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListingSummary from '../ListingSummary';
import Filter from "../Filter";
import './pages.css';

function Find ( {setListingId} ) {

    const [listings, setListings] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");

    useEffect( ()=> {
        fetch("http://localhost:4000/listings")
        .then(response=>response.json())
        .then(json => setListings(json))
    },[])

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
      }

    const listingsToDisplay = listings
    .filter(
      (listing) => selectedCategory === "All" || listing.items.includes(selectedCategory.toLowerCase()) 
    )
    .filter((listing) => (listing.suburb.toLowerCase().includes(search.toLowerCase())||listing.postcode.includes(search.toLowerCase())));


    return (
        <main>
            <a href="./find"><Button variant="success">Find</Button></a>
            <a href="./share"><Button variant="secondary">Share</Button></a>
            <Filter
                search={search}
                onSearchChange={setSearch}
                onCategoryChange={handleCategoryChange}
            />
            <div>
                { !listings
                ? 
                <p>Loading...</p>
                : 
                <div id="listings">{listingsToDisplay.map((listing) => ( 
                        <ListingSummary key={listing.id} listing={listing} setListingId={setListingId}/>
                    ))}
                </div>
                }
            </div>
        </main>
    )
}

export default Find