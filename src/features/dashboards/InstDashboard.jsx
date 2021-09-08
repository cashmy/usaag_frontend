import React, { useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";

// Images
import TemplateImage from "../../assets/images/templates.png";
import CohortImage from "../../assets/images/cohorts.png";
import CurriculumImage from "../../assets/images/curriculum.png";

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
  cardWidth: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
  avatarPrimaryColor: {
    backgroundColor: "#f86e23",
    color: theme.palette.getContrastText("#f86e23"),
  },
  avatarSecondaryColor: {
    backgroundColor: "#00e676",
    color: theme.palette.getContrastText("#00e676"),
  },
  avatarTertiaryColor: {
    backgroundColor: "#d600f9",
    color: theme.palette.getContrastText("#d600f9"),
  },
}));

export default function InstDashboard() {
  const classes = useStyles();
  const [expandedTemplate, setExpandedTemplate] = useState(false);
  const [expandedCohort, setExpandedCohort] = useState(false);
  const [expandedCurriculum, setExpandedCurriculum] = useState(false);

  const handleExpandTemplateClick = () => {
    setExpandedTemplate(!expandedTemplate);
  };
  const handleExpandCohortClick = () => {
    setExpandedCohort(!expandedCohort);
  };
  const handleExpandCurriculumClick = () => {
    setExpandedCurriculum(!expandedCurriculum);
  };

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={10}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h4">Instructor Home Page</Typography>
            </Paper>
          </Grid>

          {/* Template Card */}
          <Grid item xs={3}>
            <Card className={classes.cardWidth} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="template"
                    className={classes.avatarSecondaryColor}
                  >
                    T
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Templates"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={`${TemplateImage}`}
                title="Template"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum dolor ...
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="edit templates">
                  <AssignmentIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expandedTemplate,
                  })}
                  onClick={handleExpandTemplateClick}
                  aria-expanded={expandedTemplate}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expandedTemplate} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Total Active Templates: nn </Typography>
                  <Typography paragraph>
                    Total Historical Templates: n,nnn
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>

          {/* Cohort-Student Card */}
          <Grid item xs={3}>
            <Card className={classes.cardWidth} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="cohort-students"
                    className={classes.avatarPrimaryColor}
                  >
                    CS
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Cohorts - Students"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={`${CohortImage}`}
                title="Cohorts"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum dolor ...
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="edit templates">
                  <PeopleIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expandedCohort,
                  })}
                  onClick={handleExpandCohortClick}
                  aria-expanded={expandedCohort}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expandedCohort} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Active Cohorts: nn </Typography>
                  <Typography paragraph>
                    Current Students Enrolled: nnn
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>

          {/* Curriculum Card */}
          <Grid item xs={3}>
            <Card className={classes.cardWidth} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="curriculum"
                    className={classes.avatarTertiaryColor}
                  >
                    C
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Curriculum"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={`${CurriculumImage}`}
                title="Curriculum"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum dolor ...
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="edit templates">
                  <MenuBookIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expandedCurriculum,
                  })}
                  onClick={handleExpandCurriculumClick}
                  aria-expanded={expandedCurriculum}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expandedCurriculum} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Total Courses: nn </Typography>
                  <Typography paragraph>Total Projects: n,nnn</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </React.Fragment>
  );
}
