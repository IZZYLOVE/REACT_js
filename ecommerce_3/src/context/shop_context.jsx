import React, { createContext, useReducer, useState, useRef, useEffect} from 'react'
import Swal from "sweetalert2"

//import { myReducer } from '../components/reducer/myReducer';


export const ShopContext  = createContext(null);




export const ShopContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData]= useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [inDashboard, setInDashboard] = useState(false);
    const [renderTargetItem, setRenderTargetItem] = useState('');
    const [CartUnitPrice, setCartUnitPrice] = useState([]);
    const [PRODUCTSDATA, setPRODUCTSDATA] = useState([]);
    const [cartItemNumber2, setCartItemNumber2] = useState(0);
    const [targetProductId, setTargetProductId] = useState(0);


    const stateRef = useRef([])
    // const cartItemNumber2 = useRef(0)
    


    const HandleParams = () => {
      let params = (new URL(document.location)).searchParams;
      let id = params.get('id');
      useEffect(() => {
        if(id > 0){
          setLoggedIn(true)
        }
      }, [id]);
    
  }  
  
  HandleParams()


  const getAvailableQty = async(productId) => {
    let url = `http://localhost:7000/Products/${productId}`
      const fetchData = async (url) => {
        const Quantity = await fetch(url)
        .then(res => {
          if(!res.ok){
            throw Error('could not fetch the data for that resource')
          }
          return res.json();
        })
        .then(data => {
          return data.quantity
        })
        return Quantity
        }
        const aQuantity = fetchData(url)  
        return aQuantity
  }

  const assigncartItemData = (cartData, product, price) => {
    cartData[product] = 0
    stateRef.current=[...CartUnitPrice, {'price': price, 'id': product}]
    setCartUnitPrice(stateRef.current)
  }


  
  const check4cartItem = (cartData, product, price) => {
      cartData[product]?( console.log('inCart') 
      ):(
        assigncartItemData(cartData, product, price)
      )
      return cartData;
  }


