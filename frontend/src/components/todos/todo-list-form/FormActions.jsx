import React from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LangConstants from "../../../constants/LangConstants";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles({
	todoActions: {
		display: "flex",
		justifyContent: "flex-end",
	},
	standardSpace: {
		margin: "8px",
	},
});

export const FormActions = ({ todoItem, handleToggle, deleteItem }) => {
	const classes = useStyles();
	return (
		<div className={classes.todoActions}>
			<FormControlLabel
				value="start"
				control={
					<Checkbox
						edge="end"
						onChange={handleToggle}
						checked={todoItem.completed}
					/>
				}
				label={LangConstants.completed}
				labelPlacement="start"
			/>
			<Button
				size="small"
				color="secondary"
				className={classes.standardSpace}
				onClick={deleteItem}
			>
				<DeleteIcon />
			</Button>
		</div>
	);
};
