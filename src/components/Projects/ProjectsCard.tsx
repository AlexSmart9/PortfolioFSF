import { BiEdit, BiLinkExternal, BiTrash } from 'react-icons/bi';
import { type Project } from './Projects';
import styles from './ProjectsCard.module.css';
import { useState } from 'react';
import { SiGithub } from 'react-icons/si';

interface ProjectCardProps {
    project: Project;
    onEdit: () => void;
    onDelete: () => void;
}

export const ProjectsCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }


    return (
        <div className={`${styles.cardContainer}`} onClick={handleFlip}>
            <div className={`${styles.cardInner}`}
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                <div className={`${styles.cardFront} flex-container`}>
                    {
                        project.image_url && (
                            <img className={styles.imageContainer} src={project.image_url} alt={project.title} />

                        )
                    }
                    <div className={styles.content}>
                        <h3 className={styles.title}>{project.title}</h3>
                        <p className={styles.technologies}>Tecnologías: {project.technologies}</p>
                        <p className={styles.status}>Status: <span>{project.status}</span></p>
                        <div className={styles.linksContainer}>
                            {project.repo_url && (
                                <a href={project.repo_url} target='_blank' rel='noreferrer' className={styles.linkPill} onClick={(e) => e.stopPropagation()}>
                                    <SiGithub size={16} /> Repo
                                </a>
                            )}
                            {project.link && (
                                <a href={project.link} target='_blank' rel='noreferrer' className={styles.linkPill} onClick={(e) => e.stopPropagation()}>
                                    <BiLinkExternal size={16} /> Web
                                </a> 
                            )}
                        </div> 
                        <p className={styles.flipHint}>Haz clic para ver detalles ↺</p>
                    </div>
                    <div className={`${styles.actions} flex-container`}>
                        <button 
                            className={styles.editBtn}
                            onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                            title="Edit Project"
                        >
                            <BiEdit size={30}/>
                        </button>
                        <button 
                            className={styles.deleteBtn} 
                            onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                            title="Delete Project"
                        >
                            <BiTrash size={30}/>
                        </button>
                    </div>
                </div>
                <div className={styles.cardBack}>
                     <p className={styles.description}>
                        {project.description}
                    </p>
                </div>
            </div>
        </div>
    );
};