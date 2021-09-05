import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
	TextField,
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LangConstants from "../../../constants/LangConstants";
import { v4 as uuid } from "uuid";
import { useDebounce } from "../../../utils/hooks";
import { useRootStore } from "../../../stores/RootStateContext";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { Header } from "./Header";
import { FormActions } from "./FormActions";

const useStyles = makeStyles({
	card: {
		margin: "1rem",
	},
	todoForm: {
		display: "flex",
		flexDirection: "column",
	},
	textField: {
		flexGrow: 1,
		margin: "8px",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
	},
});

export const ToDoListForm = ({ toDoList }) => {
	const classes = useStyles();
	const [todos, setTodos] = useState(toDoList.todoItems);
	const todoListDebounce = useDebounce(todos, 500);
	const { todoStore } = useRootStore();

	useEffect(() => {
		if (todoListDebounce) saveToDoList();
	}, [todoListDebounce, todoStore]);

	const saveToDoList = () => {
		if (todos) todoStore.updateTodo(toDoList.id, { todoItems: [...todos] });
	};

	const onChangeTodoItemName = (name, index) => {
		const newTodos = [...todos];
		const instant = { ...newTodos[index], name };

		newTodos[index] = instant;
		setTodos(newTodos);
	};

	const onAddTodoItem = () => {
		const newTodos = [
			...todos,
			{ id: uuid(), name: "", completed: false, completeAt: new Date() },
		];
		setTodos(newTodos);
	};

	const handleToggle = (value, index) => {
		const newTodos = [...todos];
		const instant = { ...newTodos[index], completed: value };

		newTodos[index] = instant;
		setTodos(newTodos);
	};

	const onChangeTodoItemDate = (completeAt, index) => {
		const newTodos = [...todos];
		const instant = { ...newTodos[index], completeAt };

		newTodos[index] = instant;
		setTodos(newTodos);
	};

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography component="h2">{toDoList.name}</Typography>
				<form className={classes.form}>
					{todos?.map((todoItem, index) => (
						<Card
							key={todoItem.id}
							style={{ margin: "1rem" }}
							variant="outlined"
						>
							<CardContent className={classes.todoForm}>
								<Header todoItem={todoItem} index={index} />
								<FormActions
									todoItem={todoItem}
									handleToggle={(event) => {
										handleToggle(
											event.target.checked,
											index
										);
									}}
									deleteItem={() => {
										setTodos([
											...todos.slice(0, index),
											...todos.slice(index + 1),
										]);
									}}
								/>
								<TextField
									label={LangConstants.whatToDo}
									value={todoItem.name}
									onChange={(event) => {
										onChangeTodoItemName(
											event.target.value,
											index
										);
									}}
									className={classes.textField}
								/>
								<KeyboardDateTimePicker
									style={{ margin: "8px" }}
									value={todoItem.completeAt}
									onChange={(date) =>
										onChangeTodoItemDate(
											date.toDate(),
											index
										)
									}
									label={LangConstants.completed}
									format="yyyy/MM/DD hh:mm a"
									disablePast
								/>
							</CardContent>
						</Card>
					))}
					<CardActions>
						<Button
							type="button"
							color="primary"
							onClick={() => {
								onAddTodoItem();
							}}
						>
							{LangConstants.addTodo} <AddIcon />
						</Button>
					</CardActions>
				</form>
			</CardContent>
		</Card>
	);
};
