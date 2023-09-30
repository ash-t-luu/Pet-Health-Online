import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePetCreator, updatePetImage } from '../actions/actions';

const Pets = props => {

    // const dispatch = useDispatch();

    //use console logs to see what im deleting
    // const handleDeleteClick = (e) => {
    //     fetch(`/pets/${props.pet_id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         // .then((res) => {
    //         //     if (res.status === 204) {
    //         //         // return res.send('Successful: Deleted Pet');
    //         //         return res.json();
    //         //     } else {
    //         //         throw new Error('Failed to delete pet');
    //         //     }
    //         // })
    //         .then((data) => {
    //             dispatch(deletePetCreator(data));
    //         })
    //         .catch((err) => {
    //             console.error('DeletePet fetch: ERROR: ', err);
    //         });
    // };

    const dispatch = useDispatch();
    const [file, setFile] = useState();

    const handleFile = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (file && props.pet_id) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const res = await fetch(`/pets/dashboard/upload/${props.pet_id}`, {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    // const newImg = await res.json();
                    // console.log('res in pets img', newImg);
                    // dispatch(updatePetImage(props.pet_id, newImg));
                    alert('File Uploaded Successfully');
                } else {
                    console.error('File Upload Failed');
                }
            } catch (error) {
                console.error('Image fetch /dashboard/image: ERROR: ', error);
            }
        }
    }

    return (
        <>
            <div>
                <div key={props.pet_id} id="innerPetsDisplay">
                    {!props.image && (<form encType="multipart/form-data" method='post' className='form-img'>
                        <input type='file' name='image' onChange={handleFile}></input>
                        <button onClick={handleUpload} className='img-btn'>Upload</button>
                    </form>)}
                    {props.image && <img src={`/images/${props.image}`} alt={`${props.name} Image`} className='imgSize' />}
                    <p>
                        <label htmlFor='name'>NAME: </label>
                        <span id="petName">{props.name}</span>
                    </p>
                    <p>
                        <label htmlFor='species'>SPECIES: </label>
                        <span id='species'>{props.species}</span>
                    </p>
                    <p>
                        <label htmlFor='breed'>BREED: </label>
                        <span id="breed">{props.breed}</span>
                    </p>
                    <p>
                        <label htmlFor='gender'>GENDER: </label>
                        <span id='gender'>{props.gender}</span>
                    </p>
                    <p>
                        <label htmlFor='age'>AGE (YEARS): </label>
                        <span id='age'>{props.age}</span>
                    </p>
                    <p>
                        <label htmlFor='dob'>D.O.B: </label>
                        <span id='dob'>{props.formatted_dob}</span>
                    </p>
                    <p>
                        <label htmlFor='weight'>WEIGHT (LB): </label>
                        <span id='weight'>{props.weight_lb}</span>
                    </p>
                    {/* <div>
                        <button pet_id={props.pet_id} onClick={handleDeleteClick}>Delete Pet</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

// // loader function 
// export const petLoader = async () => {
//     const result = await fetch('http://localhost:5000/pets');
//     return result.json();
// }

export default Pets;