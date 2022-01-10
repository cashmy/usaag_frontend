import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Button,
    Checkbox,
    Chip,
    InputAdornment,
    Fab,
    Grid,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    Tooltip,
    Typography,
    TableContainer,
} from '@mui/material';
import clsx from "clsx";
import makeStyles from '@mui/styles/makeStyles';
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

// Wrapped Components
import Controls from '../../components/controls/Controls';
import useTable from "../../components/useTable";
// Service Layer
import CurriculumDetailService from '../../services/curriculumDetail.service';
import { amber } from '@mui/material/colors';

// ***** Styles *****
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(3),
        justifyContent: "center",
        display: "flex",
    },
    titleContainer: {
        padding: theme.spacing(1.4),
    },
    pageContent: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(7),
        marginLeft: theme.spacing(7),
        padding: theme.spacing(3)
    },
    multiLineDesc: {
        width: '25%',
    },
    backButton: {
        position: 'absolute',
        right: '60px',
    },
    toolbar: {
        justifyContent: 'flex-end',
    },
    paper: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
    },
    titlePaper: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
    }
}
))


export default function CurrDtlByTmpHdrTable(props) {
    const templateInfo = {
        'currTempHdrId': props.location.state.templateInfo.id,
        'currTempHdrName': props.location.state.templateInfo.name
    }
    const classes = useStyles();
    const history = useHistory();
    const [records, setRecords] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });

    const tTitleColor =
        props.location.state.action == 'copy' ? "#2196f3" :
            props.location.state.action == 'copyarch' ? "purple" :
                "#00a152";
    const tTitleText = "#ffffff";
    const theadColor = "purple"
    const theadText = "#ffffff"; // white
    const tableHeading =
        props.location.state.action == 'copy' ? "Template Copy: " :
            props.location.state.action == 'copyarch' ? "Template Copy/Archive: " :
                "Template Usage: "
    // * Table Columns
    const [columnCells, setColumnCells] = useState([])
    const columnSelect = [{ id: 'select', label: 'Select', disableSorting: true }]
    const columnCellsSubset = [
        { id: 'curriculumThemes.name', label: 'Course' },
        { id: 'assignmentSequence', label: 'Seq' },
        { id: 'curriculumType.name', label: 'Type' },
        { id: 'dayToAssign', label: 'Day' },
        { id: 'projectDays', label: 'Nbr Days' },
    ]

    useEffect(() => {
        async function getCurriculumDtls(id) {
            try {
                setIsLoading(true);
                const response = await CurriculumDetailService.getCurriculumDetailsbyTemplate(id);
                setRecords(response.data);
                setIsLoading(false)
            }
            catch (e) {
                console.log('API call unsuccessful', e)
            }
        }
        getCurriculumDtls(templateInfo.currTempHdrId)

        // Build Column Hdgs for table (based upon action requested: display or copy, copy/archive)
        var colHdgs = []
        if (props.location.state.action != 'display') {
            colHdgs = [...columnSelect];
        }
        colHdgs = [...colHdgs, ...columnCellsSubset];
        setColumnCells(colHdgs)

    }, [props, templateInfo.currTempHdrId])

    // * Table Constants
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, columnCells, filterFn, theadColor, theadText);

    // ***** Event Handlers *****
    const handleSearch = (e) => {
        let target = e.target;
        // state can't store functions, so we are storing an object with the function internally defined.
        setFilterFn({
            fn: (items) => {
                // target.value is the search box contents
                if (target.value === "") return items;
                else
                    return items.filter(
                        (x) =>
                            x.curriculumThemes.name
                                .toLowerCase()
                                .includes(target.value.toLowerCase()) ||
                            x.curriculumType.name
                                .toLowerCase()
                                .includes(target.value.toLowerCase())
                    );
            },
        });
    };
    const returnToParent = () => {
        history.push({
            pathname: "/templateTable",
        });
    };

    return (
        <Fragment>
            {/* //* Header Bar */}
            <Grid container className={classes.root} spacing={1}>
                <Grid container className={classes.container} spacing={3}>
                    <Grid item xl={4}>
                        <Paper className={classes.titlePaper} style={{ backgroundColor: tTitleColor, color: tTitleText }} >
                            <Grid item md={12} className={classes.titleContainer} >
                                <Typography variant="h4">{tableHeading} </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={classes.paper}>
                            <Toolbar>
                                <Typography variant="h4">{templateInfo.currTempHdrName.substr(0, 30)} </Typography>
                                <Tooltip title="Return to Template Table">
                                    <Fab
                                        className={classes.backButton}
                                        color="secondary"
                                        aria-label="return to template table"
                                        size="small"
                                        onClick={returnToParent}
                                    >
                                        <ArrowBackIcon />
                                    </Fab>
                                </Tooltip>
                            </Toolbar>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            {/* // * Main table here */}
            <Paper className={classes.pageContent}>
                <div style={{ height: 590, width: '100%' }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={3}>
                            <Controls.Input
                                label="Search Course or Type"
                                fullWidth={false}
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>)
                                }}
                                onChange={handleSearch}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            {(props.location.state.action != "display") &&
                                <Typography variant="body1" color='primary' >Select items to update with new version</Typography>
                            }
                        </Grid>
                        <Grid item xs={6}>

                            <TblPagination
                                rowsPerPage={10}
                                rowsPerPageOptions={[5, 10, 20, { value: -1, label: 'All' }]}
                            />
                        </Grid>
                    </Grid>

                    <TableContainer sx={{ maxHeight: 480 }} >
                        <TblContainer stickyHeader={true}>
                            <TblHead />
                            <TableBody>
                                {isLoading ? (
                                    <TableRow key="999">
                                        <TableCell>
                                            <Typography> Loading ... </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (recordsAfterPagingAndSorting().length <= 0)
                                    // TODO: Possibly remove the length check
                                    ? (
                                        <TableRow key="999">
                                            <TableCell>
                                                <Typography> Template is not assigned to any course </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (recordsAfterPagingAndSorting().map(item => (
                                        <TableRow key={item.id}>
                                            {(props.location.state.action != "display") &&
                                                <TableCell>
                                                    <Checkbox />
                                                </TableCell>}
                                            <TableCell>{item.curriculumThemes.name}</TableCell>
                                            <TableCell>{item.assignmentSequence}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.curriculumType.name != null ? item.curriculumType.name : "TBA"}
                                                    style={{
                                                        backgroundColor: item.curriculumType.chipColor,
                                                        color: item.curriculumType.textColor
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{item.dayToAssign}</TableCell>
                                            <TableCell>{item.projectDays}</TableCell>
                                        </TableRow>
                                    ))
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                    </TableContainer>

                    {/* // * Dialogs, Modals, & Popups */}
                    <Controls.Notification notify={notify} setNotify={setNotify} />
                    <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
                </div>

            </Paper >
        </Fragment>
    )
}