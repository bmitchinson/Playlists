import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './header.scss';

const iconLink: string = 'https://res.cloudinary.com/dheqbiqti/image/upload/v1548830491/Projects/Playlists/ZeddDeadCir.png';

const Header = () => (
    <header class={style.header}>
        <div>
            <img src={iconLink} alt="icon" />
        </div>
        <h1>
            <a href="https://mitchinson.dev/spotify">115bwm</a>
        </h1>
    </header>
);

export default Header;
