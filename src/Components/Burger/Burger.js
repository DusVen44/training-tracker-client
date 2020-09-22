import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Burger.css';
import TokenService from '../../services/token-service';

export default class Burger extends React.Component {
    constructor() {
        super()
        this.state = {
            isMenuOpen: false
        };
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    };
    
    componentWillUnmount() {
        document.addEventListener('click', this.handleClickOutside);
    };

    handleClickOutside = e => {
        if (this.state.isMenuOpen === false) {
          return;
        };

        const node = ReactDOM.findDOMNode(this);
        let target = e.target;
    
        while (target && target.parentNode) {
          if (target === node) {
            return;
        };
    
        target = target.parentNode;
        };
    
        this.setState({ isMenuOpen: false });
    };

    isMenuOpen = state => {
        if (state.isOpen === this.state.isMyMenuOpen) return;
        this.setState({ isMyMenuOpen: state.isOpen });
    };
    
    closeMenu = () => {
        this.setState({ isMyMenuOpen: false });
    };

    handleLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearUserId();
        this.closeMenu();
    };

    renderLoginLink = () => {
        return (
            <Link to='/login' className="bm-item" onClick={this.closeMenu}>
                Log In        
            </Link>   
        );
    };

    renderLogoutLink = () => {
        return (
            <Link className="bm-item" onClick={this.handleLogout} to='/'>
                Log Out        
            </Link>   
        );
    };

    renderSignupLink = () => {
        return (
            <Link to='/signup' className="bm-item" onClick={this.closeMenu}>
                Sign Up       
            </Link>   
        );
    };

    render() {
        return (
            <Menu 
                right
                isOpen={this.state.isMyMenuOpen}
                onStateChange={this.isMenuOpen}
            > 

                <Link to="/" onClick={this.closeMenu}>Home</Link>

                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}

                {!TokenService.hasAuthToken()
                    ? this.renderSignupLink()
                    : ''}
                
            </Menu>
        )
    }
}
