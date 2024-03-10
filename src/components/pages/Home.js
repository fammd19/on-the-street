import Find from './Find';
import FindMap from '../FindMap'

function Home ( {setListingId} ) {
    return (
        <main>
            <h1>Saving "stuff" from the streets</h1>
            <div className="intro">
                <p>Across Sydney, there's heaps of good quality items being thrown onto the street, awaiting council collections, and ending up in landfill. We're on a mission to save them from the tip by helping you to find what you're looking for.</p>
                <p>Street saving is a win-win: Save yourself some money and save the environment along the way.</p>
            </div>
            <Find setListingId={setListingId}/>
            <FindMap />
            
        </main>
    )
}

export default Home