import React, { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux' 
import CartItem from './cartItem';
import { emptyCart, toggleStatusTab } from '../stores/cart';
import { products } from '../products';
import { useAlert } from 'react-alert';
import MessageBox from './MessageBox';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const [total, setTotal] = useState('')
    const alert = useAlert()
    // Function to calculate the total price based on the cart items
function calculateTotalPrice(cart, products) {
    let totalPrice = 0;
  
    // Iterate through each item in the cart
    cart.forEach(item => {
      // Find the product in the products array using the productId
      const product = products.find(product => product.id === item.productId);
      
      // Calculate the total price for the current product and add it to the overall total
      if (product) {
        totalPrice += product.price * item.quantity;
      } else {
        console.log(`Product with ID ${item.productId} not found.`);
      }
    });
  
    return totalPrice;
  }

    useEffect(() => {
        const total = calculateTotalPrice(carts, products);
        setTotal(total)
    }, [carts])


    const dispatch = useDispatch();
    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }

    const clearCartHandler=()=>{
      dispatch(emptyCart())
      alert.info('All items are removed from cart!')
    }
  return (
    <div className={`cart fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}>
        <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
        <div className='p-5'>
            {carts.map((item, key) => 
                <CartItem key={key} data={item}/>
            )}
            {carts.length > 0 ? (
              <>
                <div className='flex justify-between mt-2'>
            <h1 className='text-white'>Total Price</h1>
            <p className='text-white'>{total}</p>
            </div>
            <div>
               <button className='mt-5 bg-black p-1 border-8 border-black rounded-md text-xs float-right text-white' onClick={clearCartHandler}>empty cart</button>
              </div>
              </>
        ):(
          <MessageBox>Cart is empty.Let's fill up your cart with some amazing finds!</MessageBox>
        )}
        </div>
        <div className='grid grid-cols-2'>
            <button className='bg-black text-white' onClick={handleCloseTabCart}>CLOSE</button>
            <button className='bg-amber-600 text-white'>CHECKOUT</button>
        </div>
    </div>
  )
}

export default CartTab