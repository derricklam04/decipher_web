import './App.scss';
import { Home } from './Components/Home'
import { NavBar} from './Components/NavBar'
import { Footer} from './Components/Footer'
import { ResultsModal } from './Components/Modal/ResultsModal'
import title from './Icons/title.png'

import Swal from "sweetalert2";  

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';



function App() {
  Swal.fire({
    title: '<strong>Welcome to Vigenère Code Cracker</strong>',
    width: '800px',
    html:
      '<h5>To get started, paste the following encrypted text into the input area. Then click <b>Submit</b> to discover more!</h5>' +
      '<p>-</p><p>Hghcewcqqsnebjb! Utm bwia sqxl xapnhlywx ubqa bnjmp Iepaswla rjlndhnaq inoxsaa! Lkd yff hkj yqwsyy xrpfajf Xapnhly shz Rjlndhn ibzn xd kyhrycesy ndr pjxx svkia. Hkzj lapawp vmynvab sndf xr ojrjv (wwa xn ptyahrz XJ ffx KSB) rj yzy dvockwq Nwo kw pmw letdc. Pmw vkyz fkwv up gdn pth ib rwld vmynl nnlwwmaapb pmw \'Eal\' qbai. Fipr pqwy lbaea ro fdmk nj Jzashyrz Baylcjto Cwg li ybjoelmla gdn zjulucprks sfcbnrpme ndeabdtdxo. Ska itjy eabxnrsnebj, pk yg ‘Fannw Itjy’ ea pqa sspetwcetf vwe. Awftq!</p>' +
      '<p>-</p><h7><b>Note:</b> This deployment of the ‘Vigenère Code Cracker” does not support a persistence database for storing history. For the completed version, please visit the repository at GitHub which integrates SQLAlchemy. </h7>',
    focusConfirm: true,
    confirmButtonText: 'Let\'s get started',
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
      <img className="nav-title" height={50} src={title}/>

      <NavBar/>

      <Home onShowError={handleShowError} onShowResults={handleShowResults}/>
      <Footer/>
    </div>
  );
}

export default App;
