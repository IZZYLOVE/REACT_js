import React, { useContext } from 'react'
import { ShopContext } from '../../../context/shop_context';

export const CartItem = (props) => {
    const {productName, price, currency, productImage, id} = props.data;
    const {mykey} = props.mykey

    const {setCartItems, cartItems, handleTogMadal, setRenderTargetItem, PRODUCTSDATA, handleAddToCart } = useContext(ShopContext);
    const cartItemNumber2 = cartItems[id]


 
    const HandleUseProductDetail = (productId) => {
      
        PRODUCTSDATA && PRODUCTSDATA.map((product, i) => {
          if(product.id === productId){
            setRenderTargetItem (<>
              <div className="heightControl" >
                <div className="main_flex_container" >
                    <div className="flex_container">
                    <div className='tDetails boxA box1A' >
                        <img  src={product.productImage} alt={'product_image'} />
                    </div>
    
                    <div className='tDetails boxA box2A'>
                        <div>
                            <h3 >{product.productName}</h3>
                            <strong>ABOUT</strong>
                            <p>{product.about}</p>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
  
              <div>
                <p className='targetProductNoFlex'>Price={product.currency}{product.price} </p>
                <button className='addTocartBtn' onClick={() => setCartItems({type: "ADD", itemId: product.id}) }>
                  Add To Cart{cartItemNumber2 > 0 && <>({cartItemNumber2})</>}
                </button>
              </div>
          </>)
  
          handleTogMadal("SHOWPRODUCTDETAILS") 
          }
  
          return(<></>)
        })
  
    }
  


    return (<>
    <div className='cartItem'  key={mykey}>
        <img src={productImage} alt={'product_image'} />
        <div className='description'>
            <h3>{productName}</h3>
            <p>Unit Price={currency}{price}, Sum={currency}{price * cartItems[id]} </p>
          <div className="details-btn"  onClick={() => HandleUseProductDetail(props.data.id) }  title="close registraion form modal.">?</div>

            <div className='counter'>Quantity=
           <button onClick={() => setCartItems({type: "REMOVE", itemId: props.data.id}) }> - </button>
           <input value={cartItems[id]} onChange={(e) => handleAddToCart({type: "SETNEW", newcount: Number(e.target.value), itemId: props.data.id}) } />
           <button onClick={() => handleAddToCart({type: "ADD", itemId: props.data.id}) }> + </button>
            </div>
        </div>
    </div>
            </>
  )
}