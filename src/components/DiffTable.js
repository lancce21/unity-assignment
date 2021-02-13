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

const DiffTable = () =>{
    const classes = useStyles();

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
                    
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default DiffTable;

