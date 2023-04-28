import { useContext, useEffect, useRef, useState } from "react"
import { ShopContext } from "./context/shop_context"
import './style_neworgform.css'


  

const OrdersModal = () => {
    const { handleTogMadal, userData, userOrders} = useContext(ShopContext)  
    // let  myUserOrders = useRef([])
    let  userDataid = useRef(0)
  const [displayOrders, setDisplayOrders] = useState('You have no rescent order');


    userData && (userDataid = userData.id )


    
    useEffect(() => {
        const handleSetDisplayOrders= () => {
            let myMapColor
            let AvaiableOrders = userOrders.length && userOrders.map((product, i) => {
                i % 2 === 0 ? myMapColor="#EBEBEB" : myMapColor="#CFD2D2"
                return (
                    <>
                    <table  border="1"  width="100%" align="center" bgcolor={myMapColor} key={product.OrderId}>
                        <thead>
                            <tr>
                                <th  width="60%"   align="justify" ><strong>PRODUCT</strong></th>
                                <th  width="10%"   align="center" ><strong>{product.currency}PRICE</strong></th>
                                <th  width="10%"   align="center" ><strong>QTY</strong></th>
                                <th  width="10%"   align="center" ><strong>{product.currency}COST</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td  width="60%" align="left" >{product.productName}</td>
                                <td  width="10%" align="center" >{product.price}</td>
                                <td  width="10%" align="center" >{product.qty}</td>
                                <td  width="10%" align="center" >{product.cost }</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2" align="justify" ><strong>ORDERID </strong></td>
                                <td colSpan="2" align="center" ><strong>{product.OrderId}</strong></td>

                            </tr>
                            <tr>
                                <td colSpan="2" align="justify" ><strong>ORDER STATUS</strong></td>
                                <td colSpan="2" align="center" ><strong>{product.status}</strong></td>
                            </tr>
                            <tr>
                                <td  colSpan="5" align="center" ><strong>SHIPPING ADDRESS</strong></td>
                            </tr>                            
                            <tr>
                            <td  colSpan="5" align="justify" >{product.Address}</td>
                            </tr>
                        </tfoot>
                    </table>
                </>
            ) ;

        })
    
        AvaiableOrders && setDisplayOrders(AvaiableOrders)

        }
        handleSetDisplayOrders()

        return () => {
          // this now gets called when the component unmounts
    };
    }, [userOrders, ]);
 

    return (
        <section className='OrdersModal' >
            <div className="close-btn"  onClick={() => handleTogMadal('CLOSE') }  title="close registraion form modal.">&times;</div>
            <div className="heightControl">
                    <h2>{userDataid > 0 ? (`${userData.firstName.toUpperCase()} ${userData.middleName.toUpperCase()} ${userData.lastName.toUpperCase()} `): ''}</h2>
                    <h3>ORDER(S)</h3>
                    
                    <div className="form-element fullwidth">
                        {displayOrders}
                    </div>

            </div>
        </section>
    )
}
export default OrdersModal         