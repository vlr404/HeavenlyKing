<<<<<<< Updated upstream:src/widgets/Father/Father.tsx
import './Father.css';
import { Divider } from '../../shared/Divider/Divider.jsx';
import { FatherGrid } from '../../entity/FatherGrid/FatherGrid.jsx';
import { DonationBar } from "../../shared/DonationBar/DonationBar.jsx";
import { Quote } from '../../shared/Quote/Quote.jsx';
=======

import { Divider } from '../../../components/Home/Divider/Divider.js';
import { FatherGrid } from '../../../entity/FatherGrid/FatherGrid.js';
import { DonationBar } from "../../../components/Home/DonationBar/DonationBar.js";
import { Quote } from '../../../components/Home/Quote/Quote.js';
>>>>>>> Stashed changes:src/widgets/Home/Father/Father.tsx

export const Father = () => {
    return (
        <section id="fathers" className="Father">
            <Divider title="Отцы" />
             <Quote text="Пріидите, возрадуемся Господеви, воскликнемъ Богу Спасителю нашему: предваримъ в лице Его во исповѣданіи, и во псалмѣхъ воскликнемъ Ему. Яко Богъ Велій Господь, и Царь Велій по всей земли." />
             <FatherGrid />  
            
             <DonationBar current={78560} goal={200000} title="ПОМОГИТЕ НАМ"
                    text="Пріидите, возрадуемся Господеви, воскликнемъ Богу Спасителю нашему: предваримъ в лице Его во исповѣданіи, и во псалмѣхъ воскликнемъ Ему. Яко Богъ Велій Господь, и Царь Велій по всей земли." 
                    valute="$"
              />
          
        </section>
    );
};