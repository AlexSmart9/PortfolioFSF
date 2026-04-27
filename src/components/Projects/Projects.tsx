import { useCrud } from "../../hooks/useCrud";
import { useState, useEffect } from "react";
import { ProjectsCard } from "./ProjectsCard";
import styles from './Projects.module.css';
import { AdminButton } from "../common/AdminButton/AdminButton";
import { ProjectsForm, type ProjectsFormData } from "./ProjectsForm";
import { Modal } from "../common/Modal/Modal";
import { ConfirmDialog } from "../common/Modal/ConfirmDialog";
import { Loader } from '../common/Loader/Loader';

export interface Project {
    id: string | number
    title: string
    description: string
    image_url?: string
    link:string
    technologies:string
}

export const Projects = () => {
    
    const [data, setData] = useState<Project[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deleteId, setDeleteId] = useState<any | null>(null);

    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api/';

    const endpoint = 'projects';

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
            console.log(response)
        } catch (error) {
             console.error('Error fetching certifications:', error);
        };
    };

    useEffect(() => {
        getData();
    }, []);


    //Open form to create a new project
    const handleOpenCreate = () => {
        setSelectedProject(null);
        setModalIsOpen(true);
    }

    const handleOpenEdit = (project: Project) => {
        setSelectedProject(project);
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedProject(null);
        setModalIsOpen(false);
    }

    const handleSubmit = async (formData: ProjectsFormData) => {
        const dataToSend = new FormData();

        dataToSend.append('title', formData.title);
        dataToSend.append('description', formData.description);
        dataToSend.append('link', formData.link);
        dataToSend.append('technologies', formData.technologies);

        if (formData.image) {
            dataToSend.append('image', formData.image);
        }

        if (selectedProject && selectedProject.id) {
            dataToSend.append('_method', 'PUT');
            await update(endpoint, selectedProject.id, dataToSend)
        } else {
            await create(endpoint, dataToSend)
        }

        await getData();
        handleCloseModal();
    }

    const handleDelete = (id: string | number) => {
        setDeleteId(id)
    }

    const confirmDelete = async () => {
        if(deleteId) {
            try {
                await destroy(endpoint, deleteId)
                setData(prev => prev.filter(item => item.id !== deleteId))
            } catch (error) {
                console.error('Error deleting project:', error)
            }
        }
    }

    return (
        <>
            <section className={styles.section}>
                <header className={`${styles.header} flex-container`}>
                    <h2>Projects</h2>
            </header>
            <div className={loading ? 'flex-container' : `${styles.container} grid-container`}>
                    {
                        loading ? (
                            <Loader/>
                        ) : (
                            data.map((project) => (
                                <ProjectsCard
                                    key={project.id}
                                    project={project}
                                    onEdit={() => handleOpenEdit(project)}
                                    onDelete={() => handleDelete(project.id)}
                                />
                            ))
                        )
                    }
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onClose={handleCloseModal}
                    title={selectedProject ? 'Update Project' : 'New Project'}
                >
                    <ProjectsForm
                        onSubmit={handleSubmit}
                        onCancel={handleCloseModal}
                        initialData={selectedProject || undefined}
                    />
                </Modal>
                <ConfirmDialog
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={confirmDelete}
                    title="Delete Project"
                    message="Are you sure you want to delete this project? This action cannot be undone."
                    confirmText="Delete"
                />
        </section>
        <AdminButton
            tooltipText="Add new Project"
            onClick={handleOpenCreate}
        />
        </>
    );
};