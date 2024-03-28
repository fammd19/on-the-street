function FindMap () {

    //Fetch all of the listings and loop through the address, pass it to geocode and then add those to the map
    return(
        <iframe
            className="map"
            style= {{width: 600, height: 450}}
            loading="lazy"
            src="https://www.google.com/maps/d/embed?mid=1cgaDt-XZOOKY9WZOuYqavi0w0XBCz0c">
        </iframe>
    )
}

export default FindMap