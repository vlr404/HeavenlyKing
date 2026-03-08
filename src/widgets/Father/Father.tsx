import './Father.css';
import { Divider } from '../../shared/Divider/Divider.jsx';
import { FatherGrid } from '../../entity/FatherGrid/FatherGrid.jsx';
import { DonationBar } from "../../shared/DonationBar/DonationBar.jsx";
import { Quote } from '../../shared/Quote/Quote.jsx';

export const Father = () => {
    return (
        <section id="Father" className="Father">
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