const getAvailableOrders= async(userId) => {
  let url = 'http://localhost:7000/Checkouts'
    const fetchData = async (url) => {
      const myOrders = await fetch(url)
      .then(res => {
        if(!res.ok){
          throw Error('could not fetch the data for that resource')
        }
        return res.json();
      })
      .then(data => {
          let myOrders = []
          data.length > 0 ? (data.map((data, i) => {
            
            if(Number(userId) === Number(data.userId)){
              // alert(userId+' getAvailableOrders '+data.userId)
                myOrders = [...myOrders, ...data.Orders, ]
            }
            return(myOrders)
          })
          ):(
            console.log('new blog added')
          )
          return myOrders
      })
      return myOrders
      }
      const myOrders = fetchData(url)  
      return myOrders
}



  const cartItemsReducer = (cartItems, action) => {
    let itemId  = action.itemId
    let newcount;
    action.newcount ? newcount = action.newcount : newcount = 0
    switch(action.type){
      case "ADD":
        cartItems = {...cartItems, [itemId]:cartItems[itemId]+1}
        console.log('newCat items')
        console.log(cartItems[itemId])
        setCartItemNumber2({"itemId" : itemId, "qty" : cartItems[itemId]})
        console.log('cartItemNumber2')
        console.log(cartItemNumber2)
        return(cartItems) 
      case "REMOVE":
        return({...cartItems, [itemId]:cartItems[itemId]-1})      
      case "SETNEW":
        return({...cartItems, [itemId]:newcount})
      default:
        return(cartItems)
    } 
  }


    const [cartItems, setCartItems] = useReducer(cartItemsReducer, {});

    

    const handleAddToCart = async (action) => {
      let itemId  = action.itemId
      let newcount;
      action.newcount ? newcount = action.newcount : newcount = 0
      const aQuantity = await getAvailableQty(itemId)

      check4cartItem(cartItems, itemId)
      switch(action.type){
        case "ADD":
          aQuantity > cartItems[itemId] ? setCartItems({type: "ADD", itemId: itemId}) : setCartItems({type: "SETNEW", newcount: aQuantity, itemId: itemId})
          return(<></>)        
        case "SETNEW":
          return(
            aQuantity > cartItems[itemId] && aQuantity > newcount ?  setCartItems({type: "SETNEW", newcount: newcount, itemId: itemId}) : setCartItems({type: "SETNEW", newcount: aQuantity, itemId: itemId})
          )
        default:
          return(action)
      } 
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        let totalUniqueItems = 0;
    
        for(const item in cartItems){
            let itemInfo = 0
            PRODUCTSDATA.length > 0 && (itemInfo = PRODUCTSDATA.find((product) => product.id === Number(item)))
            totalAmount += cartItems[item] * itemInfo.price
            if(cartItems[item] > 0){
                totalUniqueItems += 1;
            }
        }
        
        return {totalAmount, totalUniqueItems}
    }



    const handleCloseMadal = () => {
      document.querySelector(".popupLogin").classList.remove("active")
      document.querySelector(".popupReg").classList.remove("active")
      document.querySelector(".productDetails").classList.remove("active")
      document.querySelector(".popupRCart").classList.remove("active")
      document.querySelector(".popupReset").classList.remove("active")
      document.querySelector(".OrdersModal").classList.remove("active")
      document.querySelector(".CheckoutModal").classList.remove("active")
    }


    const handleTogMadal = (action) => {
      switch(action){
        case "SHOWLOGIN":
            return(
              handleCloseMadal(),
              document.querySelector(".popupLogin").classList.add("active")
            )
        case "SHOWREGISTER":
            return(
              handleCloseMadal(),
              document.querySelector(".popupReg").classList.add("active")
            )
        case "SHOWRESET":
            return(
              handleCloseMadal(),
              document.querySelector(".popupReset").classList.add("active")
            )
        case "CLOSE":
            return( handleCloseMadal() )
        case "REGISTER":
            return(
              handleCloseMadal(),
              document.querySelector(".popupReg").classList.add("active")
            )
        case "RESET":
            return(
              handleCloseMadal(),
              document.querySelector(".popupReset").classList.add("active")
            )
        case "SHOWPRODUCTDETAILS":
          return(
            handleCloseMadal(),
            document.querySelector(".productDetails").classList.add("active")
            )
        case "SHOWCART":
          return(
            handleCloseMadal(),
            document.querySelector(".popupRCart").classList.add("active")
            // alert(' handleTogMadal SHOWCART ')
            )
        case "LOGGEDIN":
          return(
            handleCloseMadal(),
            setLoggedIn(true)
          )
        case "CHECKOUT":
          return(
            handleCloseMadal(),
            document.querySelector(".CheckoutModal").classList.add("active"),
            setLoggedIn(true)
          )
        case "LOGGEDOUT":
          return(
            handleCloseMadal(),
            setUserData([]),
            setLoggedIn(false),
            setPRODUCTSDATA([]),
            Swal.fire('YOU ARE NOW LOGGED OUT')
          )
        case "SHOWORDERS":
          return(
            handleCloseMadal(),
            document.querySelector(".OrdersModal").classList.add("active")
            )
        default:
          return(action)
      } 
    }



const contextValue = {cartItems, setCartItems, getTotalCartAmount, handleTogMadal, renderTargetItem, setRenderTargetItem, getAvailableOrders, userOrders, setUserOrders,
  PRODUCTSDATA, setPRODUCTSDATA, loggedIn, setLoggedIn, inDashboard, setInDashboard, isAdmin, setIsAdmin, userData, setUserData, handleAddToCart, cartItemNumber2, setCartItemNumber2,
  targetProductId, setTargetProductId}

  return (
    <ShopContext.Provider value={ contextValue } >
        { props.children }
    </ShopContext.Provider> 
  )
}