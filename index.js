const express = import("express");
const passport = import("passport");
const app = express();

app.get("/", (req, res) => {});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
