import './DonationBar.css';
import { Button } from '../Button/Button';
import { Quote } from '../Quote/Quote';

type DonationBarProps = {
    current: number;
    goal: number;
    title: string;
    text: string;
    valute: string;
};

export const DonationBar = ({ current, goal, title, text, valute }: DonationBarProps) => {
    const progressPercent = Math.min((current / goal) * 100, 100);

    return (
        <div className="donates">
            <div className="donation-wrapper">
                <h1 className="donation-title">{title}</h1>
                <Quote text={text} mb="no" />

                <div className="donates-scale">
                    <div className="donates-scale__goal">
                        <p className="donates-scale__goal__text">НАША ЦЕЛЬ:</p>
                        <p className="donates-scale__goal__sum">{goal.toLocaleString()} {valute}</p>
                    </div>

                    <div className="donation-bar-container">
                        <div
                            className="donation-progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                        <div className="donation-text-overlay">
                            {current.toLocaleString()}
                        </div>
                    </div>

                    <Button title="Пожертвовать" variant="lg" />
                </div>
            </div>
        </div>
    );
};