import './Divider.css';

type DividerProps = {
    title: string;
};

export const Divider = ({ title }: DividerProps) => {
    return (
        <div className="divider">
            <div className="divider__line" />
            <div className="divider__box">
                <span>{title}</span>
            </div>
            <div className="divider__line" />
        </div>
    );
};