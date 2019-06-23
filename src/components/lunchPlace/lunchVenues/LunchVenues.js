import React, { useEffect, useState } from 'react';
import uuid from 'uuid';

import Participant from './Participant';

function LunchVenues(props) {
    const [venues, setVenues] = useState([]);
    const [participants, setParticipants] = useState([]);

    function getVenues(address) {
        if (!address) {
            return;
        }
        const api = 'https://api.foursquare.com/v2/venues/explore';
        const qs = '?client_id=UGMJ4N51PQ4XURL21R3K5KENDSPDTNIEICLBR2Q23NNTHNVC' +
            '&client_secret=4HJ1XLCFI2KIWKHP1FMACU0CJXL1CURG1KROTQUXSTH4RHNU' +
            '&query=lunch' +
            '&near=' + address +
            '&v=20170801' +
            '&limit=3';
        fetch(`${api}${qs}`)
            .then((respose) => {
                return respose.json();
            })
            .then((data) => {
                const venues = data.response.groups[0].items.map(item => {
                    const { id, name } = item.venue;
                    return {
                        id,
                        name
                    };
                });
                console.log(venues);
                setVenues(venues);
            })
    }

    function addParticipant() {
        setParticipants([...participants, {
            id: uuid(),
            name: '',
            vote: null
        }]);
    }

    function onNameChange(id, name) {
        let updatedParticipants = participants.map(participant => {
            if (participant.id !== id) {
                return participant;
            }
            return {
                ...participant,
                name: name
            };
        });
        setParticipants(updatedParticipants);
    }

    useEffect(() => {
        getVenues(props.address);
    }, [props.address]);

    return (
        <div className="lunch-venues">
            <table>
                <thead>
                    <tr>
                        <th>Participants</th>
                        {
                            venues.map(venue => (
                                <th key={venue.id}>
                                    <div className="name">{venue.name}</div>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        participants.map(participant => (
                            <Participant key={participant.id}
                                participant={participant}
                                venues={venues}
                                onNameChange={onNameChange}></Participant>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={addParticipant}>Add Participant</button>
        </div>
    )
}

export default LunchVenues;