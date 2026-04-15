import React, { useState, type ChangeEvent } from 'react';
import styles from './CertificationsForm.module.css';

export interface CertificationFormData {
    title: string;
    issuing_entity: string;
    date_acquisition: string;
    image?: File | null;
}

export interface CertificationFormProps {
    onSubmit: (data : CertificationFormData) => void;
    onCancel: () => void;
    initialData?: CertificationFormData;
}

export const CertificationsForm = ({onSubmit, onCancel, initialData} : CertificationFormProps) => {

    const [formData, setFormData] = useState<CertificationFormData>({
        title: initialData?.title || '',
        issuing_entity: initialData?.issuing_entity || '',
        date_acquisition: initialData?.date_acquisition || '',
        image: null 
    });

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name, value} = e.target;
        setFormData((prev : any) => ({...prev, [name]: value}));
    };

    const handleFileChange = ( e: ChangeEvent<HTMLInputElement>) => {

        if ( e.target.files && e.target.files.length > 0) {

            const selectedFile = e.target.files[0];

            setFormData(prev => ({...prev, image: selectedFile}))
        }
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (

        <form className={`${styles.form} flex-container`} onSubmit={handleSubmit}>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="title">Certification Title</label>
                <input 
                    type="text" 
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Type the title of the certification'
                    required
                    />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="issuing_entity">Issuing Entity</label>
                <input 
                    type="text" 
                    id='issuing_entity'
                    name='issuing_entity'
                    value={formData.issuing_entity}
                    onChange={handleChange}
                    placeholder='Type the issuing entity'
                    required
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="date_acquisition">Date of Acquisition</label>
                <input 
                    type="date"
                    id='date_acquisition'
                    name='date_acquisition'
                    value={formData.date_acquisition}
                    onChange={handleChange}
                    placeholder='Type the date of acquisition: MM/DD/YYYY'
                    required
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="image">Certification Image</label>
                <input 
                    type="file"
                    id='image'
                    name='image'
                    onChange={handleFileChange}
                />
            </div>
            <div className={`${styles.formActions} flex-container`}>
                <button
                    type='button'
                    className={`${styles.btnCancel}`}
                    onClick={onCancel}
                    >Cancel</button>
                <button
                    type='submit'
                    className={`${styles.btnSubmit}`}
                    >
                        {initialData ? 'Update' : 'Save'}
                </button>
            </div>
        </form>        
    )
}