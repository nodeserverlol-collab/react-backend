import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "./carousel";
import MenuComponent from "./menu";

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // по умолчанию тёмная

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/currencies');
      console.log('Данные с бэка:', response.data);
      setCurrencies(response.data);
      if (response.data.length > 0) {
        setSelectedCurrency(response.data[0]);
      }
    } catch (error) {
      console.error('Ошибка загрузки валют:', error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    // Применяем тему при монтировании и её изменении
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', gap: 200, position: 'relative' }}>
      <MenuComponent currencies={currencies} onSelect={setSelectedCurrency} />
      <CardComponent currency={selectedCurrency} />
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isDarkTheme ? '#fff' : '#434343',
          color: isDarkTheme ? '#434343' : '#fff',
          fontWeight: 'bold',
          zIndex: 1000,
        }}
      >
        {isDarkTheme ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
      </button>
    </div>
  );
}