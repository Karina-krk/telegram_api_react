import React, { useState, useCallback, useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { ProductCard } from '../ProductCard/ProductCard'
import './ProductList.css'

const products = [
  { id: '1', title: "Iphone 15", price: 500000, description: "Новый телефон", image: "../../assets/iphone-15.jpg" },
  { id: '2', title: "Samsung Galaxy S22", price: 480000, description: "Лучший выбор для Android-пользователей", image: "" },
  { id: '3', title: "Google Pixel 7", price: 450000, description: "Отличная камера и чистый Android опыт", image: "" },
  { id: '4', title: "OnePlus 10 Pro", price: 520000, description: "Высокая производительность и быстрая зарядка", image: "ссылка на изображение 4" },
  { id: '5', title: "Xiaomi Mi 12", price: 470000, description: "Инновационные функции по доступной цене", image: "ссылка на изображение 5" },
  { id: '6', title: "Huawei P50", price: 490000, description: "Превосходный дизайн и мощная камера", image: "ссылка на изображение 6" },
]

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

export const ProductList = () => {

  const { tg, queryId } = useTelegram()
  const [addedItems, setAddedItems] = useState([])

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId
    }

      fetch('http://localhost/8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
  }, [addedItems, queryId])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [tg, onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if (newItems.length === 0) {
      tg.MainButton.hide()
    }
    else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  return (
    <div className={'list'}>
      {products.map(item => (
        <ProductCard
          product={item}
          onAdd={onAdd}
          className={'item'}>
        </ProductCard>
      ))}
    </div>
  )
}
