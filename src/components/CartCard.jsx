import React from 'react'

export const CartCard = ({ cart, onAddQuantity, onDecreaseQuantity, onDeleteCart }) => {
  return (
    <div className='border-gray border-2 p-5 rounded-xl'>
        <div>Game Name : {cart.productId}</div>
        <div>Game Name : {cart.productName}</div>
        <div>Description : {cart.productDescription}</div>
        <div>Price : {cart.productPrice}</div>
        <div>Amount : {cart.quantity}</div>
        <div className='flex space-x-2 justify-end'>
          <button className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700' onClick={onAddQuantity}>Add</button>
          <button className='bg-gray-500 text-white py-2 px-4 mr-2 rounded hover:bg-gray-700' onClick={onDecreaseQuantity}>Decrease</button>
          <button className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700' onClick={onDeleteCart}>Delete</button>
        </div>

    </div>
  )
}