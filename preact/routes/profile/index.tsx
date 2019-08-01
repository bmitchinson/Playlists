import { h, Component } from 'preact';
import style from './style.scss';

interface MyProps {
    path: string;
}
interface MyState {}

export default class Profile extends Component<MyProps, MyState> {
    render(): JSX.Element {
        console.log('RENDER');
        return <p>HEY</p>;
    }
}
