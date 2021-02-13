import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

const renderEmptyBodyRow = ()=>{

    return (<TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
    </TableRow>);
};

const renderRows = (data)=>{
    // let's provide at least 3 rows regardless of how much data there is
    const minRows = 3;
    const rowCount = data?.length;
    let rows;

    if(!rowCount || rowCount < 3){
        rows = new Array(minRows);    
    }

    return rows.map(row=>{
        return renderEmptyBodyRow();
    });
};

const DiffTable = (props) =>{
    const classes = useStyles();
    const {data} = props;

    console.log(data);

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
                        renderEmptyBodyRow()
                    }
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default DiffTable;

