import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Collapse, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from './Logo.jsx';

/**
 * Create a header with links
 * Takes in an array of menu items as strings.
 */

export const Header = ({menu}) => {

	let menuItems = menu.map(item => <MenuItem key={item} item={item}/>);

	return(
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<Logo/>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>
					{menuItems}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

/**
 * Create the link for the menu
 * Takes in a string with the page to link to.
 */

export const MenuItem = ({item}) =>(
	<LinkContainer to={item}>
		<NavItem eventKey={item}>{item}</NavItem>
	</LinkContainer>
)