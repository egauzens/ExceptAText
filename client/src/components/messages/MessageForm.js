import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import MessageInputField from "./MessageInputField";
import MessageTextAreaField from "./MessageTextAreaField";
import { Link } from "react-router-dom";
import validatePhoneNumber from "../../utils/validatePhoneNumber";
import messageFormFields from "./messageFormFields";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

class MessageForm extends Component {
	renderFields() {
		return (
			<div>
				<Field
					name="title"
					label="Title"
					component={MessageInputField}
					type="text"
					required
				/>
				<Field
					name="message"
					label="Message"
					component={MessageTextAreaField}
					required
				/>
				<Field
					name="recipientPhone"
					label="Recipient Phone Number"
					component={MessageInputField}
					type="number"
					required
				/>
			</div>
		);
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(() =>
						this.props.submitMessage(
							this.props.formValues,
							this.props.history
						)
					)}>
					{this.renderFields()}
					<Link to="/messages" className="btn btn-danger">
						Cancel
					</Link>
					<button className="btn btn-success ml-2" type="submit">
						Create
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipientPhone = validatePhoneNumber(values.recipientPhone);

	messageFormFields.map(({ name }) => {
		if (!values[name]) {
			errors[name] = "You must provide a value";
		}
		return [];
	});

	return errors;
}

function mapStateToProps(state) {
	return { formValues: state.form.messageForm.values };
}

MessageForm = connect(mapStateToProps, actions)(withRouter(MessageForm));

export default reduxForm({
	validate: validate,
	form: "messageForm",
})(MessageForm);
