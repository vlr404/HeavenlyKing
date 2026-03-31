import './quote.css';

type QuoteProps = {
    text: string;
    mb?: 'no' | 'def';
    autor?: string;
    san?: string;
};

export const Quote = ({ text, mb = 'def', autor, san }: QuoteProps) => {
    return (
        <div className={`quote ${mb === 'no' ? 'quote--no_margin_button' : ''}`}>
            {text}
            {(autor || san) && (
                <div className="autor">
                    {autor && <span className="autor__name">{autor}</span>}
                    {san   && <span className="autor__san">{san}</span>}
                </div>
            )}
        </div>
    );
};