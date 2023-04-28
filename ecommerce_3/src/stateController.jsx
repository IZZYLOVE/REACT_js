import { useNavigate } from 'react-router-dom';
import './footer.css'
import { useEffect } from 'react';
// import { ShopContext } from './context/shop_context';


const StateController = () => {
    // const { cartItems, getTotalCartAmount, PRODUCTSDATA, handleTogMadal } = useContext(ShopContext)

    const redirectTo = useNavigate();

    const HandleParams = () => {
        let params = (new URL(document.location)).searchParams;
        let id = params.get('id');
        let to = params.get('to');
        useEffect(() => {
          if(id > 0){
            redirectTo(`/?id=${id}`)
          }else{
            redirectTo(`/`)
          }
        }, [to, id]);
      
    }  
    
    HandleParams()

    return (
        <>StateController</>       
    )
}
export default StateController 