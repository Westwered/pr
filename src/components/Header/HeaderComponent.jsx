import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from './HeaderComponent.module.css';

function HeaderComponent() {
    const { user, logout } = useAuth();

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>CyberClub</Link>
            <nav className={styles.nav}>
                {user ? (
                    <>
                        {user.role_id === 1 && (
                            <Link to="/admin" className={styles.nav_link}>Админ-панель</Link>
                        )}
                        <Link to='/profile' className={styles.nav_link}>Профиль</Link>
                        <button onClick={logout} className={styles.logout_button}>Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.nav_link}>Вход</Link>
                        <Link to="/register" className={styles.nav_link}>Регистрация</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default HeaderComponent;
