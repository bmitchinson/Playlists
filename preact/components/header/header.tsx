import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './header.scss';

const iconImageLink: string = 'https://res.cloudinary.com/dheqbiqti/image/upload/v1548830491/Projects/Playlists/ZeddDeadCir.png';
const spotifyLink: string = 'https://open.spotify.com/user/115bwm';

const Header = () => (
    <header class={style.header}>
        <div>
            <a href={spotifyLink}>
                <img src={iconImageLink} alt="icon" />
            </a>
        </div>
        <h1>
            <a href={spotifyLink}>115bwm</a>
        </h1>
    </header>
);

export default Header;
