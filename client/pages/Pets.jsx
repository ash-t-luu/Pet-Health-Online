import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPetDataCreator } from '../actions/actions';
import { deletePetCreator, updatePetImage } from '../actions/actions';
import { data } from 'autoprefixer';

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
    const [, forceUpdate] = useState();
    const [uploadImg, setUploadImg] = useState(props.image);


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
                    alert('File Uploaded Successfully');
                    setUploadImg(file.filename);
                    dispatch(fetchPetDataCreator());
                } else {
                    console.error('File Upload Failed');
                }
            } catch (error) {
                console.error('Image fetch /dashboard/image: ERROR: ', error);
            }
        }
    }

    useEffect(() => {
        if (props.image !== uploadImg) {
            setUploadImg(props.image);
        }
    }, [props.image, uploadImg]);

    return (
        <>
            <div>
                <div key={props.pet_id} id="innerPetsDisplay">
                    {!uploadImg && (<form encType="multipart/form-data" method='post' className='form-img'>
                        <input type='file' name='image' onChange={handleFile}></input>
                        <button onClick={handleUpload} className='img-btn'>Upload</button>
                    </form>)}
                    {uploadImg && <img src={`/images/${uploadImg}`} alt={`${props.name} Image`} className='imgSize' />}
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

export default Pets;