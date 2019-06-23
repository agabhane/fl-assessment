import React, { useState } from 'react';

function Search(props) {
    const [geocode, setGeocode] = useState('');
    function onGeocodeChange(e) {
        setGeocode(e.target.value);
    }
    function onGeocodeSubmit() {
        props.onGeocodeSubmit(geocode);
    }
    return (
        <div className="search wrapper">
            <input type="text" placeholder="Enter geocode" value={geocode} onChange={onGeocodeChange} />
            <button onClick={onGeocodeSubmit}>Search</button>
        </div>
    )
}

export default Search;