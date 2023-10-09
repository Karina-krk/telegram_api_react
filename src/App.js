import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header/Header'
import { ProductList } from './components/ProductList/ProductList'
import { Form } from './components/Form/Form'
import { SpeedDialButton } from './components/SpeedDialButton/SpeedDialButton'
// import { useTelegram } from './hooks/useTelegram'

const products = [
  { id: '1', title: "Iphone 15", price: 500000, description: "Новый телефон", image: "../../assets/iphone-15.jpg" },
  { id: '2', title: "Samsung Galaxy S22", price: 480000, description: "Лучший выбор для Android-пользователей", image: "" },
  { id: '3', title: "Google Pixel 7", price: 450000, description: "Отличная камера и чистый Android опыт", image: "" },
  { id: '4', title: "OnePlus 10 Pro", price: 520000, description: "Высокая производительность и быстрая зарядка", image: "ссылка на изображение 4" },
  { id: '5', title: "Xiaomi Mi 12", price: 470000, description: "Инновационные функции по доступной цене", image: "ссылка на изображение 5" },
  { id: '6', title: "Huawei P50", price: 490000, description: "Превосходный дизайн и мощная камера", image: "ссылка на изображение 6" },
] 
function App() {
  // const { tg } = useTelegram()

  useEffect(() => {
    const tg = window.Telegram.WebApp
    tg.ready()
  }, [])

  return (
    <div className="App">
      <Header>Заголовок</Header>
      <Routes>
        <Route index element={<ProductList products={products} />}></Route>
        <Route path={'form'} element={<Form />}></Route>
      </Routes>
      <SpeedDialButton products={products} />
    </div>
  )
}

export default App