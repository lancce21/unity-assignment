import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

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

            </Table>

        </TableContainer>
    );
};

export default DiffTable;

