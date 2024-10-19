import Header from "./Components/Header"
import Products from './Components/Products'
import Footer from './Components/Footer'
import PreparedBy from "./Components/PreparedBy"
import { Outlet } from "react-router-dom"
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function App(){
    
    


    
    return(
        <>
        <Outlet/>
        <Header/>
        <Products/>
        <Footer/>
        <PreparedBy/>
        
        </>
        

    )

}
export default App