import { useCrud } from "../../hooks/useCrud";
import { AdminButton } from "../common/AdminButton/AdminButton";
import { Modal } from "../common/Modal/Modal";
import { SkillsForm, type SkillFormData } from "../Skills/SkillsForm";
import { SkillCard} from './SkillsCard';
import styles from "./Skills.module.css";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "../common/Modal/ConfirmDialog";

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
    const [deleteId, setDeleteId] = useState<any | null>(null)

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


    
    const getData = async () => {
        try {
            const response = await getAll(endpoint);
            setData(response || []);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };
    
    useEffect(() => {
            getData();
    }, []);

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

    const handleDelete = (id: string | number) => {
        setDeleteId(id)
    };

    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await destroy(endpoint, deleteId);
                setData(prev => prev.filter(item => item.id !== deleteId));
            } catch (error) {
                console.error("Error deleting skill:", error);
            }
        }
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
            <ConfirmDialog 
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Skill"
                message="Are you sure you want to delete this skill? This action cannot be undone."
                confirmText="Delete"
            />
        </section>
        
    )
}