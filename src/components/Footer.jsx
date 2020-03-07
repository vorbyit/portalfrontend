import React from 'react'
import '../css/footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer>
      <div className="social-media">
        <a href="https://www.facebook.com/vorby.in"><FontAwesomeIcon icon={ faFacebook }/></a>
        <a href="https://www.instagram.com/vorby_edu/"><FontAwesomeIcon icon={ faInstagram }/></a>
        <a href="https://www.linkedin.com/company/vorby/about/">
        <FontAwesomeIcon icon={ faLinkedin }/>
        </a>
        <a href="mailto:contact.vorby@gmail.com?Subject=Hello%20again" target="_top"><FontAwesomeIcon icon={ faEnvelope }/></a>
      </div>
      <div className="tos"><span> Terms of Services </span> | <span> Privacy Policy</span></div>
    </footer>
  )
}
