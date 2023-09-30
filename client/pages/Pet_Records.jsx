import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchHealthRecords } from '../actions/actions.js';
import Pet_Health from './Pet_Health.jsx';

const Pet_Records = () => {
    const dispatch = useDispatch();
    const records = useSelector((state) => state.pets.healthRecords);
    const isLoadingPets = useSelector((state) => state.pets.isLoadingPets);

    useEffect(() => {
        dispatch(fetchHealthRecords());
    }, [dispatch]);

    console.log('records list:', records);

    const recordList = [];
    for (let i = 0; i < records.length; i++) {
        recordList.push(
            <Pet_Health
                key={records[i].hr_id}
                hr_id={records[i].hr_id}
                formatted_date_visit={records[i].formatted_date_visit}
                description={records[i].description}
                name={records[i].name}
                due_date_shots={records[i].due_date_shots}
            />
        );
    }

    if (records.length === 0) {
        return <h3 className='no-data'>No Pet Records Found</h3>
    }

    if (isLoadingPets) {
        return <div>Loading Health Records...</div>
    }

    return (
        <div className='pets-container'>
            <h1>Pet Records</h1>
            <div className='activity'>
                {recordList}
            </div>
        </div>
    )
};

export default Pet_Records;