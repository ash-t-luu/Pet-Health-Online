import * as types from '../constants/actionTypes';

export const fetchPetDataCreator = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.FETCH_PET_DATA });
            const res = await fetch('/pets');
            const data = await res.json();
            dispatch({ type: types.FETCH_PET_DATA_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: types.FETCH_PET_DATA_ERROR, payload: error });
        }
    };
};

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