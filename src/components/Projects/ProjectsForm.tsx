// src/components/Projects/ProjectForm.tsx
import React, { useState, type ChangeEvent } from 'react';
import styles from './ProjectsForm.module.css';


export interface ProjectsFormData {
    title: string;
    description: string;
    link: string;
    technologies: string;
    image: File | null;
}

interface ProjectFormProps {
    onSubmit: (data: ProjectsFormData) => void;
    onCancel: () => void;
    initialData?: ProjectsFormData | any; 
}

export const ProjectsForm = ({ onSubmit, onCancel, initialData }: ProjectFormProps) => {
    
    const [formData, setFormData] = useState<ProjectsFormData>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        link: initialData?.link || '',
        technologies: initialData?.technologies || '',
        image: null // Siempre null por seguridad
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFormData(prev => ({ ...prev, image: selectedFile }));
        }
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={`${styles.form} flex-container`}>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='title'>Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Write the name of your project" 
                    required 
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='description'>Description</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Write a description of your project" 
                    rows={5} 
                    required 
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='link'>Link</label>
                <input 
                    type="text" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleChange} 
                    placeholder="Write the link of your project" 
                    required 
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='technologies'>Technologies</label>
                <input 
                    type="text" 
                    name="technologies" 
                    value={formData.technologies} 
                    onChange={handleChange} 
                    placeholder="Write the technologies used in your project" 
                    required 
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="image">+ Add image</label>
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    required={!initialData} 
                />
            </div>
            <div className={`${styles.formActions} flex-container`}>
                <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn-submit"
                >
                    {initialData ? 'Update' : 'Publish'}
                </button>
            </div>
        </form>
    );
};