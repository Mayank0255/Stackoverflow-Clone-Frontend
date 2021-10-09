import React, { useState } from "react";

import { ReactComponent as Hamburger } from "../../assets/Hamburger.svg";
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

	return (
		<SidebarUI isOpen={isOpen}>
			<Hamburger onClick={openSidebar} className="ham" />

			<SidebarUI.Content isRight={isRight}>hi</SidebarUI.Content>
			{hasOverlay ? (
				<SidebarUI.Overlay onClick={() => openSidebar(false)} />
			) : (
				false
			)}
		</SidebarUI>
	);
};

export default SideNavBar;
