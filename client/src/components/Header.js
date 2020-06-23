import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
	renderAuthButton() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<a
						href="/auth/google"
						className="btn btn-outline-primary my-2 my-sm-0">
						Login With Google
					</a>
				);
			default:
				return (
					<div>
						<Link
							to="/messages/new"
							className="btn btn-outline-success mx-2 my-2 my-sm-0">
							<i className="fa fa-plus" aria-hidden="true"></i>
							<span className="d-none d-sm-inline ml-2">
								Message
							</span>
						</Link>
						<a
							href="/api/logout"
							className="btn btn-outline-primary my-2 my-sm-0">
							Logout
						</a>
					</div>
				);
		}
	}

	render() {
		return (
			<nav className="navbar navbar-light bg-light justify-content-between">
				<Link to="/" className="navbar-brand">
					Expect-a-Text
				</Link>
				<div>{this.renderAuthButton()}</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
