import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'



const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='footer-content-logo' src={assets.logo} alt="" />
                <p className='footer-content-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae neque eveniet aliquid accusamus saepe pariatur, odit corrupti nostrum ab illum.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
              <h2>Company</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                  <li>+91-9876543210</li>
                  <li>contact@mamaskitchen.in</li>
                </ul>
            </div>
        </div>
        <hr />
        <br />
        <p className="footer-copyright"> Copyright 2024 &copy; mamaskitchen.com - All rights reserved</p>

    </div>
  )
}

export default Footer