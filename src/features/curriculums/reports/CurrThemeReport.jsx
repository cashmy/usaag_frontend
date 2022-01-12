import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
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

return (
    <Document>

    </Document>
)