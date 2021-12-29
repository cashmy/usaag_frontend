import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { Typography } from '@mui/material';

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
    title: {
        fontSize: 24,
        textAlign: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 12,

    },
    text: {
        marginLeft: 12,
        marginRight: 12,
        fontSize: 10,
        textAlign: 'left',

    },
    columnHeadings: {
        margin: 8,
        fontSize: 10,
        fontWeight: 'bold',
        padding: 8,
        backgroundColor: 'blue',
        color: '#ffffff',
        flexDirection: 'row',
    },
    row: {
        margin: 8,
        fontSize: 10,
        padding: 8,
        flexDirection: 'row',
    }
});


// * Create Document Component
export default function DiagReport(props) {
    const { title, subTitle, colHdgs, data } = props
    const [colHdgItems, setColHdgItems] = useState()
    const [rowItems, setRowItems] = useState()

    const colHdgs = [
        { field: 'pointValue', headerName: 'Points', width: 75 },
        { field: 'description', headerName: 'Details', width: 400 },
    ]

    useEffect(() => {
        // map Column Headings
        if (!colHdgs) return <Text style={styles.text}>Not Specified</Text>
        let mapResult = colHdgs.map((item, index) => {
            let width = item.width
            return (
                <Text key={index} style={[styles.text, width ? { width: width } : ""]}>{item.headerName}</Text>
            )
        })
        console.log("Headings map: ", mapResult)
        setColHdgItems(mapResult)

    }, [])


    return (
        <Document>
            <Page size="LETTER" style={styles.body} wrap>
                <Text style={styles.title} fixed>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>

                {/* Headings */}
                <View style={styles.columnHeadings}>
                    {colHdgItems}
                </View>

                {/* Data block  */}
                <View>
                    {data
                        ? data.map((item, index) => {
                            console.log("Index: ", index)

                            // Row data
                            return (
                                <View key={index} style={styles.row}>
                                    <Text style={[styles.text, { width: colHdgs[0].width }]} > {item.id} </Text>
                                    <Text style={[styles.text, { width: colHdgs[1].width }]} > {item.diag} </Text>
                                </View>
                            )
                        })
                        : ""
                    }
                </View>
            </Page>
        </Document>
    )
}
