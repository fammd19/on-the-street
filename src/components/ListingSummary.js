import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ListingSummary ( {listing, setListingId} ) {

    const navigate = useNavigate();

    function handleClick () {
        console.log(listing.id);
        setListingId(listing.id)
        navigate('/listing');
    }

    return (
    <div className="listing">
        <h2>{`${listing.suburb}, ${listing.postcode}`}</h2>
        <h3>{`Last updated: ${listing.dateUpdated} ${listing.timeUpdated}`}</h3>
        <ul>
            {listing.items.map((item) => ( 
                        <li key={item}>{item}</li>
                    ))}
            { !listing.otherItems ? null : <li>Other items: {listing.otherItems}</li>}           
        </ul>
        <Button variant="warning" onClick={handleClick}>More details</Button>
    </div>
    )

}

export default ListingSummary