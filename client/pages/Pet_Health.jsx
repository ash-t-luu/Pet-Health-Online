import React from 'react';

const Pet_Health = (props) => {
    console.log(props.formatted_date_visit); // Check the value

    return (
        <>
            <div className="activity-data">
                <div className='data-names'>
                    <span className='data-title'>Name</span>
                    <p id='name' className='data-list' style={{ whiteSpace: 'pre-line' }}>{props.name}</p>
                </div>
                <div key={props.pet_id} className='data-names'>
                    <span className='data-title'>Date Visit</span>
                    <p id='formatted_date_visit' className='data-list'>{props.formatted_date_visit}</p>
                </div>
                <div className='three'>
                    <span className='data-title'>Description</span>
                    <p id='description' className='data-list' style={{ whiteSpace: 'pre-line' }}>{props.description}</p>
                </div>
                <div className='data-names'>
                    <span className='data-title'>Due Date</span>
                    <p id='due_date_shots' className='data-list' style={{ whiteSpace: 'pre-line' }}>{props.due_date_shots}</p>
                </div>
            </div>
            <hr></hr>

        </>)
};

export default Pet_Health;
