import React from "react";

export default ({ input, label, type, meta: { error, touched } }) => {
	return (
		<div className="form-group">
			<label>{label}</label>
			<input {...input} className="form-control" type={type} />
			<div className="text-danger">{touched && error}</div>
		</div>
	);
};
