import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/actions';

//import child components
import Dashboard from '../pages/Dashboard.jsx';

const PetContainer = () => {
    // const pets = useSelector((store) => store.pets.pets);

    const dispatch = useDispatch();

    const updatePet = () => {
        dispatch(actions.updatePetCreator());
    }

    const deletePet = petId => {
        dispatch(actions.deletePetCreator(petId));
    }

    return (
        <div>
            <Dashboard
                deletePet={deletePet}
            />
        </div>
    );
}

export default PetContainer;