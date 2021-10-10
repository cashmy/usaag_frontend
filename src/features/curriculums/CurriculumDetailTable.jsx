import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { IconButton, Paper, makeStyles, Fab } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Wrapped Components
import Controls from '../../components/controls/Controls';
import PageHeader from '../../components/PageHeader/PageHeader';
// Service Layer
// import PatientService from '../../services/patient.service';
// Primary CRUD Child Component
// import PatientForm from './PatientForm';

// ***** Styles *****
const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '25%',
    },
    multiLineDesc: {
        width: '25%',
    },
    addButton: {
        position: 'absolute',
        right: '10px',
    },
    toolbar: {
        justifyContent: 'flex-end',
    }
}
))

// ***** Event Handlers *****
const handleEditRow = (id) => {
    alert(`Editing Row for : ${id}`)

}
const handleDeleteRow = (id) => {
    alert(`Deleting Row for : ${id}`)
}

// ***** Table Header Declarations & Helper Functions *****
const columns = [
    { field: 'id', headerName: 'Theme Id', width: 90, hide: true },
    { field: 'assignmentSequence', headerName: 'Seq', width: 45 },
    { field: 'dayToAssign', headerName: 'Day', width: 45 },
    { field: 'projectDays', headerName: 'Proj Days', width: 45 },
    { field: 'lectureTopics', headerName: 'Lecture Topics', width: 150 },
    { field: 'headerId', headerName: 'Project Id', width: 90, hide: true },
    { field: 'name', headerName: 'Project Name', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 150 },
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
export default function CurriculumDetail() {
    const classes = useStyles();
    const [mode, setMode] = useState("");
    const [records, setRecords] = useState([])
    const [loadData, setLoadData] = useState(true)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


    useEffect(() => {
        getPatients();
    }, [loadData])

    async function getPatients(e) {
        try {
            const response = await PatientService.getAllPatients();
            setRecords(response.data);
            setLoadData(false)
        }
        catch (e) {
            console.log('API call unsuccessful', e)
        }
    }

    const mapRecords = () => {
        let mapResult = records.map((record, i) => {
            // Need "id" only for DataGrid to work (operates as key)
            record.id = record.themeId
            return record;
        });
        return mapResult
    }

    // const openInPopup = item => {
    //     setRecordForEdit(item)
    //     setOpenPopup(true)
    // }

    const addOrEdit = (record, resetForm) => {
        if (mode === "ADD") {
            PatientService.addPatient(record)
            setLoadData(true); // Request reload of data
        }
        else {
            PatientService.updatePatient(record)
            setLoadData(true); // Request reload of data
        }
        resetForm()
        setMode("")
        setRecordForEdit(null)
        setOpenPopup(false) // Close Popup modal
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    return (
        <React.Fragment>
            <PageHeader
                title="Patients"
                subtitle="List of patients"
                icon={<PatientIcon />}
                isSvg={true}
            />
            <Paper className={classes.pageContent}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        classes={{
                            toolbar: classes.toolbar,
                        }}
                        rows={mapRecords()}
                        columns={columns}
                        pageSize={5}
                        // checkboxSelection 
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </div>
            </Paper >

            <Controls.Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Patient Form" >
                {/* <PatientForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
            </Controls.Popup>
            <Controls.Notification notify={notify} setNotify={setNotify} />
            <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </React.Fragment>
    );
}