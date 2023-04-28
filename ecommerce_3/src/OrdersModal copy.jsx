import { useContext, useRef, useEffect, useState } from "react"
import { ShopContext } from "./context/shop_context"
import './style_neworgform.css'


  

const OrdersModal = () => {
    const { cartItems, getTotalCartAmount, PRODUCTSDATA, handleTogMadal, userData} = useContext(ShopContext)
    const {totalAmount}= getTotalCartAmount()
    const [ myOrders, setMyOrders] = useState(false);    

    let ORDERS = useRef([])

    const HandleShowORDERS =(productidx, productName, price, qty, currency, cost) => {
        // alert('handleSetORDERS')

        let j = 0
        let myArray=ORDERS.current

        
        myArray.length ? (myArray.map((product, i) => {
             if(product.productid === productidx){
                j++
                
                myArray[i] = {
                    "productid": productidx, 
                    "productName": productName, 
                    "price": price, 
                    "qty": qty, 
                    "currency": currency, 
                    "cost": cost
                }
                
                ORDERS.current = myArray
                
                }
                
                if(j === 0 && i === myArray.length-1){
                    myArray = [...myArray, {
                        "productid": productidx, 
                        "productName": productName, 
                        "price": price, 
                        "qty": qty, 
                        "cost": cost
                    }]
                    ORDERS.current = myArray
                }
                
                return(<></>)

             }
             )
             ):(
                myArray = [...myArray, {
                "productid": productidx, 
                "productName": productName, 
                "price": price, 
                "qty": qty, 
                "cost": cost
              }],
              ORDERS.current = myArray
             ) 

            console.log('ORDERS');
            console.log(ORDERS.current);
            
            console.log('myArray');
            console.log(myArray);
      }


    return (
        <section className='OrdersModal' >
            <div className="close-btn"  onClick={() => handleTogMadal('CLOSE') }  title="close registraion form modal.">&times;</div>
                    <h2>{userData ? (`${userData.firstName.toUpperCase()} ${userData.middleName.toUpperCase()} ${userData.lastName.toUpperCase()} `): ''}</h2>
                    <h3>ORDER(S)</h3>
                    
                    <div className=" boxpadding">

                    <div className="form-element fullwidth">
                        <table border="1"  width="100%" align="center" bgcolor="#EBEBEB">
                            <thead>
                                <tr>
                                    <th  width="60%"   align="justify" ><strong>PRODUCT</strong></th>
                                    <th  width="10%"   align="center" ><strong>PRICE</strong></th>
                                    <th  width="10%"   align="center" ><strong>QTY</strong></th>
                                    <th  width="10%"   align="center" ><strong>COST</strong></th>
                                
                                </tr>
                            </thead>
                            <tbody>


                            {PRODUCTSDATA && PRODUCTSDATA.map((product, i) => {

                                if(cartItems[product.id] > 0){
                                    HandleShowORDERS(product.id, product.productName, product.price, cartItems[product.id], product.currency, product.price * cartItems[product.id])
                                    return (
                                        <tr>
                                            <td  width="60%" align="left" >{product.productName}</td>
                                            <td  width="10%" align="center" >{product.price}</td>
                                            <td  width="10%" align="center" >{cartItems[product.id]}</td>
                                            <td  width="10%" align="center" >{product.price * cartItems[product.id] }</td>
                                        </tr>
                                    ) ;
                                    }
                                    return<></>
                                })}
    

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td  colSpan="2"  align="justify" ><strong>Grand Total </strong></td>
                                    <td  colSpan="2"  align="center" ><strong>₦{totalAmount}</strong></td>
                                </tr>
                                <tr> 
                                    <td  colSpan="2"  align="justify" ><strong>Order Id </strong></td>
                                    <td  colSpan="2"  align="center" ><strong>₦{totalAmount}</strong></td>
                                </tr>
                                <tr>
                                    <td  colSpan="2"  align="justify" ><strong>Order Status</strong></td>
                                    <td  colSpan="2"  align="center" ><strong>₦{totalAmount}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>
        </section>
    )
}
export default OrdersModal         