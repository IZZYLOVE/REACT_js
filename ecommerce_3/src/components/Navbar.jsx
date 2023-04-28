import { Handbag, ShoppingCart } from "phosphor-react";
import React, { useContext } from 'react'

import { Link, useNavigate } from "react-router-dom"
import { ShopContext } from "../context/shop_context";
import './navbar.css'


export const Navbar = () => {
    const { getTotalCartAmount, handleTogMadal, loggedIn,inDashboard, isAdmin} = useContext(ShopContext)
    const { totalUniqueItems }= getTotalCartAmount()
    const redirectTo = useNavigate();



    const handleLogout = () => {
        handleTogMadal('LOGGEDOUT')
        redirectTo(`/StateController?to=Shop&id=0`)
    }
    

    return <>
    <header className='navHeader'>
    <li><Link to="/">SHOPADDY</Link> </li>
        <nav>
            <ul> 

                {
                    inDashboard === false ?(
                        <li onClick={() => handleTogMadal('SHOWCART') }>
                        {totalUniqueItems>0 && totalUniqueItems}<ShoppingCart size={16} /> 
                    </li>
                    ):(
                        <li>
                            adminControl
                        </li>
                    )
                }

                { isAdmin && loggedIn && (<li onClick={() => handleTogMadal('SHOWLOGIN') }>
                            DASHBOARD
                        </li>)
                }
 

                {
                    loggedIn === false ?(
                        <li onClick={() => handleTogMadal('SHOWLOGIN') }>
                            LOGIN
                        </li>
                    ):(
                        <>
                        <li onClick={() => handleTogMadal('SHOWORDERS') }>
                        {totalUniqueItems>0 && totalUniqueItems}<Handbag size={16} /> 
                        </li>
                        <li onClick={ handleLogout }>
                            LOGOUT
                        </li>
                        </>
                    )
                }
               
            </ul>
        </nav>
    </header>
    </>
}