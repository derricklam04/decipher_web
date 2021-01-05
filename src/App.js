import './App.scss';
import { CardStack } from './Components/CardStack'
import { NavBar} from './Components/NavBar'
import { Footer} from './Components/Footer'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <CardStack/>
      <Footer/>
    </div>
  );
}

export default App;
