import { useContext } from 'react'
import { ShopContext } from '../../../context/shop_context'



const ProductDetails = () => {
  const { handleTogMadal, targetProductId, PRODUCTSDATA, handleAddToCart, cartItems} = useContext(ShopContext)

  return (
    <section className='productDetails' >
        <div className='close-btn' onClick={() => handleTogMadal('CLOSE') } title="close details modal.">&times;</div>
        {
              targetProductId && PRODUCTSDATA && PRODUCTSDATA.map((product, i) => {
                if(product.id === targetProductId){
                  let cartItemNumber = cartItems[targetProductId]

                  return(<>
                      <div className="heightControl" >
                    <div className="main_flex_container" >
                      <div className="flex_container">
                        <div className='tDetails boxA box1A' >
                            <img  src={product.productImage} alt={'product_image'} />
                        </div>
        
                        <div className='tDetails boxA box2A boxOverflow boxpadding'>
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
                      <button className='addTocartBtn' onClick={() => handleAddToCart({type: "ADD", itemId: product.id}) }>
                        Add To Cart{cartItemNumber > 0 && <>({cartItemNumber})</>}
                      </button>
                    </div>
                </>)
        
                }
                
                return(<></>)
        
              })

        }
    </section>
  )
}

export default ProductDetails