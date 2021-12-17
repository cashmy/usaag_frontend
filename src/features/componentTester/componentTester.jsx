import React, { Fragment } from "react";
import { Box, Grid, Paper, Toolbar, Typography } from '@mui/material';

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
	}
}));

export default function ComponentTester() {
	const classes = useStyles();

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

						<Box className={classes.myBox}
							sx={{ backgroundColor: 'primary' }}
						>
							<Typography variant="h5" >Test</Typography>
							<Typography variant="h5" >Test</Typography>
							<Typography variant="h5" >Test</Typography>
							<Typography variant="h5" >Test</Typography>
							<Typography variant="h5" >Test</Typography>
							<Typography variant="h5" >Test</Typography>
							<Typography variant="h5" >Test</Typography>
						</Box>

						<Box sx={{ backgroundColor: 'primary' }}>
							<Typography variant="h5" >Test</Typography>
						</Box>

					</Grid>

				</Grid>
			</Grid>

		</Fragment >
	)
}