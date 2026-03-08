import './QuoteBlock.css';
import { Button } from '../Button/Button';
import { Quote } from '../Quote/Quote';
import { SocialMediaIcon } from '../SocialMediaIcon/SocialMediaIcon';

type SocialMediaLinks = {
    [platform: string]: string;
};

type QuoteBlockProps = {
    title?: string;
    text: string;
    autor?: string;
    san?: string;
    backgr_img?: string;
    buttonText?: string;
    buttonLink?: string;
    socialmedia?: SocialMediaLinks;
};

export const QuoteBlock = ({
    title,
    text,
    autor,
    san,
    backgr_img,
    buttonText,
    buttonLink,
    socialmedia,
}: QuoteBlockProps) => {
    return (
        <div
            className="QuoteBlock"
            style={{
                backgroundImage: backgr_img
                    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgr_img})`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {title && <h1 className="QuoteBlock__title">{title}</h1>}
            <Quote text={text} autor={autor} san={san} />
            {buttonText && (
                <Button title={buttonText} link={buttonLink} />
            )}
            {socialmedia && <SocialMediaIcon links={socialmedia} />}
        </div>
    );
};