import React, { useContext, useEffect, useRef, useState } from 'react'
import Product from './products'
import './shop.css'
import { ShopContext } from '../../../context/shop_context';
import Swal from 'sweetalert2';
// import useFetchdata from '../../../useFetchdata'


const Shop = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [Loded, setLoded] = useState(false);
  const {setPRODUCTSDATA, setUserData, handleTogMadal, getAvailableOrders, setUserOrders} = useContext(ShopContext)
  let ProdDatRef = useRef([])
  let myUserData = useRef([])
  let myUserOrders= useRef([])
  let myUserId = useRef(null)

  const HandleParams = () => {
  let params = (new URL(document.location)).searchParams;
  let regsuc = params.get('regsuc');
  let id = params.get('id');
  myUserId.current = id
  useEffect(() => {
    if(regsuc === 'ok'){
      Swal.fire('REGISTRATION SUCCESSFUL, ENJOY SHOPPING');
    }
  }, [regsuc]);

  

  useEffect(() => {
    if(id > 0){

      let url = `http://localhost:7000/Users/${id}`
      const fetchData = async (url) => {
        await fetch(url)
        .then(res => {
          if(!res.ok){
            throw Error('could not fetch the data for that resource')
          }
          return res.json();
        })
        .then(data => {
          myUserData.current = data
          setUserData(data)
          handleTogMadal('LOGGEDIN')
// setPRODUCTSDATA(ProdDatRef.current)

        })
    }
    fetchData(url)  
    }
  }, [id]);


  setUserData(myUserData.current)
  }
  HandleParams()



useEffect(() => {
    const getUsers = async () => {

      let url = 'http://localhost:7000/Products'
      fetch(url)
      .then(res => {
          if(!res.ok){
            setIsPending(false);
              throw Error('could not fetch the data for that resource')
          }
          return res.json();
      })
      .then(data => {
          setIsPending(false);
          setError(null);
          setLoded(true)
          ProdDatRef.current = data
      })

      setIsPending(false);
      setError(null);

    };
  
    getUsers(); // run it, run it
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, [Loded]);
///

  setPRODUCTSDATA(ProdDatRef.current)


  useEffect(() => {
    const getUsers = async () => {
      myUserOrders.current = await getAvailableOrders(myUserId.current)
    };
  
    getUsers(); 
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, [getAvailableOrders]);

  setUserOrders(myUserOrders.current)
  return (<>
    <div className='shop '>
        <div className='shoptitle'>
            <h1>SHOP</h1>
            {error && <div>{error}</div> }
            {isPending && <div>...loading...</div> }
            {myUserData.current.firstName && <div>WELCOME, {myUserData.current.firstName.toUpperCase()} {myUserData.current.middleName.toUpperCase()} {myUserData.current.lastName.toUpperCase()}</div> }
        </div>
        <div className="main_flex_container">
        <div className='flex_container'>
                { ProdDatRef.current.map((product, i) => (<Product data={product}  key={product.id}/> )) }
        </div>
        </div>
    </div>
 </>)

}

export default Shop