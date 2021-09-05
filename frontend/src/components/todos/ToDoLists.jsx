import React, { Fragment, useState, useEffect } from "react";
import { observer } from "mobx-react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./todo-list-form/ToDoListForm";
import { useRootStore } from "../../stores/RootStateContext";
import LangConstants from "../../constants/LangConstants";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export const ToDoLists = observer(({ style }) => {
	const [activeList, setActiveList] = useState();
	const { todoStore } = useRootStore();

	useEffect(() => {
		todoStore.loadTodos();
	}, [todoStore]);

	const isTodoCompleted = (todos) => {
		return todos?.every((i) => {
			return i.completed === true;
		});
	};

	if (!todoStore.todos.length) return null;
	return (
		<Fragment>
			<Card style={style}>
				<CardContent>
					<Typography component="h2">
						{LangConstants.myToDoListTitle}
					</Typography>
					<List>
						{todoStore.todos.map((list) => (
							<ListItem
								key={list.id}
								button
								onClick={() => setActiveList(list.id)}
							>
								<ListItemIcon>
									<ReceiptIcon />
								</ListItemIcon>
								<ListItemText primary={list.name} />
								<ListItemSecondaryAction>
									{isTodoCompleted(list.todoItems) && (
										<Chip
											label={LangConstants.completed}
											icon={<DoneIcon />}
											color="secondary"
											variant="outlined"
										/>
									)}
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
			{todoStore.getTodo(activeList) && (
				<ToDoListForm
					key={activeList} // use key to make React recreate component to reset internal state
					toDoList={todoStore.getTodo(activeList)}
				/>
			)}
		</Fragment>
	);
});
