import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// import { Typography } from '@mui/material';
import TemplateHeaderService from '../../../services/templateHeader.service';
import TemplateDetailService from '../../../services/templateDetail.service';
import dccLogo from '../../../assets/images/devCodeCamp-Logo-12W.png';
import RobotoBold from '../../../assets/fonts/Roboto-Bold.ttf';
import RobotoItalic from '../../../assets/fonts/Roboto-Italic.ttf';

// * Styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    titleBox: {
        marginLeft: 4,
        marginTop: 8,
        marginBottom: 12,
    },
    titleText: {
        fontSize: 18,
        textAlign: 'Left',
    },
    versionText: {
        width: 275,
        fontSize: 8,
        textAlign: 'right',
    },
    label: {
        marginRight: 12,
        fontSize: 10,
        textAlign: 'left',
    },
    fieldData: {
        marginLeft: 8,
        marginRight: 12,
        fontSize: 10,
        textAlign: 'left',
    },
    text: {
        marginLeft: 8,
        marginRight: 12,
        fontSize: 10,
        textAlign: 'left',
    },
    logo: {
        width: 150,
    },
    headerRow: {
        fontsize: 10,
        flexDirection: 'row',
        width: '100%',
        height: 'auto'
    },
    headerPage: {
        marginTop: 8,
        textAlign: 'right',
        fontSize: 10,
    },
    headerText: {
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 4,
        marginLeft: 8,
        marginRight: 12,
        fontSize: 10,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#4caf50',
    },
    headerSpace: {
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 4,
    },
    colHdgText: {
        marginLeft: 4,
        marginRight: 23,
        fontSize: 10,
        textAlign: 'left',
    },
    featureHeadings: {
        marginTop: 8,
        width: '100%',
        fontSize: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 60,
        backgroundColor: '#e65100',
        color: '#000000',
    },
    columnHeadings: {
        marginTop: 4,
        marginBottom: 4,
        fontSize: 10,
        flexDirection: 'row',
    },
    row: {
        fontSize: 10,
        padding: 4,
        flexDirection: 'row',
    },
});

// * Fonts
Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: RobotoBold,
            fontWeight: 700,
        },
        {
            src: RobotoItalic,
            fontWeight: 'normal',
            fontStyle: 'italic',
        },
    ]
})

