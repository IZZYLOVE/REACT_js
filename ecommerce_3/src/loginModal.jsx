import { useContext, useState } from "react"
import { ShopContext } from "./context/shop_context"
import { useNavigate }  from 'react-router-dom';
import Swal from "sweetalert2"



const LoginModal = () => {
    const { handleTogMadal, setIsAdmin} = useContext(ShopContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ isPendingLog, setIsPendingLog] = useState(false);
    const redirectTo = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        setIsPendingLog(true);
        //console.log(blog);
        fetch('http://localhost:7000/Users')
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then((data) => {
        console.log("log data")
        console.log(data)

        let i = 0
        let j = 0
        // Swal.fire('login useEffect ran')
        
        data.length > 0 ? ( data.map((datax) => {  
            i++

            if(email === datax.email && password === datax.password && j < 1){
            console.log("is a match")

                j++
     
                datax.superx && setIsAdmin(true) 
                handleTogMadal('LOGGEDIN')
                setIsPendingLog(false);

                Swal.fire('LOGIN SUCCESS')
                // redirectTo(`/?id=${datax.id}`)
                redirectTo(`/StateController?to=Shop&id=${datax.id}`)
            }
            return(j)
            })
            ):(
                console.log("no log data")
                
            )


            if(i >= data.length-1 && j === 0){
                setIsPendingLog(false);
                Swal.fire('WRONG CREDENTIALS !')
            }
    });
    }


    return (
        <section className='popupLogin' >
            <div className='close-btn' onClick={() => handleTogMadal('CLOSE') } title="close login modal.">&times;</div>
                <div className='form'> 
                    <h2>Login</h2>
        
                <div className="form-element">
                    <label>Email</label>
                    <input type="email" name="detail" id="userMail"  placeholder="email" title="enter email." tabIndex="1" translate="yes" 
                     onChange = {(e) => setEmail(e.target.value)} /><br />
                </div>
                <div className="form-element">
                    <label>password</label>
                    <input type="password" name="password" id="password"  placeholder="password" title="enter password." tabIndex="2" translate="yes" 
                    onChange = {(e) => setPassword(e.target.value)}  /><br />
                </div>
                <div className="form-element">
                    <input type="checkbox" id="remember-me"  tabIndex="3"  title="Remember me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="form-element">
                    {!isPendingLog && <button onClick={ handleLogin } title="Sign in" >Sign in.</button>}
                    {isPendingLog && <button>...loading...</button>}
                </div>
                <div className="form-element flex_me">
                <div className="signup" onClick={() => handleTogMadal('SHOWREGISTER') }  title="New user Sign up?" >New user<br/>Sign up?</div>
                <div  className="signup" onClick={() => handleTogMadal('SHOWRESET') }  title="Forgot password?" >Forgot <br/>password?</div>
                </div>
            </div>
        </section>
    )
}
export default LoginModal        