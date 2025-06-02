import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/Header/HeaderComponent";
import styles from './Register.module.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Регистрация успешна!');
                navigate('/login'); // перенаправляем на страницу входа
            } else {
                alert(data.error || 'Ошибка регистрации');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка подключения к серверу');
        }
    };

    return (
        <div className={styles.page_container}>
            <HeaderComponent />
            <div className={styles.form_container}>
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Пароль:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
