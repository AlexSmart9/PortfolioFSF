import React, { useState, type ChangeEvent } from 'react';
import styles from './PostsForm.module.css'; 

export interface PostsFormData {
    title: string;
    content: string;
    image: File | null;
}

interface PostsFormProps {
    onSubmit: (data: PostsFormData) => void;
    onCancel: () => void;
    initialData?: PostsFormData | any; 
}

export const PostsForm = ({ onSubmit, onCancel, initialData }: PostsFormProps) => {
    
    const [formData, setFormData] = useState<PostsFormData>({
        title: initialData?.title || '',
        content: initialData?.content || '',
        image: null 
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
                <label htmlFor="title">Title</label>
                <input 
                    id='title'
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Ej: High performance computation HPC" 
                    required 
                />
            </div>
            
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="content">Content</label>
                <textarea 
                    id='content'
                    name="content" 
                    value={formData.content} 
                    onChange={handleChange} 
                    placeholder="What are you thinking about" 
                    rows={5}
                    required 
                />
            </div>

            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor="image"> + Add image</label>
                <input 
                    id='image'
                    type="file" 
                    name="image" 
                    accept="image/*"
                    onChange={handleFileChange} 
                />
            </div>

            <div className={`${styles.formActions} flex-container`}>
                <button type="button" className={styles.btnCancel} onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className={styles.btnSubmit}>
                    {initialData ? 'Update' : 'Publish'}
                </button>
            </div>
        </form>
    );
};