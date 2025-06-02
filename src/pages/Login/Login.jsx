import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import HeaderComponent from "../../components/Header/HeaderComponent";
import styles from './Login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // получаем функцию login() из контекста

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                login(data.user);
                navigate("/profile");
            } else {
                alert(data.error || "Ошибка авторизации");
                console.log(res.status)
            }

        } catch (err) {
            alert("Ошибка подключения к серверу");
            console.error(err);
        }
    };

    return (
        <div className={styles.page_container}>
            <HeaderComponent />
            <div className={styles.form_container}>
                <h2>Вход</h2>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
