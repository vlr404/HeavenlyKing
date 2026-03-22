import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <div className="logo"><img src="icons/logo.png" alt=""/></div>
                    <div className="title">ЦАРСТВИЕ НЕБЕСНОЕ</div>
                </div>

                <nav className="header__nav">
                    <ul>
                        <li><a href="#Hero">ГЛАВНАЯ</a></li>
                        <li><a href="#About">О НАС</a></li>
                        <li><a href="#Father">ОТЦЫ</a></li>
                        <li><a href="#Events">СОБЫТИЯ</a></li>
                        <li><a href="#Ceremony">ЦЕРЕМОНИИ</a></li>
                        <li><a href="#Contacts">КОНТАКТЫ</a></li>
                        <li><a href="#Shop">МАГАЗИН</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
