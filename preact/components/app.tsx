require('preact/debug');

import { h, Component } from 'preact';

interface MyProps {}
interface MyState {}

export default class App extends Component<MyProps, MyState> {
    /** Gets fired when the route changes.
     *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
     *	@param {string} event.url	The newly routed URL
     */

    currentUrl;

    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        return <h1 class="username">Live reloading is the best!</h1>;
    }
}
