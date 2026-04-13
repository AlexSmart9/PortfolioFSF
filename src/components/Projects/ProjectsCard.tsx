import { BiEdit, BiTrash } from 'react-icons/bi';
import { type Project } from './Projects';
import styles from './ProjectsCard.module.css';

interface ProjectCardProps {
    project: Project;
    onEdit: () => void;
    onDelete: () => void;
}

export const ProjectsCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
    return (
        <div className={`${styles.card} flex-container`}>
            {project.image_url && (
                <img className={styles.imageContainer} src={project.image_url} alt={project.title} />
            )}
            
            <div className={`${styles.content} flex-container`}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <p className={styles.technologies}>Technologies: {project.technologies}</p>
                
                <div className={`${styles.actions} flex-container`}>
                    <button 
                        className={styles.editBtn}
                        onClick={onEdit} 
                        title="Edit Project"
                        aria-label={`Editar proyecto ${project.title}`}
                    >
                        <BiEdit />
                    </button>
                    <button 
                        className={styles.deleteBtn} 
                        onClick={onDelete} 
                        title="Delete Project"
                        aria-label={`Eliminar proyecto ${project.title}`}
                    >
                        <BiTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};