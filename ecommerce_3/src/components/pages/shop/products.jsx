import React, { useContext} from 'react'
import { ShopContext } from '../../../context/shop_context';

const Product = (props) => {




    const {productName, price, currency, productImage, id} = props.data;
    // const {mykey} = props.mykey
    const {cartItems, handleTogMadal, handleAddToCart, setTargetProductId} = useContext(ShopContext);
     const cartItemNumber = cartItems[id]



    const HandleUseProductDetail = (productId) => {
        setTargetProductId(productId)
        handleTogMadal("SHOWPRODUCTDETAILS") 
        }

  




  return (
    <div className='product  boxA box1A bgcol' key={props.data.id}>

      <img src={productImage} alt={'product_image'} />
      <div className='description'>
        <h3>{productName}</h3>
          <p>{currency}{price}</p>
          <div className="details-btn"  onClick={() => HandleUseProductDetail(props.data.id) }  title="close registraion form modal.">?</div>
          <button className='addTocartBtn' onClick={() => handleAddToCart({type: "ADD", itemId: props.data.id}) }>
            Add To Cart{cartItemNumber > 0 && <>({cartItemNumber})</>}
          </button>
           
        </div>

    </div>
  )
}

export default Product