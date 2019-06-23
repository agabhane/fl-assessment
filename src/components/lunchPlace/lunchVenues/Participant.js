import React, { useState } from 'react';

function Participant(props) {
    const { id, name, vote } = props.participant;
    function onNameChange(e) {
        props.onNameChange(id, e.target.value);
    }
    return (
        <tr>
            <td>
                <input type="text" placeholder="Enter your name" value={name} onChange={onNameChange} />
            </td>
            {
                props.venues.map(venue => (
                    <td key={venue.id}></td>
                ))
            }
        </tr>
    )
}

export default Participant;