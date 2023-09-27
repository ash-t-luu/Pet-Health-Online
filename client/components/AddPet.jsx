import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPetCreator } from '../actions/actions.js';

const AddPetForm = () => {
    const dispatch = useDispatch();
    const [newPet, setNewPet] = useState({ name: '', breed: '', species: '', dob: '', age: 0, gender: '', weight_lb: 0 });
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPet({ ...newPet, [name]: value });
    };

    const handleAddPet = () => {

        const newPetData = {
            name: newPet.name,
            breed: newPet.breed,
            species: newPet.species,
            dob: newPet.dob,
            age: newPet.age,
            gender: newPet.gender,
            weight_lb: newPet.weight_lb
        };

        fetch('/pets/add-pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPetData),
        })
            // .then((res) => {
            //     if (res.ok) {
            //         return res.json();
            //     } else {
            //         throw new Error('Failed to add pet');
            //     }
            // })
            .then((data) => {
                dispatch(addPetCreator(data));

                setNewPet({ name: '', breed: '', species: '', dob: '', age: 0, gender: '', weight_lb: 0 });

                setIsFormOpen(false);
            })
            .catch((err) => {
                console.error('AddPetForm fetch /add-pet: ERROR: ', err);
            });
    };

    return (
        <div>
            {!isFormOpen ? (
                <button onClick={() => setIsFormOpen(true)}>Add Pet</button>
            ) : (
                <div id="form-add">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newPet.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="species"
                        placeholder='Species'
                        value={newPet.species}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        value={newPet.breed}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="dob"
                        placeholder='Date of birth'
                        value={newPet.dob}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="age"
                        placeholder='Age'
                        value={newPet.age}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="gender"
                        placeholder='Gender'
                        value={newPet.gender}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="weight_lb"
                        placeholder='Weight (lb)'
                        value={newPet.weight_lb}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddPet}>Save Pet</button>
                    <button onClick={() => setIsFormOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AddPetForm;