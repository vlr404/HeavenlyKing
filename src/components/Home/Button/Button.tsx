import { useState } from 'react';
import './Button.css';

type ButtonProps = {
    title: string;
    variant?: 'def' | 'lg';
    color?: string;
    link?: string;
    onClick?: () => void;
};

const getContrastColor = (hexColor: string): 'black' | 'white' => {
    if (!hexColor || hexColor.startsWith('var')) return 'white';

    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Формула яркости (YIQ)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
};

export const Button = ({
    title,
    variant = 'def',
    color = '#ef6c00',
    link,
    onClick,
}: ButtonProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const contrastColor = getContrastColor(color);

    const buttonStyle: React.CSSProperties = {
        color: isHovered ? contrastColor : color,
        borderColor: color,
        backgroundColor: isHovered ? color : 'transparent',
    };

    const sharedProps = {
        className: `button ${variant === 'lg' ? 'button--lg' : ''}`,
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                {...sharedProps}
            >
                {title}
            </a>
        );
    }

    return (
        <button {...sharedProps} onClick={onClick}>
            {title}
        </button>
    );
};