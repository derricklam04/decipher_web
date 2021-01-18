import './App.scss';
import React, {useState} from 'react';

import { Home } from './Components/Home'
import { About } from './Components/About'

import { NavBar} from './Components/NavBar'
import { Footer} from './Components/Footer'
import title from './Icons/title.png'

import Swal from "sweetalert2";  

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';



function App() {
  const [home, setHome] = useState("first")
  const handleHome = () => {
    setHome(true);
  }
  const handleAbout = () => setHome(false);

  if (home === "first"){
    Swal.fire({
      title: '<strong>Welcome to Vigenère Code Cracker</strong>',
      width: '800px',
      html:
        '<h5>To get started, paste the following encrypted text into the input area.</h5><h5>Then hit <b>Submit</b> to discover more!</h5>' +
        '<p>-</p><p>Xwtkeekygizmbrj! Cjc neii aynb jipvptomj cbyi jdzyx Imxiimxi rrtvtxziq qvwnimi! Lsl gvv tsj gyeiok frxnizv Jipvpto ith Rrtvtxz qbhv ft akprgkmio zlr xrfn ihsii, Pspz xipiex lckvvij adtr fr wrzzl (iea fv xjomprh FR vvj SSJ) zr opk lvwksmg zeo se xcm xmtlk. Xcm hsyh nsmtj eg xyi owv ingy upmxc eigvzakrgw klz \‘Skc\’ hwvh. Iwzi glrx opkvr mj egau ea Euzvviiq Wvxoqtkf Xrf ow isajzkpzk hrgickbosa eckjzoxuq klmmylbpuw. Awxqrv zrawxqnxzsi, ou xb \‘Pvemv Ssei\’ zr opk rnzzkvbosa frv. Zvpsl!</p>' +
        '<p>-</p><h7><b>Note:</b> This deployment of the ‘Vigenère Code Cracker” does not support a persistence database for storing history. For the completed version, please visit the repository at GitHub which integrates SQLAlchemy. </h7>',
      focusConfirm: true,
      confirmButtonText: 'Let\'s get started',
    })
  }
  

  const handleShowError = () => {
    Swal.fire({
      icon: 'error',
      width: '750px',
      title: 'Error...',
      confirmButtonText: 'Go Back',
      text: 'Unable to decrypt inputted cipher text!',
      footer: '<p>Possible Reasons:</p>'+
            '<ul>' +
            '<li>The Cipher Text is too short for Frequency Analysis</li>' +
            '<li>The Cipher Text is not derived from a Vigenère Encryption of a plaintext</li>' +
            '</ul>'
    })
  }

  if (home === true || home === "first"){
    return (
      <div className="App">
        <img className="nav-title" alt="title" height={50} src={title}/>
        <NavBar onHome={handleHome} onAbout={handleAbout}/>
        <Home onShowError={handleShowError}/>
        <Footer/>
      </div>
    );
  }
  else if (home === false){
    return (
      <div className="App">
        <img className="nav-title" alt="title" height={50} src={title}/>
        <NavBar onHome={handleHome} onAbout={handleAbout}/>
        <About />
        <Footer/>
      </div>
    );
  }
}

export default App;
