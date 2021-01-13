import './App.scss';
import { Home } from './Components/Home'
import { NavBar} from './Components/NavBar'
import { Footer} from './Components/Footer'
import { ResultsModal } from './Components/Modal/ResultsModal'


import Swal from "sweetalert2";  

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';


function App() {
  Swal.fire({
    title: '<strong>Welcome to Vigenère Code Cracker</strong>',
    width: '800px',
    html:
      'You can use <b>bold text</b>, ' +
      '<a href="//sweetalert2.github.io">links</a> ' +
      'and other HTML tags',
    focusConfirm: true,
    confirmButtonText: 'Let\'s get started',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

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
  const handleShowResults = () =>{
    Swal.fire({
      width: '750px',
      title: 'Error...',
      confirmButtonText: 'Go Back',
      text: '<ResultsModal/>',
      footer: ''
    })
  }

  return (
    <div className="App">
      <NavBar/>
      <Home onShowError={handleShowError} onShowResults={handleShowResults}/>
      <Footer/>
    </div>
  );
}

export default App;
