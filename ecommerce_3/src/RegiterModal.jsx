import { useContext, useState } from "react"
import { ShopContext } from "./context/shop_context"
import { useNavigate }  from 'react-router-dom';
import './style_neworgform.css'

const RegisterModal = () => {

    const { handleTogMadal } = useContext(ShopContext)

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [ isPendingReg, setIsPendingReg] = useState(false);    
    const redirectTo = useNavigate();



    const handleRegister = (e) => {
        e.preventDefault();
        const superx = 0
        const level = 0

        const User = {firstName, middleName, lastName, email, phone, password, superx, level};
        setIsPendingReg(true);
        //console.log(blog);
        fetch('http://localhost:7000/Users', {method: 'POST',
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(User)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(() => {
        console.log('new blog added');
        setIsPendingReg(false);
        handleTogMadal('REGISTER')
        redirectTo('/?regsuc=ok');
    })
    }


    return (
        <section className="popupReg">
            <div className="close-btn"  onClick={() => handleTogMadal('CLOSE') }  title="close registraion form modal.">&times;</div>
            <div className='form'> 
                <h2>Rigistration</h2>
                <div className="maxDivHeight">
                <div className="form-element">
                    <label>first name</label>
                    <input type="text" name="detail" id="fname" placeholder="first name" title="enter first name." tabIndex="5" translate="yes"
                    onChange = {(e) => setFirstName(e.target.value)} /><br />
                </div>
                <div className="form-element">
                    <label>Middle name</label>
                    <input type="text" name="detail" id="mname" placeholder="Middle name" title="enter Middle name." tabIndex="6" translate="yes"
                    onChange = {(e) => setMiddleName(e.target.value)}  /><br />
                </div>
                <div className="form-element">
                    <label>Last Name</label>
                    <input type="text" name="detail" id="lname" placeholder="last name" title="enter last name." tabIndex="7" translate="yes" 
                    onChange = {(e) => setLastName(e.target.value)} /><br />
                </div>
            
                <div className="form-element">
                    <label>Email</label>
                    <input type="email" name="detail" id="logEmail" placeholder="email" title="enter email." tabIndex="8" translate="yes" 
                     onChange = {(e) => setEmail(e.target.value)}  /><br />
                </div>

                <div className="form-element">
                    <label>Phone</label>
                    <input type="tel" name="detail" id="logPhone" placeholder="phone" title="enter phone." tabIndex="9" translate="yes" 
                     onChange = {(e) => setPhone(e.target.value)}  /><br />
                </div>


                <div className="form-element">
                    <label>password</label>
                    <input type="password" name="password"  id="pw1" placeholder="password" title="enter password." tabIndex="9" translate="yes" 
                    onChange = {(e) => setPassword(e.target.value)} /><br />
                </div>

                <div className="form-element">
                    
                    {!isPendingReg && <button onClick={ handleRegister } title="submit registraion form." >Submit</button>}
                    {isPendingReg && <button>...loading...</button>}
                </div>
            </div>
        </div>
          
        </section>
    )
}
export default RegisterModal          