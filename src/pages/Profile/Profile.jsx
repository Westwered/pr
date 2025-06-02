import { useAuth } from "../../context/AuthContext";
import HeaderComponent from "../../components/Header/HeaderComponent";
import styles from './Profile.module.css';

function Profile() {
    const { user } = useAuth();
    const username = user?.username || "Гость";

    const tournaments = [
        { id: 1, name: "Cyber Clash", date: "25 мая 2025", registered: true },
        { id: 2, name: "Night Brawl", date: "1 июня 2025", registered: false },
        { id: 3, name: "E-Arena Masters", date: "10 июня 2025", registered: false },
    ];

    return (
        <div className={styles.page_container}>
            <HeaderComponent />
            <div className={styles.profile_container}>
                <h2 className={styles.username}>Профиль: {username}</h2>
                <h3 className={styles.subheading}>Турниры</h3>

                <div className={styles.tournament_list}>
                    {tournaments.map(t => (
                        <div key={t.id} className={styles.tournament_card}>
                            <h4>{t.name}</h4>
                            <p>Дата: {t.date}</p>
                            {t.registered ? (
                                <span className={styles.registered}>Вы зарегистрированы</span>
                            ) : (
                                <button className={styles.fake_button}>Зарегистрироваться</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
