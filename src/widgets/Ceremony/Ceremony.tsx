import './Ceremony.css';
import { Divider } from '../../shared/Divider/Divider';
import { Quote } from '../../shared/Quote/Quote';
import { QuoteBlock } from '../../shared/QuoteBlock/QuoteBlock';
import { MediaBlock } from '../../shared/MediaBlock/MediaBlock';
import { Space } from '../../shared/Space/Space.jsx';

export const Ceremony = () => {
    return (
        <section id = "ceremony" className="Ceremony">
             <Divider title="Церемонии" />   
             <Quote text="Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, 
                        дабы всякий верующий в Него, не погиб, но имел жизнь вечную. 
                        Вера же есть осуществление ожидаемого и уверенность в невидимом." />

             <MediaBlock />
            <Space mt={50}/>

             <QuoteBlock title="СЛОВО ПАСТЫРЯ" 
                text="Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, 
                        дабы всякий верующий в Него, не погиб, но имел жизнь вечную. 
                        Вера же есть осуществление ожидаемого и уверенность в невидимом."
                autor="Майк Эрмантраут" san="Ведущий пастор"
                backgr_img="./public/foto/testimonials.png"/>
        </section>
    );
};