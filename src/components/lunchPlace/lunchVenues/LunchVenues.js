import React, { useEffect, useState } from 'react';
import uuid from 'uuid';

import Participant from './Participant';
import './LunchVenues.css';

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
                if (data.response.groups) {
                    const venues = data.response.groups[0].items.map(item => {
                        const { id, name } = item.venue;
                        return {
                            id,
                            name
                        };
                    });
                    console.log(venues);
                    setVenues(venues);
                    setParticipants([]);
                } else {
                    setVenues([]);
                    setParticipants([]);
                }
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

    function onVoteChange(participantId, venueId) {
        let updatedParticipants = participants.map(participant => {
            if (participant.id !== participantId) {
                return participant;
            }
            return {
                ...participant,
                vote: venueId
            };
        });
        setParticipants(updatedParticipants);
    }

    function getMaxVoteCount() {
        let voteCount = {};
        participants.forEach((p) => {
            if (voteCount[p.vote]) {
                voteCount[p.vote] += 1;
            } else {
                voteCount[p.vote] = 1;
            }
        });
        let maxKey = Object.keys(voteCount)[0];
        for (let key in voteCount) {
            if (voteCount[key] > voteCount[maxKey]) {
                maxKey = key;
            }
        }
        return maxKey;
    }

    useEffect(() => {
        getVenues(props.address);
    }, [props.address]);

    const maxVotesVenueId = getMaxVoteCount();

    return (
        <div className="lunch-venues">
            {
                venues.length < 1 ? '' : (
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <th>Participants</th>
                                    {
                                        venues.map(venue => (
                                            <th key={venue.id} className="venue-name">
                                                <span className="name">{venue.name}
                                                    {maxVotesVenueId === venue.id ? <i className="fas fa-check icon-check"></i> : ''}
                                                </span>
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
                                            onNameChange={onNameChange}
                                            onVoteChange={onVoteChange}></Participant>
                                    ))
                                }
                            </tbody>
                        </table>
                        <button className="btn-add-participant" onClick={addParticipant}>Add Participant</button>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default LunchVenues;