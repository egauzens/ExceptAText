import axios from "axios";
import { FETCH_USER, FETCH_MESSAGES } from "./types";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitMessage = (values, history) => async (dispatch) => {
	const res = await axios.post("/api/messages", values);

	history.push("/messages");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchMessages = () => async (dispatch) => {
	const res = await axios.get("/api/messages");

	dispatch({ type: FETCH_MESSAGES, payload: res.data });
};
