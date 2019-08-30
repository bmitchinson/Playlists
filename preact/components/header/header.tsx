import { h } from 'preact';
import './header.scss';

const iconImageLink = 'https://res.cloudinary.com/dheqbiqti/image/upload/v1548830491/Projects/Playlists/ZeddDeadCir.png';
const spotifyLink = 'https://open.spotify.com/user/115bwm';

const Header = () => (
    <header>
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