// * Create Document Component
export default function UserStoryTemplate(props) {
    const { id } = props
    const title = "User Story Template"
    const subTitle = "<optional subtitle>"

    const [colHdgItems, setColHdgItems] = useState();
    const [headerData, setHeaderData] = useState({});     // Template Header Info
    const [data, setData] = useState();                 // Template Detail User Stories
    const [bonusData, setBonusData] = useState();       // Template Detail Bonus Stories
    const [version, setVersion] = useState();
    const colHdgs = [
        { field: 'pointValue', headerName: 'Points', width: 30 },
        { field: 'description', headerName: 'Details', width: 450 },
    ]

    // Helper function to format the version int a short readable format
    const formatVersion = (main, minor, sub) => {
        return main.toString() + "." + minor.toString() + "." + sub.toString();
    }

    async function getRecords() {
        try {
            const hdrResponse = await TemplateHeaderService.getTemplateHeader(id);
            setHeaderData(hdrResponse.data);
            setVersion(formatVersion(hdrResponse.data.versionMain, hdrResponse.data.versionMinor, hdrResponse.data.versionSub))
            const response = await TemplateDetailService.getTemplateDetailsByBonus(id, false);
            setData(response.data);
            const response2 = await TemplateDetailService.getTemplateDetailsByBonus(id, true);
            setBonusData(response2.data);
        } catch (e) {
            console.log("API call unsuccessful", e);
        }
    }

    useEffect(() => {
        // map Column Headings
        if (!colHdgs) return <Text style={styles.text}>Not Specified</Text>
        let mapResult = colHdgs.map((item, index) => {
            let width = item.width
            return (
                <Text key={index} style={[styles.colHdgText, width ? { width: width } : "", , { height: 'auto' }]}>{item.headerName}</Text>
            )
        })
        setColHdgItems(mapResult)
        getRecords()
    }, [])


    return (
        < Document >
            < Page size="LETTER" style={[styles.body, { height: 'auto' }]} wrap >

                {/* //* Page Header */}
                <View style={styles.headerRow} fixed>
                    <Image
                        style={styles.logo}
                        src={dccLogo}
                    />
                    <Text style={[styles.headerSpace], { width: 125 }} />
                    <Text style={[
                        styles.headerText,
                        { width: 50 },
                        { height: 'auto' },
                        { fontFamily: 'Roboto', fontStyle: 'italic' }]}
                    >Template</Text>
                    <Text style={[styles.headerSpace], { width: 175 }} />
                    <Text style={[styles.headerPage, { width: 20 }, { height: 'auto' }]} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} />
                </View>

                {/* //* Template Header Info */}
                <View style={styles.titleBox}>
                    <Text style={styles.titleText} fixed>{headerData.abbreviation} - {headerData.name}</Text>
                    <Text style={styles.versionText}>
                        Version:{" "}{version}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[
                        styles.label,
                        { width: 60 },
                        { height: 'auto' },
                        { fontFamily: 'Roboto', fontWeight: 'bold' }]}
                    >Tech Stack</Text>
                    <Text style={[styles.fieldData, { width: 450 }, { height: 'auto' }]} >{headerData.technologyStack}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[
                        styles.label,
                        { width: 60 },
                        { height: 'auto' },
                        { fontFamily: 'Roboto', fontWeight: 'bold' }]}
                    >Goal</Text>
                    <Text style={[styles.fieldData, { width: 450 }, { height: 'auto' }]} >{headerData.goal}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[
                        styles.label,
                        { width: 60 },
                        { height: 'auto' },
                        { fontFamily: 'Roboto', fontWeight: 'bold' }]}
                    >Notes</Text>
                    <Text style={[styles.fieldData, { width: 450 }, { height: 'auto' }]} >{headerData.specialNotes}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[
                        styles.label,
                        { width: 60 },
                        { height: 'auto' },
                        { fontFamily: 'Roboto', fontWeight: 'bold' }]}
                    >Points</Text>
                    <Text style={[styles.fieldData, { width: 450 }, { height: 'auto' }]} >
                        Total: {headerData.totalPoints} /
                        Wghtd: {headerData.totalWeightedPoints}
                    </Text>
                </View>

                {/* //* Feature Headings */}
                <Text style={[styles.featureHeadings, { fontFamily: 'Roboto', fontWeight: 'bold' }]}>
                    Features
                </Text>
                <View style={styles.columnHeadings}>
                    {colHdgItems}
                </View>

                {/* Feature Data block  */}
                <View>
                    {data
                        ? data.map((item, index) => {
                            // console.log("Index: ", index, item.description)

                            // Row data
                            return (
                                <View key={index} style={styles.row}>
                                    <Text style={[styles.text, { width: colHdgs[0].width }, { height: 'auto' }]} > {item.pointValue} </Text>
                                    <Text style={[
                                        styles.text,
                                        { width: colHdgs[1].width },
                                        { height: 'auto' },
                                        item.greyHighlight ? { backgroundColor: '#9e9e9e' } : ""
                                    ]}
                                    > {item.title + ": " + item.description} </Text>
                                </View>
                            )
                        })
                        : ""
                    }
                </View>

                {/* //* Bonus Headings */}
                <Text style={[styles.featureHeadings, { fontFamily: 'Roboto', fontWeight: 'bold' }]}>
                    Bonuses
                </Text>
                <View style={styles.columnHeadings}>
                    {colHdgItems}
                </View>

                {/* Bonus Data block  */}
                <View>
                    {bonusData
                        ? bonusData.map((item, index) => {
                            // console.log("Index: ", index, item.description)

                            // Row data
                            return (
                                <View key={index} style={styles.row} wrap={false}>
                                    <Text style={[styles.text, { width: colHdgs[0].width }, { height: 'auto' }]} > {item.pointValue} </Text>
                                    <Text style={[
                                        styles.text,
                                        { width: colHdgs[1].width },
                                        { height: 'auto' },
                                        item.greyHighlight ? { backgroundColor: '#9e9e9e' } : ""
                                    ]}
                                    > {item.title + ": "} {item.description} </Text>
                                </View>
                            )
                        })
                        : ""
                    }
                </View>
            </Page >
        </Document >
    )
}
