import React, { useState, useEffect } from 'react';
import Pets from './Pets.jsx';
import AddPetForm from '../components/AddPet.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetDataCreator } from '../actions/actions.js';

const Dashboard = props => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets.pets);
    const isLoadingPets = useSelector((state) => state.pets.isLoadingPets);

    useEffect(() => {
        dispatch(fetchPetDataCreator());
    }, [dispatch]);

    // console.log('state: ', state);
    // console.log('pets list:', pets);

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
            />
        );
    }

    if (isLoadingPets) {
        return <div>Loading Pets...</div>
    }



    return (
        <div className='pets-container'>
            <h1>Your Pets</h1>
            <AddPetForm className='add-pet' />
            <div className='petsDisplay'>
                {petList}
            </div>
        </div>
    )
};

export default Dashboard;