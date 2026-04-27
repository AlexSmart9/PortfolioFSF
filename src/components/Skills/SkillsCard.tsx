import * as BiIcons from 'react-icons/bi';
import * as SiIcons from 'react-icons/si';
import styles from './SkillsCard.module.css';
import {type Skill} from './Skills';

interface SkillCardProps {
    skill: Skill;
    onEdit: () => void;
    onDelete: () => void;
}

const iconColorsMap: Record<string, string> = {
    SiJavascript: '#F7DF1E',
    SiHtml5: '#E34C26',
    SiCss3: '#1572B6',
    SiPostgresql: '#336791',
    SiNodedotjs: '#339933',
    SiReact: '#61DAFB',
    SiTypescript: '#3178C6',
    SiPhp: '#777BB4',
    SiGit: '#F05032',
    SiDocker: '#2496ED',
    SiMongodb: '#47A248',
    SiPython: '#3776AB',
    BiNetworkChart: '#00ff15'
};

export const SkillCard = ({skill, onEdit, onDelete}: SkillCardProps) => {

    const renderIcon = (iconName : string) => {

        let IconComponent;
        let iconColor = '#04eeff';

        if (iconColorsMap[iconName]) {
            iconColor = iconColorsMap[iconName];
        };

        if (iconName.startsWith('Si')) {
            IconComponent = (SiIcons as any)[iconName];

        } else if (iconName.startsWith('Bi')) {
            IconComponent = (BiIcons as any)[iconName];
        };

        if (IconComponent) {
            return <IconComponent size={32} color={iconColor} />;

        };

        return <BiIcons.BiQuestionMark size={32} color="#ff4d4d" title={`Icono '${iconName}' no encontrado`}/>;

    };

    return (
        <div className={`${styles.card__container} flex-container`}>
            <div className={styles.card__header}>
                {renderIcon(skill.icon_class)}
            </div>
            <div className={styles.card__content}>
                <h3>{skill.name}</h3>
                <p>{skill.category}</p>
            </div>
            <div className={`${styles.actions} flex-container`}>
                <button 
                    className={styles.editBtn}
                    onClick={onEdit}
                    arial-label={`Update ${skill.name}`}
                >
                    <BiIcons.BiEdit size={30} />
                </button>
                <button 
                    onClick={onDelete}
                    arial-label={`Delete ${skill.name}`}
                    className={styles.deleteBtn}
                >
                    <BiIcons.BiTrash size={30} />
                </button>
            </div>
        </div>
    )


}

