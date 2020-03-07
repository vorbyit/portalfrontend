import React from 'react'
import '../css/footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="social-media">
        <a href="https://www.facebook.com/vorby.in" target="_blank"><i className="fab fa-facebook fa-2x"></i></a>
        <a href="https://www.instagram.com/vorby_edu/" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
        <a href="https://www.linkedin.com/company/vorby/about/" target="_blank">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="mailto:contact.vorby@gmail.com?Subject=Hello%20again" target="_top"
          ><i className="far fa-envelope fa-2x"></i
        ></a>
      </div>
      <div className="tos"><span> Terms of Services </span> | <span> Privacy Policy</span></div>
    </footer>
  )
}
