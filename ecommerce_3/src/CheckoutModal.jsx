import { useContext, useRef, useState } from "react"
import { ShopContext } from "./context/shop_context"
import { useNavigate }  from 'react-router-dom';
import './style_neworgform.css'
import Swal from "sweetalert2";

const CheckoutModal = () => {

    const { cartItems, getTotalCartAmount, PRODUCTSDATA, handleTogMadal, userData} = useContext(ShopContext)

    const [ address, setAddress] = useState(false);    
    const [ isPendingC, setIsPendingC] = useState(false);    
    const redirectTo = useNavigate();
    const {totalAmount}= getTotalCartAmount()
    let ORDERS = useRef([])
    let CheckoutId = useRef(null)
    let seconds = Math.floor((new Date()/1000))
    userData && (CheckoutId.current = `U${userData.id}T${seconds}`)




    const handleCheckout = () => {
        // alert('handleCheckout')
        let firstName, middleName, lastName, email, phone

        let userId = userData.id
        firstName = userData.firstName
        middleName = userData.middleName
        lastName = userData.lastName
        email = userData.email
        phone = userData.phone
        const checkoutId = CheckoutId.current
        console.log('A CheckoutId.current')
        console.log(CheckoutId.current)

   
        // post the checkout as a whole
        ORDERS.current.map((order, i) => {
                ORDERS.current[i] = {...order, ['Address']: address}
        })

        let Orders = ORDERS.current

        console.log('Orders')
        console.log(Orders)

        const UserCheckout = {userId, firstName, middleName, lastName, email, phone, address, seconds, checkoutId, Orders };
        if(address === null || address === '' || address === false){
            Swal.fire('PLEASE ENTER SHIPPING ADDRESS');
        }
        else{
            setIsPendingC(true);
            fetch('http://localhost:7000/Checkouts', {method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(UserCheckout)
            })
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })
            .then(() => {
                setIsPendingC(false);
                redirectTo(`/?id=${userData.id}&od=ok`);
            })
        }


    }


    
    const ProcessORDERS =(productidx, productName, price, qty, currency, cost) => {
        let j = 0

        let myArray = ORDERS.current

            myArray.map((product, i) => {
            if(product.productid === productidx){
                j++
                myArray[i] = {
                    "productid": productidx, 
                    "productName": productName, 
                    "price": price, 
                    "qty": qty, 
                    "currency": currency, 
                    "cost": cost,
                    "status":"Recieved",
                    "OrderId": `${CheckoutId.current}O${i}`
                }
                
                ORDERS.current = myArray

                console.log('myArray.length');
                console.log(myArray.length);
                console.log(ORDERS.current);
                
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
             
      }
    
    


    const HandleSetORDERS =(productidx, productName, price, qty, currency, cost) => {
        let myArray = ORDERS.current
        if(myArray.length > 0 ){ ProcessORDERS(productidx, productName, price, qty, currency, cost)  
        }
           else{
                myArray = [...myArray, {
                "productid": productidx, 
                "productName": productName, 
                "price": price, 
                "qty": qty, 
                "cost": cost
              }]
              ORDERS.current = myArray
            }
        
      }



    return (
        <section className='CheckoutModal' >
            <div className="close-btn"  onClick={() => handleTogMadal('CLOSE') }  title="close registraion form modal.">&times;</div>
                    <h2>Checkout</h2>
                    

            <div className="main_flex_container ">
                <div className="flex_container">

                    <div className=" boxA box1A maxDivHeight colflex boxpadding">
                    <h3>Personal information</h3>

                         <div className="form-element  fullwidth ronly">
                             <label>first name</label>
                             <input type="text" name="detail" id="fname" placeholder="first name" value={userData ? userData.firstName : ''} title="enter first name." tabIndex="5" translate="yes" readOnly
                         /><br />
                         </div>
                         <div className="form-element fullwidth ronly">
                             <label>Middle name</label>
                             <input type="text" name="detail" id="mname" placeholder="Middle name" value={userData ? userData.middleName : ''}  title="enter Middle name." tabIndex="6" translate="yes" readOnly
                             /><br />
                         </div>
                         <div className="form-element fullwidth ronly">
                             <label>Last Name</label>
                             <input type="text" name="detail" id="lname" placeholder="last name" value={userData ? userData.lastName : ''}  title="enter last name." tabIndex="7" translate="yes" readOnly
                              /><br />
                         </div>
                    
                         <div className="form-element fullwidth ronly">
                             <label>Email</label>
                             <input type="email" name="detail" id="logEmail" placeholder="email" value={userData ? userData.email : ''}  title="enter email." tabIndex="8" translate="yes" readOnly
                              /><br />
                         </div>

                         <div className="form-element fullwidth ronly">
                             <label>Phone</label>
                             <input type="tel" name="detail" id="logPhone" placeholder="phone" value={userData ? userData.phone : ''}  title="enter phone." tabIndex="9" translate="yes" readOnly
                              /><br />
                         </div>



                    </div>
                    <div className="boxA box2A maxDivHeight colflex boxpadding">

                    <div className="form-element fullwidth">
                             <label>Shipping address</label>
                             <textarea rows='3'  name="address"  id="pw1" placeholder="adress" title="enter address." tabIndex="10" translate="yes" 
                             onChange = {(e) => setAddress(e.target.value)}  /><br />
                        </div>

                    <h3>Orders</h3>

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
                                    HandleSetORDERS(product.id, product.productName, product.price, cartItems[product.id], product.currency, product.price * cartItems[product.id])
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
                                    <td  align="justify" ><strong>Grand Total </strong></td>
                                    <td  colSpan="3"  align="center" ><strong>₦{totalAmount}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
		    </div>

            <div className="form-element fullwidth">
                {!isPendingC && <div className="button"  onClick={ handleCheckout } title="submit checkout." >Submit</div>}
                {isPendingC && <button>...loading...</button>}
            </div>

        </div>
        </section>
    )
}
export default CheckoutModal         