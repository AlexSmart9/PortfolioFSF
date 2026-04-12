import * as BiIcons from 'react-icons/bi';
import { type Certification } from './Certifications';
import styles from './CertificationsCard.module.css';

export interface CertificationsCardProps {
    certification: Certification;
    onEdit: () => void;
    onDelete: () => void;
}

export const CertificationsCard = ({certification, onEdit, onDelete} : CertificationsCardProps) => {

    return (
        <div className={`${styles.card} flex-container`}>
            <div className={styles.imageContainer}>
                {certification.image_url && <img src={certification.image_url} alt={certification.title} />}
            </div>
            <h3 className={styles.title}>{certification.title}</h3>
            <p className={styles.entity}>{certification.issuing_entity}</p>
            <p className={styles.date}>{certification.date_acquisition}</p>
            <div className={`${styles.actions} flex-container`}>
                <button 
                    onClick={onEdit} 
                    className={styles.editBtn}
                    >
                        <BiIcons.BiEdit size={30} />
                </button>
                <button 
                    onClick={onDelete} 
                    className={styles.deleteBtn}
                    >
                        <BiIcons.BiTrash size={30}/>
                </button>
            </div>
        </div>
    )
}