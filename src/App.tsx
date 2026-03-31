<<<<<<< Updated upstream
import './App.css'

import { Header } from './widgets/Header/Header.jsx';
import { Home } from './widgets/Home/Home.jsx';
import { About } from './widgets/About/About.jsx';
import { Events } from './widgets/Events/Events.jsx';
import { Father } from './widgets/Father/Father.jsx';
import { Ceremony } from './widgets/Ceremony/Ceremony.jsx';
import { Contacts } from './widgets/Contacts/Contacts.jsx';


function App() {
    return (
=======
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import { Header } from './components/common/Header/Header'

function App() {
  return (
    <Router basename="/HeavenlyKing">
      <div className="App">
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      </div>
    </Router>
  )
}
>>>>>>> Stashed changes

        <div className="App">
            <Header />
            <Home />
            <About />
            <Father />
            <Events />
            <Ceremony />
            <Contacts />
           
        </div>


    )
}
export default App
