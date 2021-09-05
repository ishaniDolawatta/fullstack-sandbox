import React from "react";
import { Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import TimerIcon from "@material-ui/icons/Timer";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import LangConstants from "../../../constants/LangConstants";
import { durationAsString } from "../../../utils/date-utils";

const useStyles = makeStyles({
	todoLine: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginRight: "1.75rem",
	},
	standardSpace: {
		margin: "8px",
	},
});

export const Header = ({ todoItem, index }) => {
	const classes = useStyles();
	const isDelayed = moment().diff(moment(todoItem.completeAt)) > 0;

	return (
		<div className={classes.todoLine}>
			<Typography className={classes.standardSpace} variant="h6">
				{index + 1}
			</Typography>
			<Chip
				label={isDelayed ? `${LangConstants.overdue} ${durationAsString(todoItem.completeAt, moment())}` : `${LangConstants.remaining} ${durationAsString( moment(), todoItem.completeAt,)}`}
				icon={isDelayed ? <TimerOffIcon /> : <TimerIcon />}
				color={isDelayed ? "secondary" : "primary"}
				variant="outlined"
			/>
		</div>
	);
};
