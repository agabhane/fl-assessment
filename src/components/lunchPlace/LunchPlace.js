import React, { useState } from 'react';
import Search from './search/Search';
import LunchVenues from './lunchVenues/LunchVenues';

function LunchPlace() {
    const [address, setAddress] = useState('');
    function onGeocodeSubmit(address) {
        setAddress(address);
    }
    return (
        <div className="container">
            <header>Lunch Place</header>
            <Search onGeocodeSubmit={onGeocodeSubmit}></Search>
            <LunchVenues address={address}></LunchVenues>
        </div>
    )
}

export default LunchPlace;