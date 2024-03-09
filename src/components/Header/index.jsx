import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>TestTask</div>
            <div className={styles.nav}>
                <Link className={styles.navLink} to="cat">
                    Cat
                </Link>
                <Link className={styles.navLink} to="age">
                    Age
                </Link>
            </div>
        </header>
    );
};
