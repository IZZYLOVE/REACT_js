import React, { useContext } from 'react'
import { ShopContext } from '../../../context/shop_context'
import { CartItem } from './CartItem'
import './cart.css'
import Swal from 'sweetalert2'


const Cart = () => {
    const { cartItems, getTotalCartAmount, PRODUCTSDATA, handleTogMadal, loggedIn } = useContext(ShopContext)
    
    const {totalAmount}= getTotalCartAmount()

    const alertlogin = () => {
        Swal.fire('PLEASE LOGIN!')
    }


  return (
    <div className='popupRCart cartmaxDivHeight'>
    <div className='close-btn' onClick={() => handleTogMadal('CLOSE') } title="close cart modal.">&times;</div>
    <div className='cart'>

        <h1>CART</h1>
       <div className='cartItems'>
        {PRODUCTSDATA && PRODUCTSDATA.map((product, i) => {

            if(cartItems[product.id] > 0){
               return <CartItem data={product} mykey={cartItems[product.id] }/> ;
            }
            return<></>
        })}
        </div> 
        {totalAmount > 0 ? (
        <div className='checkout'>
            <p>Sum Total: ₦{totalAmount}</p>
            <button  onClick={() => handleTogMadal('CLOSE') }> Continue Shopping</button>
            {loggedIn === false ?(
                    <button onClick={ alertlogin }>Checkout</button>
                ):(
                    <button  onClick={() => handleTogMadal('CHECKOUT') }>Checkout</button>
                )
            }
        </div>
        ):(
            <h1>Your cart is empty</h1>
        )
        }

    </div>
    </div>
  )
}

export default Cart