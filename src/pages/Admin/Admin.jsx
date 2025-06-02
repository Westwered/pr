import { useState } from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import styles from './Admin.module.css';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

function Admin() {
    const [computers, setComputers] = useState([]);
    const [room, setRoom] = useState("");
    const [costs, setCosts] = useState([]);
    const [showTotal, setShowTotal] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllInfo = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/info/all");
            const data = await res.json();
            setComputers(data);
            setError(null);
            setCosts([]);
            setShowTotal(false);
        } catch (err) {
            setError("Ошибка при получении компьютеров");
        }
    };

    const fetchRoomInfo = async () => {
        if (!room.trim()) return setError("Введите номер комнаты");

        try {
            const res = await fetch(`http://localhost:5000/api/info/room/${room}`);
            const data = await res.json();
            setComputers(data);
            setError(null);
            setCosts([]);
            setShowTotal(false);
        } catch (err) {
            setError("Ошибка при запросе комнаты");
        }
    };

    const fetchCosts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/info/cost");
            const data = await res.json();
            setCosts(data);
            setComputers([]);
            setError(null);
            setShowTotal(false);
        } catch (err) {
            setError("Ошибка при получении затрат");
        }
    };

    const calculateTotal = () => {
        const total = costs.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
        return total.toFixed(2);
    };

    const downloadRoomReport = async () => {
        if (computers.length === 0) {
            alert("Нет данных по комнате для отчёта");
            return;
        }

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Отчёт по комнате №${room}`,
                                    bold: true,
                                    size: 28,
                                }),
                            ],
                        }),
                        ...computers.map((comp, index) =>
                            new Paragraph(
                                `${index + 1}. IP: ${comp.ip}, Пользователь: ${comp.username_player}, Роль: ${comp.role_id}`
                            )
                        ),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `Комната_${room}.docx`);
    };

    return (
        <div>
            <HeaderComponent />
            <div className={styles.page_container}>
                <div className={styles.panel_container}>
                    <button className={styles.action_button} onClick={fetchAllInfo}>
                        Получить данные всех компьютеров
                    </button>

                    <div className={styles.room_query}>
                        <input
                            className={styles.input}
                            placeholder="Номер комнаты"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                        <button className={styles.action_button} onClick={fetchRoomInfo}>
                            Сделать запрос на комнату
                        </button>
                        {computers.length > 0 && (
                            <button className={styles.action_button} onClick={downloadRoomReport}>
                                📄 Скачать отчёт по комнате
                            </button>
                        )}
                    </div>

                    <button className={styles.action_button} onClick={fetchCosts}>
                        Запрос сети затрат
                    </button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {computers.length > 0 && (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IP</th>
                                <th>Пользователь</th>
                                <th>Комната</th>
                                <th>Роль</th>
                            </tr>
                        </thead>
                        <tbody>
                            {computers.map((comp) => (
                                <tr key={comp.id}>
                                    <td>{comp.id}</td>
                                    <td>{comp.ip}</td>
                                    <td>{comp.username_player}</td>
                                    <td>{comp.room}</td>
                                    <td>{comp.role_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {costs.length > 0 && (
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Оборудование</th>
                                    <th>Количество</th>
                                    <th>Цена</th>
                                    <th>Итого</th>
                                </tr>
                            </thead>
                            <tbody>
                                {costs.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.equipment}</td>
                                        <td>{item.count}</td>
                                        <td>{item.price}</td>
                                        <td>{item.total_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!showTotal && (
                            <button
                                className={styles.action_button}
                                onClick={() => setShowTotal(true)}
                            >
                                Посчитать итог
                            </button>
                        )}
                        {showTotal && (
                            <p className={styles.total_text}>
                                💰 Общая стоимость: <strong>{calculateTotal()} $</strong>
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;
