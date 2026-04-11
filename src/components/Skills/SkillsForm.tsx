import React, { useState, type ChangeEvent } from 'react';
import styles from './SkillsForm.module.css'

export interface SkillFormData {
    name: string;
    icon_class: string;
    category: string;
}

export interface SkillFormProps {
    onSubmit: (data: SkillFormData) => void;
    onCancel: () => void;
    initialData?: SkillFormData;
}


export const SkillsForm = ({onCancel, onSubmit, initialData} : SkillFormProps) => {
    const [formData, setFormData] = useState<SkillFormData>(initialData || {name: '', icon_class: '', category: ''});

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value} = e.target;
            setFormData((prev : any) => ({...prev, [name]: value}));
    };

    const handleSumbit = (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        console.log(formData);
    };

    return (
        <form className={`${styles.form} flex-container`} onSubmit={handleSumbit}>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='name'>Skill Name</label>
                <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Type the name of the skill'
                required
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='icon_class'>Icon Class</label>
                <input
                type='text'
                id='icon_class'
                name='icon_class'
                value={formData.icon_class}
                onChange={handleChange}
                placeholder='Type the icon class'
                required
                />
            </div>
            <div className={`${styles.formGroup} flex-container`}>
                <label htmlFor='category'>Category</label>
                <select
                    id='category'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select a category...</option>
                    <option value='Frontend'>Frontend</option>
                    <option value='Backend'>Backend</option>
                    <option value='Database'>Database</option>
                    <option value='Machine Learning'>Machine Learning</option>'
                    <option value='Artificial Intelligence'>Artificial Intelligence</option>
                    <option value='Cloud Computing'>Cloud Computing</option>
                    <option value='Soft Skill'>Soft Skill</option>
                </select>
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
