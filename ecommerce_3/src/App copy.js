import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './style_neworgform.css';
import './productDetails.css';
import { Navbar } from './components/Navbar';
import { ShopContextProvider } from './context/shop_context';
import Footer from './Footer';
import MainContainer from './mainContainer';
import Modals from './Modals';

function App() {


  return (<>
      <div className='App'>
        <ShopContextProvider>
          {/* <SetContext /> */}
          <Router>
            <Navbar />
            <MainContainer />
            <Footer />
          </Router>
          <Modals />
        </ShopContextProvider>
      </div>
    </> );
}

export default App;