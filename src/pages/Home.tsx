import { Header } from '../components/common/Header/Header.tsx';
import { Hero } from '../widgets/Home/Hero/Hero.tsx';
import { About } from '../widgets/Home/About/About.tsx';
import { Events } from '../widgets/Home/Events/Events.tsx';
import { Father } from '../widgets/Home/Father/Father.tsx';
import { Ceremony } from '../widgets/Home/Ceremony/Ceremony.tsx';
import { Contacts } from '../widgets/Home/Contacts/Contacts.tsx';



function App() {
    return (

        <div className="App">
            <Header />
            <Hero />
            <About />
            <Father />
            <Events />
            <Ceremony />
            <Contacts />
           
        </div>


    )
}
export default App
