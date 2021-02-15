import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { TableBody, TableCell, TableRow } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const renderEmptyBodyRow = (rowId)=>{

    return (<TableRow key={rowId}>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
    </TableRow>);
};

const renderDiffRow = (rowData, idx) =>{
    const {id, timestamp, diff} = rowData;

    const date = moment(timestamp).format("YYYY-MM-DD");


    const {newValue, oldValue} = diff[0];

    return (
        <TableRow key={idx}>
            <TableCell>{date}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{newValue}</TableCell>
            <TableCell>{oldValue}</TableCell>
        </TableRow>
    );
};

const renderRows = (data)=>{
    // let's provide at least 3 rows regardless of how much data there is
    const rowCount = data?.length;
    let rows = rowCount ? data : [];


    return rows ? rows.map((row, idx)=>{
        return renderDiffRow(row, idx);
    }) : renderEmptyBodyRow(1);
};

const DiffTable = (props) =>{
    const classes = useStyles();
    const {data} = props;

    return (
        <TableContainer data-testid="diff-table" component={Paper}>
            <Table className={classes.Table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Old value</TableCell>
                        <TableCell>New value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        renderRows(data)
                    }
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default DiffTable;

