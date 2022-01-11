import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
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
import makeStyles from '@mui/styles/makeStyles';
// Icons
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Wrapped Components
import Controls from '../../components/controls/Controls';
import useTable from "../../components/useTable";
// Service Layer
import CurriculumDetailService from '../../services/curriculumDetail.service';
// Primary CRUD Child Component
import CurriculumDetailForm from "./CurriculumDetailForm";

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
    headingContainer: {
        paddingTop: theme.spacing(3),
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
    addButton: {
        position: 'absolute',
        right: '10px',
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
        backgroundColor: "purple",
        color: "white",
        display: "flex",
        flexDirection: "column",
    },
    searchInput: {
        width: '100%',
    },
}
))

// * Table Columns
const columnCells = [
    { id: 'assignmentSequence', label: 'Seq' },
    { id: 'lectureTopics', label: 'Topics' },
    { id: 'curriculumtype.name', label: 'Type' },
    { id: 'dayToAssign', label: 'Day' },
    { id: 'projectDays', label: 'Nbr Days' },
    { id: 'templateheader.name', label: 'Project' },
    { id: 'notes', label: 'Notes' },
    { id: 'actions', label: 'Actions', disableSorting: true },
]

// ***** Main Function *****
export default function CurriculumDetail(props) {
    console.log("Props-Location-State: ", props.location.state)
    const [themeInfo, setThemeInfo] = useState({})
    const classes = useStyles();
    const history = useHistory();
    // const [mode, setMode] = useState("");
    const [records, setRecords] = useState([])
    const [loadData, setLoadData] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const theadColor = "purple"; // purple
    const theadText = "#ffffff"; // white
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        async function getCurriculumDtls(id) {
            try {
                setIsLoading(true);
                const response = await CurriculumDetailService.getCurriculumDetails(id);
                setRecords(response.data);
                // setLoadData(false)
                setIsLoading(false)
            }
            catch (e) {
                console.log('API call unsuccessful', e)
            }
        }
        setThemeInfo({
            'currThemeId': props.location.state.currThemeHdr.id,
            'currThemeName': props.location.state.currThemeHdr.name.substr(0, 30)
        })
        getCurriculumDtls(props.location.state.currThemeHdr.id)
    }, [loadData, props])

    // * Table Constants
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, columnCells, filterFn, theadColor, theadText);

    // ***** Event Handlers *****
    const handleSearch = e => {
        let target = e.target;
        // state can't store functions, so we are storing an object with the function internally defined.
        setFilterFn({
            fn: items => {
                // target.value is the search box contents
                if (target.value === "")
                    return items;
                else
                    return items.filter(
                        (x) =>
                            x.lectureTopics
                                .toLowerCase()
                                .includes(target.value.toLowerCase()) ||
                            x.curriculumType.name
                                .toLowerCase()
                                .includes(target.value.toLowerCase()) ||
                            x.templateHeader.name
                                .toLowerCase()
                                .includes(target.value.toLowerCase()) ||
                            x.notes
                                .toLowerCase()
                                .includes(target.value.toLowerCase())
                    )
            }
        })
    };
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    };
    const addOrEdit = (record, resetForm, close) => {
        console.log("Editing detail with the following info: ", record)
        debugger
        if (record.id === 0) {
            CurriculumDetailService.addCurriculumDetail(record)
            setLoadData(true); // Request reload of data
        }
        else {
            CurriculumDetailService.updateCurriculumDetail(record)
            setLoadData(true); // Request reload of data
        }
        if (close) {
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false) // Close Popup modal
        }

        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    };
    const handleEdit = (record) => {
        openInPopup(record)
    };
    const onDelete = (themeId, id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        CurriculumDetailService.deleteCurriculumDetail(themeId, id)
        setLoadData(!loadData); // Request reload of data
        setNotify({
            isOpen: true,
            message: "Record deleted",
            type: "error",
        });
    };
    const handleDelete = (themeId, id) => {
        setConfirmDialog({
            isOpen: true,
            title:
                "Are you sure you want to delete this Curriculum Theme and all of its Detail?",
            subTitle: "You can't undo this action.",
            onConfirm: () => {
                onDelete(themeId, id);
            },
        })
    };
    const returnToParent = () => {
        history.push({
            pathname: "/curriculumThemes",
        });
    };

    return (
        <React.Fragment>

            {/* //* Header Bar */}
            <Grid container className={classes.root} spacing={1}>
                <Grid container className={classes.container} spacing={3}>
                    <Grid item xl={4}>
                        <Paper className={classes.titlePaper}>
                            <Grid item md={12} className={classes.titleContainer}>
                                <Typography variant="h4">Curriculum Detail: </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={classes.paper}>
                            <Toolbar>
                                <Typography variant="h4">{themeInfo.currThemeName} </Typography>
                                <Tooltip title="Return to Curriculum Header">
                                    <Fab
                                        className={classes.backButton}
                                        color="secondary"
                                        aria-label="return to curriculum detail"
                                        size="small"
                                        onClick={returnToParent}
                                    >
                                        <ArrowBackIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Add Curriculum Detail">
                                    <Fab
                                        className={classes.addButton}
                                        color="primary"
                                        aria-label="add a curriculum detail record"
                                        size="small"
                                        onClick={(item) => {
                                            setOpenPopup(true);
                                            setRecordForEdit(null);
                                        }}
                                    >
                                        <AddIcon />
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
                        <Grid item xs={6}>
                            <Controls.Input
                                label="Search Topics, Type, Project, and Notes"
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
                                ) : (
                                    recordsAfterPagingAndSorting().map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.assignmentSequence}</TableCell>
                                            <TableCell
                                                className={classes.multiLineDesc}
                                            >{item.lectureTopics}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.curriculumType.name}
                                                    style={{
                                                        backgroundColor: item.curriculumType.chipColor,
                                                        color: item.curriculumType.textColor
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{item.dayToAssign}</TableCell>
                                            <TableCell>{item.projectDays}</TableCell>
                                            <TableCell>{item.templateHeader.name}</TableCell>
                                            <TableCell
                                                className={classes.multiLineDesc}
                                            >{item.notes}</TableCell>
                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="darkcyan"
                                                    size="large"
                                                    onClick={() => handleEdit(item)}>
                                                    <EditOutlinedIcon fontSize="small" />
                                                </Controls.ActionButton>
                                                <Controls.ActionButton
                                                    color="red"
                                                    onClick={() => handleDelete(item.themeId, item.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                                }
                            </TableBody>
                        </TblContainer>
                    </TableContainer>
                    {/* <TblPagination /> */}
                    {/* </Scrollbars> */}
                </div>

            </Paper >

            {/* // * Dialogs, Modals, & Popups */}
            <Controls.Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Curriculum Detail" >
                <CurriculumDetailForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} themeInfo={themeInfo} />
            </Controls.Popup>
            <Controls.Notification notify={notify} setNotify={setNotify} />
            <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </React.Fragment >
    );
}