import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentUser} from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect'
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-dropdown/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import './header.style.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg'  


const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
              SHOP
            </Link>
            <Link className='option' to='/'>
              CONTACT
            </Link>
            {
              currentUser ?
              <div className='option' onClick={() => {
                try {
                  auth.signOut()
                } catch (error) {
                  console.log(error)
                }
              }}>SIGN OUT</div>
              :
              <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
            
        </div>
        {
          hidden ? null :
          <CartDropdown />
        }
    </div>
)
const mapStateToProps =  createStructuredSelector({
  currentUser : selectCurrentUser,
  hidden : selectCartHidden,
})
export default connect(mapStateToProps)(Header) 