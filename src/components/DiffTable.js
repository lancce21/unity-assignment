import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const renderDiffRow = (rowData, idx) =>{
    const {id, timestamp, diff} = rowData;

    const date = moment(timestamp).format("YYYY-MM-DD");

    const {newValue, oldValue} = diff && diff.length ? diff[0] : {};

    if(!newValue || !oldValue || !date || !id) return null;


    return (
        <TableRow data-testid="diff-table-row" key={idx}>
            <TableCell>{date}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{newValue}</TableCell>
            <TableCell>{oldValue}</TableCell>
        </TableRow>
    );
};

const renderRows = (data)=>{
    const rowCount = data?.length;
    let rows = rowCount ? data : [];

    return rows.map((row, idx)=>{
        return renderDiffRow(row, idx);
    }) 
};

const DiffTable = (props) =>{
    const classes = useStyles();
    const {data, sortDesc, onSort} = props;

    const sortIcon = sortDesc
            ? <ArrowDropDownIcon fontSize="small" /> 
            : <ArrowDropUpIcon fontSize="small" />;

    const sortedData = data.sort((a, b) =>{
        if(a.timestamp === b.timestamp) return 0;
        if(a.timestamp > b.timestamp) return  sortDesc ? -1 : 1;
        return sortDesc ? 1 : -1;
    });

    return (
        <TableContainer data-testid="diff-table" component={Paper}>
            <Table className={classes.Table}>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={onSort}>Date&nbsp;{sortIcon}</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Old value</TableCell>
                        <TableCell>New value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        renderRows(sortedData)
                    }
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default DiffTable;

