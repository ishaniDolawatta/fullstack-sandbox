const { API_ROOT } = require("../constants/Config");

export const getTodos = () => {
	return fetch(API_ROOT).then((res) => res.json());
};

export const updateTodo = (id, body) => {
	fetch(`${API_ROOT}/${id}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-type": "application/json",
		},
		body: JSON.stringify(body),
	});
};
