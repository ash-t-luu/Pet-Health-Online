// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     pets: [],
//     isLoadingPets: false,
//     // petError: null,
//     isAuthenticated: false,
//     user: null
// }

// const petSlice = createSlice({
//     name: 'pets',
//     initialState,
//     reducers: {
//         fetchPetData: (state) => {
//             state.isLoadingPets = true;
//         },
//         addPet: (state, action) => {
//             const newPet = action.payload;
//             state.pets.push(newPet);
//         },
//         updatePet: (state, action) => {
//             const updatedPet = action.payload;
//             const index = state.pets.findIndex(pet => pet.id === updatedPet.id);
//             if (index !== -1) {
//                 state.pets[index] = updatedPet;
//             }
//         },
//         deletePet: (state, action) => {
//             const deletePetId = action.payload;
//             state.pets = state.pets.filter(pet => pet.pet_id !== deletePetId);
//         }
//     }
// });

// export const { fetchPetData, addPet, updatePet, deletePet } = petsSlice.actions;

// export default petSlice.reducer;