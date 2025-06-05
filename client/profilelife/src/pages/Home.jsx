import React from 'react'
import "../styles/home.css";
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
   <>
    <div id='main'>
       <div class="company">
        <div class="h1Div">
        <h1 className="text-5xl"> The Residents Book</h1>
        <img
            id="logo"
            src="https://images.cdn-files-a.com/uploads/207755/800_crop_5b05f927c6189_5b05f9126d0d9.jpg"
            alt="logo"
            className="w-16 h-16"
        />
        </div>
                <p className='text-4xl'>Serve, but don't lose yourself.
The Residence</p>
                <Link to='/form'>Add Resident</Link>


                <div class='mainPic'>
                    <img src="https://m.media-amazon.com/images/I/81rh6q1E-OL._AC_UF1000,1000_QL80_.jpg" alt="social" />
                </div>


       </div>
   
               
    </div>
         <footer>
              <a>Contact Us</a>
              <a>About</a>
            



        </footer>
   
   </>
  )
}
