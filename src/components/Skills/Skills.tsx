import { useCrud } from "../../hooks/useCrud";
import { AdminButton } from "../common/AdminButton/AdminButton";
import { Modal } from "../common/Modal/Modal";
import { SkillsForm, type SkillFormData } from "../Skills/SkillsForm";
import { SkillCard} from './SkillsCard';
import styles from "./Skills.module.css";
import { useEffect, useState } from "react";

export interface Skill {
    id: string | number;
    name: string;
    icon_class: string;
    category: string;
};

export const Skills = () => {

    const [data, setData] = useState<Skill[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api/';

    const endpoint = 'skills';

    // Initialize CRUD Hook

    const {
        loading,
        getAll,
        create,
        update,
        destroy,
    } = useCrud(API_BASE_URL);


    useEffect(() => {
            getData();
        
    }, []);

    const getData = async () => {
        try {
            const data = await getAll(endpoint);
            setData(data || []);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleOpenCreate = () => {
        setSelectedSkill(null);
        setModalIsOpen(true);
    };

    const handleOpenEdit = (skill: Skill) => {
        setSelectedSkill(skill);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedSkill(null);
        setModalIsOpen(false);
    };    

    const handleSubmit = async (formData : SkillFormData) => {
        try {
            if(selectedSkill) {
                await update(endpoint, selectedSkill.id, formData);
            } else {
                await create(endpoint, formData);
            }

            await getData()
            handleCloseModal();
        } catch (error) {
             console.error('Error saving skill:', error);
        
        }
    };

    const handleDelete = async (id: string | number) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await destroy(endpoint, id);
                await getData();
            } catch (error) {
                console.error('Error deleting skill', error);
    
            }
        };
    }

    return (
        <section className={`${styles.section}`}>
            <header className={`${styles.header} flex-container`}>
                <h2 className={styles.subtitle}>Skills</h2>
                <AdminButton
                    tooltipText="Add new Skill"
                    onClick={handleOpenCreate}
                />
            </header>
            <div className={`${styles.container} grid-container`}>
                {
                    loading ? (
                        <p>Loading...</p> 
                    ) : (
                        data.map((skill) => (
                            <SkillCard
                            key={skill.id}
                            skill={skill}
                            onEdit={() => handleOpenEdit(skill)}
                            onDelete={() => handleDelete(skill.id)}
                            />
                        ))
                    )
                }
            </div>

            <Modal 
                isOpen={modalIsOpen} 
                onClose={handleCloseModal} 
                title={selectedSkill ? 'Update Skill' : 'New Skill'}
            >
                <SkillsForm 
                    onSubmit={handleSubmit} 
                    onCancel={handleCloseModal}
                    initialData={selectedSkill || undefined} 
                />
            </Modal>
        </section>
    )
}