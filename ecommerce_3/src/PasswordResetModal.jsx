import { useContext } from "react"
import { ShopContext } from "./context/shop_context"
import './style_neworgform.css'

const PasswordResetModal = () => {
    const { handleTogMadal } = useContext(ShopContext)

    return (
        <section className="popupReset">
            <div className="close-btn"  onClick={() => handleTogMadal('CLOSE') }  title="close password reset modal.">&times;</div>
            <div className='form'> 
                <h2>Reset Password.</h2>
            
                <div className="form-element">
                    <label>Email</label>
                    <input type="email" name="detail" placeholder="email" title="enter email." tabIndex="4" translate="yes" /><br />
                </div>

                <div className="form-element">
                    <button onClick={() => handleTogMadal('RESET') }  title="reset password." >Submit</button>
                </div>
            </div>
          
        </section>
    )
}
export default PasswordResetModal

            