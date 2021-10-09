import React, { useState } from "react";
import {Link} from 'react-router-dom';

import { ReactComponent as Hamburger } from "../../assets/Hamburger.svg";
import { ReactComponent as Stack } from "../../assets/LogoMd.svg";
import "./SideNavBar.styles.scss";

const SidebarUI = ({ isOpen, ...rest }) => {
	const classes = ["Sidebar", isOpen ? "is-open" : ""];

	return (
		<div aria-hidden={!isOpen} className={classes.join(" ")} {...rest} />
	);
};

SidebarUI.Overlay = (props) => <div className="SidebarOverlay" {...props} />;

SidebarUI.Content = ({ width = "20rem", isRight = false, ...rest }) => {
	const classes = ["SidebarContent", isRight ? "is-right" : ""];
	const style = {
		width,
		height: "100%",
		top: 0,
		right: isRight ? `-${width}` : "auto",
		left: !isRight ? `-${width}` : "auto",
	};

	return <div className={classes.join(" ")} style={style} {...rest} />;
};

const SideNavBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	function openSidebar(isOp = true) {
		setIsOpen(isOp);
	}

	const { hasOverlay, isRight } = props;

	const guestTabs = (
		<div className='side-s-navigation'>
		  <Link to='/' className='side-s-navigation--item is-selected'>
			Products
		  </Link>
		  <Link to='/' className='side-s-navigation--item not-selected'>
			Customers
		  </Link>
		  <Link to='/' className='side-s-navigation--item not-selected'>
			Use cases
		  </Link>
		</div>
	  );

	return (
		<SidebarUI isOpen={isOpen}>
			<Hamburger onClick={openSidebar} className="ham" />

			<SidebarUI.Content isRight={isRight} onClick={() => openSidebar(false)}>
				<div className="content-logo">
					<Stack />
				</div>
				<div className="content-inner">
					{guestTabs}
				</div>
			</SidebarUI.Content>
			{hasOverlay ? (
				<SidebarUI.Overlay onClick={() => openSidebar(false)} />
			) : (
				false
			)}
		</SidebarUI>
	);
};

export default SideNavBar;
