import * as types from '../constants/actionTypes';

export const fetchPetDataCreator = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.FETCH_PET_DATA });
            const response = await fetch('/pets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const petsData = await response.json();
            console.log('data in action: pets ', petsData)
            dispatch({ type: types.FETCH_PET_DATA_SUCCESS, payload: petsData });
        } catch (error) {
            dispatch({ type: types.FETCH_PET_DATA_ERROR, payload: error });
        }
    };
};


export const fetchHealthRecords = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.FETCH_HEALTH_RECORDS });
            const response = await fetch('/pets/pet-records', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const recordData = await response.json();
            console.log('data in action: records ', recordData)
            dispatch({ type: types.FETCH_HEALTH_RECORDS_SUCCESS, payload: recordData });
        } catch (error) {
            dispatch({ type: types.FETCH_HEALTH_RECORDS_ERROR, payload: error });
        }
    }
}

export const updatePetImage = (petId, newImage) => ({
    type: 'FETCH_PET_IMAGE',
    payload: { petId, newImage }
});

export const addPetCreator = data => ({
    type: types.ADD_PET,
    payload: data,
});

//update existing pet data
export const updatePetCreator = data => ({
    type: types.UPDATE_PET,
    payload: data,
});

//delete pet
export const deletePetCreator = (pet_id) => ({
    type: types.DELETE_PET,
    payload: pet_id,
});