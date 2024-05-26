"use client"
import React, { useState, useEffect } from 'react';
import CartService from './CartService';
import { CartCard } from './CartCard';
import Image from 'next/image';

export const CartContainer = () => {
  const [carts, setCarts] = useState([]);

    useEffect(() => {
        const getCarts = async () => {
            try {
                const cartList = await CartService.getCartsByUserId("123");
                setCarts(Array.isArray(cartList) ? cartList : []);
            } catch (error) {
                console.log("Error", error);
            }
        };
        getCarts();
    }, []);

    const handleUpdateQuantity = async (cartId, quantity) => {
      try {
        const updatedCart = await CartService.updateCartQuantity(cartId, quantity);
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.id === cartId ? updatedCart : cart
          )
        );
      } catch (error) {
        console.log("Error updating quantity", error);
      }
    };

    const handleAddQuantity = (cartId) => {
      const cart = carts.find((cart) => cart.id === cartId);
      if (cart && cart.quantity < 10) {
        handleUpdateQuantity(cartId, cart.quantity + 1);
      }
    };
  
    const handleDecreaseQuantity = (cartId) => {
      const cart = carts.find((cart) => cart.id === cartId);
      if (cart && cart.quantity > 1) {
        handleUpdateQuantity(cartId, cart.quantity - 1);
      }
    };
  
    const handleDeleteCart = async (cartId) => {
      try {
        await CartService.deleteCart(cartId);
        setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== cartId));
      } catch (error) {
        console.log("Error deleting cart", error);
      }
    };

    const handleAddToCart = async (product) => {
      try {
        if (!carts.some(cart => cart.productId === product.productId)) {
          const newCartItem = await CartService.addCart(product);
          setCarts((prevCarts) => [...prevCarts, newCartItem]);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };

    const dummyProduct = {
      userId:"123",
      productId:"789",
      productName:"Mario Kart 2", 
      productPrice:500000, 
      productDescription:"This is Italian Plumber Driving banana car", 
      quantity:1
    }

    const dummyProduct2 = {
      userId:"123",
      productId:"567",
      productName:"Mario Kart Deluxe", 
      productPrice:500000, 
      productDescription:"This is Italian Plumber Driving cool car", 
      quantity:1
    }

  console.log(carts)
  return (
      <div className='py-10 px-32'>
      <div className='flex justify-center items-center py-5'>
          <h1 className='font-bold text-3xl text-bold'>Your Game Cart</h1>
          <Image 
              src={"/static/images/image1.png"}
              alt="PS1 Image"
              quality={100}
              width={200}
              height={200}
              sizes="10vw"          
            />
      </div>
      <div className='flex flex-col gap-5'>
          {carts.map((cart, index) => (
            <CartCard
              key={index}
              cart={cart}
              onAddQuantity={() => handleAddQuantity(cart.id)}
              onDecreaseQuantity={() => handleDecreaseQuantity(cart.id)}
              onDeleteCart={() => handleDeleteCart(cart.id)}
            />
          ))}
      </div>
      <div className='flex justify-center items-center py-5'>
          <h1 className='font-bold text-3xl text-bold'>Add Other Games to Your Cart</h1>
      </div>
      <div className='flex justify-center items-center py-5'>
        <button 
          onClick={() => handleAddToCart(dummyProduct)} 
          className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
        >Add Mario Kart 2 to Your Cart
        </button>
        <button 
          onClick={() => handleAddToCart(dummyProduct2)} 
          className="bg-gray-500 text-white px-4 py-2 rounded"
          >Add Mario Kart Deluxe to Your Cart
        </button>
      </div>
  </div>
  )
}
