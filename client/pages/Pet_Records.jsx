import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchHealthRecords } from '../actions/actions';
import Pet_Health from './Pet_Health.jsx';

const Pet_Records = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const records = useSelector((state) => state.pets.healthRecords);
    const isLoadingPets = useSelector((state) => state.pets.isLoadingPets);

    useEffect(() => {
        dispatch(fetchHealthRecords(records));
    }, [dispatch]);

    console.log('records list:', records);

    const recordList = [];
    for (let i = 0; i < records.length; i++) {
        recordList.push(
            <Pet_Health
                hr_id={records[i].hr_id}
                date_vist={record[i].date_vist}
                description={record[i].description}
            />
        );
    }

    if (isLoadingPets) {
        return <div>Loading Health Records...</div>
    }

    return (
        <>
            <div>
                <h1>Pet Records</h1>
                <h2>{id} </h2>
                {recordList}
            </div>
        </>
    )
};

export default Pet_Records;