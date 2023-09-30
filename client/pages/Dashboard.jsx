import React, { useEffect, useState } from 'react';
import Pets from './Pets.jsx';
import AddPetForm from '../components/AddPet.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetDataCreator } from '../actions/actions.js';

const Dashboard = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets.pets);
    const isLoadingPets = useSelector((state) => state.pets.isLoadingPets);

    console.log('pets list:', pets);

    // useEffect(() => {
    //     dispatch(fetchPetDataCreator());
    // }, [dispatch]);

    useEffect(() => {
        if (!isLoadingPets) {
            dispatch(fetchPetDataCreator());
        }
    }, [dispatch, isLoadingPets]);

    const [shouldFetchPets, setShouldFetchPets] = useState(false);

    useEffect(() => {
        if (shouldFetchPets && !isLoadingPets) {
            dispatch(fetchPetDataCreator());
            setShouldFetchPets(false);
        }
    }, [dispatch, shouldFetchPets, isLoadingPets]);


    const petList = [];
    for (let i = 0; i < pets.length; i++) {
        petList.push(
            <Pets
                pet_id={pets[i].pet_id}
                name={pets[i].name}
                species={pets[i].species}
                breed={pets[i].breed}
                gender={pets[i].gender}
                age={pets[i].age}
                formatted_dob={pets[i].formatted_dob}
                weight_lb={pets[i].weight_lb}
                image={pets[i].image}
                user_name={pets[i].user_name}
            />
        );
    }

    // if (isLoadingPets) {
    //     return <div>Loading Pets...</div>
    // }

    if (pets.length === 0) {
        return <h3 className='no-data'>No Pets Found</h3>
    }

    return (
        <div className='pets-container'>
            <p id='name-tag'>Welcome {pets[0].user_name},</p>
            <h1>Your Pets</h1>
            {/* <AddPetForm className='add-pet' /> */}
            <div className='petsDisplay'>
                {petList}
            </div>
        </div>
    )
};

export default Dashboard;