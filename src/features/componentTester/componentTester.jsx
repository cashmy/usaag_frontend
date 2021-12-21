import React, { Fragment, useRef, useState, useCallback } from "react";
import { Box, Grid, Paper, Toolbar, Typography } from '@mui/material';
import ClrPicker from '../../components/controls/ColorPicker';
import makeStyles from '@mui/styles/makeStyles';


// * Styling
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	container: {
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(4),
		justifyContent: "center",
		display: "flex",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		display: "flex",
		flexDirection: "column",
	},
	myBox: {
		color: theme.palette.text.secondary,
		backgroundColor: "primary",
		border: "5px",
		padding: "5px",
		width: "200px",
		height: "200px",
		overflow: "auto",
	},

}));

export default function ComponentTester() {
	const classes = useStyles();

	const [field1, setField1] = useState("#bdbdbd")


	const handleInputChange = (event) => {
		setField1(event.target.value)
		console.log(event)
	}

	return (
		<Fragment>
			<Grid container className={classes.root} spacing={1}>
				<Grid container className={classes.container} spacing={3}>
					{/* //* Header Bar */}
					<Grid item xs={11}>
						<Paper className={classes.paper}>
							<Toolbar>
								<Typography variant="h4">Component Tester</Typography>
							</Toolbar>
						</Paper>
					</Grid>

					{/* //* Box Component */}
					<Grid item xs={11}>

						{/* <Typography className={classes.picker} variant="caption" >Background Color</Typography> */}
						<ClrPicker
							name="cpkColor"
							label="Background Color"
							value={field1}
							onChange={handleInputChange}
						/>

					</Grid>

				</Grid>
			</Grid>

		</Fragment >
	)
}