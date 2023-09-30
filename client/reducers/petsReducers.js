import * as types from '../constants/actionTypes';

const initialState = {
    pets: [],
    healthRecords: [],
    isLoadingPets: false,
    isAuthenticated: false,
    user: null,
    error: null
}

const petsReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_PET_DATA: {
            return { ...state, isLoadingPets: true, error: null };
        }

        case types.FETCH_PET_DATA_SUCCESS: {
            console.log('fetch data pet:', state.pets)
            return { ...state, pets: [...action.payload], isLoadingPets: false, error: null };
        }

        case types.FETCH_PET_DATA_ERROR: {
            return { ...state, isLoadingPets: false, error: action.payload.error };
        }

        case types.FETCH_HEALTH_RECORDS: {
            return { ...state, isLoadingPets: true, error: null };
        }

        // case types.FETCH_PET_IMAGE: {
        //     const { newImage, petId } = action.payload;
        //     const updatedPets = state.pets.pets.map((pet) =>
        //         pet.pet_id === petId ? { ...pet, image: newImage } : pet
        //     );
        //     return { ...state, pets: updatedPets }
        // }

        case types.LOGOUT: {
            return {
                ...state,
            };
        }

        case types.FETCH_HEALTH_RECORDS_SUCCESS: {
            console.log('fetch data records:', state.healthRecords)
            return { ...state, healthRecords: [...action.payload], isLoadingPets: false };
        }

        case types.FETCH_HEALTH_RECORDS_ERROR: {
            return { ...state, isLoadingPets: false, error: action.payload.error };
        }

        case types.ADD_PET: {
            return { ...state, pets: [...state.pets, action.payload] };
        }

        case types.UPDATE_PET: {
            const updatedPet = action.payload;
            return {
                ...state, pets: state.pets.map((pet) =>
                    pet.id === updatedPet.id ? updatedPet : pet)
            };
        }

        case types.DELETE_PET: {
            console.log("Deleting pet with pet_id:", action.payload);
            console.log("Current state.pets:", state.pets);

            const updatedPets = state.pets.filter(
                (pet) => pet.pet_id !== action.payload
            );
            console.log("Updated state.pets:", updatedPets);

            return {
                ...state, pets: updatedPets
            };
        }

        default: {
            return state;
        }
    };
};

export default petsReducer;