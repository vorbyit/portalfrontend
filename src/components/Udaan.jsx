import React from "react";
import '../css/udaan.css'
import curve from '../public/curve.png';
import undaanBoy from '../public/udaan-boy.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function udaan() {
  return (
    <div className="Udaan">
      <img src={curve} alt="" id="design-bg" />

      <div id="showcase">
        <img src={undaanBoy} alt="" id="udaan-boy" />
        <div className="showcase-content">
          <div className="heading">Project Udaan</div>
          <div className="para">
            <p>Burst all your myths about college! Introducing</p>
            <p>project Udaan, a platform where you can access</p>
            <p>one to one session with counselors, mentors and</p>
            <p>seniors to know it all. No page left unturned.</p>We, at
            Vorby, are kickstarting our first initiative, Project Udaan. Our
            trained and trusted mentors will conduct interactive sessions in
            schools, answering all the questions about college and curriculum
            offered. We will cover everything about Engineering, introduce the
            idea of entrepreneurship, and insight into IITs, and glimpse into
            technologies of the future. Project Udaan serves an entire roadmap
            of various courses on a platter.
          </div>
          <div className="buttons">
            <button>
              <a href="https://forms.gle/3PCuRDxbgB3Dx7hT7" target="_blank">
                Nominate your School
              </a>
            </button>
            <button id="brochure">
              <a
                href="https://drive.google.com/open?id=1gZwN6m7SeG2gTyjAJxr-Sq0wkOvTOW30"
                target="_blank"
              >
                Brochure &nbsp;<FontAwesomeIcon icon={faArrowDown}/>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
