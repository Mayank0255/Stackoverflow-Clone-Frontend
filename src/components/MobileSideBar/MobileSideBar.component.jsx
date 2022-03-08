import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Hamburger } from "../../assets/LogoGlyphMd.svg";
import { ReactComponent as Stack } from "../../assets/LogoMd.svg";
import { ReactComponent as GlobalIcon } from "../../assets/Globe.svg";

import "./MobileSideBar.styles.scss";

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

const MobileSideBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	function openSidebar(isOp = true) {
		setIsOpen(isOp);
	}

	const { hasOverlay, isRight } = props;

	return (
		<SidebarUI isOpen={isOpen}>
			<Hamburger onClick={openSidebar} className="ham" />

			<SidebarUI.Content
				isRight={isRight}
				onClick={() => openSidebar(false)}
			>
				<div className="content-logo">
					<Stack />
				</div>
				<div className="content-inner">
					<div className="side-bar-tabs">
						<NavLink
							exact
							activeClassName="active"
							className="home-link nav_link"
							to="/"
						>
							<p>Home</p>
						</NavLink>

						<div className="public-tabs">
							<p className="title fc-light">PUBLIC</p>
							<NavLink
								activeClassName="active"
								className="icon-link nav_link"
								to="/questions"
							>
								<p>
									<GlobalIcon className="icon" />
									Stack Overflow
								</p>
							</NavLink>
							<NavLink
								activeClassName="active"
								className="link nav_link"
								to="/tags"
							>
								<p>Tags</p>
							</NavLink>
							<NavLink
								activeClassName="active"
								className="link nav_link"
								to="/users"
							>
								<p>Users</p>
							</NavLink>
							<NavLink
								activeClassName="active"
								className="link nav_link"
								to="/jobs"
							>
								<p>Jobs</p>
							</NavLink>
						</div>
						<div className="teams-tabs">
							<p className="title fc-light">TEAMS</p>
						</div>
					</div>
				</div>
			</SidebarUI.Content>
			{hasOverlay ? (
				<SidebarUI.Overlay onClick={() => openSidebar(false)} />
			) : false}
		</SidebarUI>
	);
};

export default MobileSideBar;
