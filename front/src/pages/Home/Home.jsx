import HeaderComponent from "../../components/Header/HeaderComponent"
import { Link } from "react-router-dom";
import styles from "./Home.module.css"
import image from "../../assets/image.jfif"

function Home() {
    return (
        <div className={styles.home_page}>
            <HeaderComponent />
            <main className={styles.home_content}>
                <h1>Добро пожаловать в CyberClub</h1>
                <p>Участвуй в турнирах, следи за рейтингом и стань киберлегендой.</p>
                <img src={image} alt="Киберклуб с игровыми зонами" />

                <section className={styles.intro}>
                    <h2>Что такое CyberClub?</h2>
                    <p>
                        CyberClub — это место, где геймеры собираются, чтобы участвовать в онлайн- и офлайн-турнирах,
                        общаться с единомышленниками и прокачивать свои навыки. У нас ты найдешь команду, поддержку и признание!
                    </p>
                    <h2>О клубе</h2>
                    <p>
                        Наш киберклуб — это не просто игровое пространство, а полноценный хаб для любителей киберспорта.
                        В распоряжении игроков:
                    </p>
                    <p>💻 Современные игровые ПК с RTX-видеокартами и 240Hz мониторами</p>
                    <p>🎧 Профессиональные гарнитуры и механические клавиатуры</p>
                    <p>🛋️ Зоны отдыха с мягкими пуфами, напитками и закусками</p>
                    <p>🎥 Прямая трансляция турниров и стрим-зона для участников</p>
                    <p>🎮 Поддержка популярных игр: CS2, Dota 2, Valorant, League of Legends, Fortnite и др.</p>
                </section>

                <section className={styles.benefits}>
                    <h2>Почему именно мы?</h2>
                    <p>🎮 Регулярные турниры по популярным играм</p>
                    <p>🏆 Личная система рейтинга и награды</p>
                    <p>🧑‍🤝‍🧑 Дружелюбное сообщество игроков</p>
                    <p>📢 Поддержка в Discord и соцсетях</p>
                    <p>🛠️ Техподдержка и помощь новичкам</p>
                </section>

                <section className={styles.call_to_action}>
                    <h2>Готов к игре?</h2>
                    <p>Создай аккаунт, вступи в команду и покажи, на что ты способен!</p>
                    <button className={styles.join_button}>
                        <Link to="/register">Присоединиться</Link>
                    </button>
                </section>

                <section className={styles.testimonials}>
                    <h2>Отзывы участников</h2>
                    <blockquote>
                        <p>«CyberClub — лучшее, что со мной случалось в гейминге!»</p>
                        <cite>— Никита, участник турниров</cite>
                    </blockquote>
                    <blockquote>
                        <p>«Здесь я нашёл команду мечты и поднялся в топ-10!»</p>
                        <cite>— Аня, игрок CS2</cite>
                    </blockquote>
                    <blockquote>
                        <p>«Отличная атмосфера, топовое оборудование и настоящая киберсемья!»</p>
                        <cite>— Дима, стример</cite>
                    </blockquote>
                </section>
            </main>
        </div>
    );
}

export default Home;