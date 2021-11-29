import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {
    Fab,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Tooltip,
    Typography,
    makeStyles,
} from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// Wrapped Components
import Controls from '../../components/controls/Controls';
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
    // searchInput: {
    //     width: '25%',
    // },
    // multiLineDesc: {
    //     width: '25%',
    // },
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
}
))

// ***** Event Handlers *****
const handleEditRow = (id) => {
    alert(`Editing Row for : ${id}`)
    // openInPopup(record)
}
const handleDeleteRow = (id) => {
    alert(`Deleting Row for : ${id}`)
}

// ***** Table Header Declarations & Helper Functions *****
function getTempHdrName(params) { return params.row.templateHeader.name }
const columns = [
    { field: 'themeId', headerName: "Theme Id", width: 120, hide: true },
    { field: 'id', headerName: 'Id', width: 90, hide: true },
    { field: 'assignmentSequence', headerName: 'Seq', width: 110 },
    { field: 'lectureTopics', headerName: 'Lecture Topics', width: 500, editable: true },
    { field: 'dayToAssign', headerName: 'Day', width: 110, editable: true },
    { field: 'projectDays', headerName: 'Proj Days', width: 140, editable: true },
    { field: 'headerId', headerName: 'Project Id', width: 90, hide: true },
    {
        field: 'templateHeader.name',
        headerName: 'Project Name',
        width: 250,
        valueGetter: getTempHdrName,
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
    },
    { field: 'notes', headerName: 'Notes', width: 150, editable: true },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <div>
                <IconButton
                    aria-label="edit"
                    onClick={() => handleEditRow(params.row.id)}
                    color="primary"
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteRow(params.row.id)}
                    color="secondary"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    }
]

// ***** Main Function *****
export default function CurriculumDetail(props) {
    const currThemeId = props.location.state.recordForEdit.id;
    const currThemeName = props.location.state.recordForEdit.name;
    const classes = useStyles();
    const history = useHistory();
    // const [mode, setMode] = useState("");
    const [records, setRecords] = useState([])
    const [loadData, setLoadData] = useState(true)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        // console.log("Curr Detail Props: ", props.location.state.recordForEdit)
        getCurriculumDtls(currThemeId)
    }, [loadData, props])

    async function getCurriculumDtls(id) {
        try {
            const response = await CurriculumDetailService.getCurriculumDetails(id);
            setRecords(response.data);
            setLoadData(false)
        }
        catch (e) {
            console.log('API call unsuccessful', e)
        }
    }
    // const handleSearch = () => {
    //
    // }
    const mapRecords = () => {
        let mapResult = records.map((record, i) => {
            // console.log("Data Record: ", record)
            return record;
        });
        return mapResult
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (record, resetForm) => {
        if (record.id === 0) {
            CurriculumDetailService.addCurriculumDetail(record)
            setLoadData(true); // Request reload of data
        }
        else {
            CurriculumDetailService.updateCurriculumDetail(record)
            setLoadData(true); // Request reload of data
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false) // Close Popup modal
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const returnToParent = () => {
        history.push({
            pathname: "/curriculumThemes",
        });
    }

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
                                <Typography variant="h4">{currThemeName.substr(0, 30)} </Typography>
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
                                        onClick={() => {
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

            {/* // * Data Grid Table */}
            <Paper className={classes.pageContent}>
                <div style={{ height: 590, width: '100%' }}>
                    <DataGrid
                        classes={{
                            toolbar: classes.toolbar,
                        }}
                        editMode="row"
                        rows={mapRecords()}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                        // checkboxSelection 
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </div>
            </Paper >

            {/* // * Dialogs, Modals, & Popups */}
            <Controls.Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Curriculum Detail" >
                <CurriculumDetailForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Controls.Popup>
            <Controls.Notification notify={notify} setNotify={setNotify} />
            <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </React.Fragment>
    );
}