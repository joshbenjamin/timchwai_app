import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/system';

const CareerTable = ({ careers }) => {
  // Group careers by type
  const groupBy = (array, key) =>
    array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});

  const groupedCareers = groupBy(careers, 'type');

  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 1 }}>Team</TableCell>
            <TableCell sx={{ py: 1 }}>Name</TableCell>
            <TableCell sx={{ py: 1 }}>Years</TableCell>
            <TableCell sx={{ py: 1 }}>Apps</TableCell>
            <TableCell sx={{ py: 1 }}>Goals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedCareers).map(([group, groupCareers]) => (
            <React.Fragment key={group}>
              <TableRow>
                <TableCell colSpan={5} style={{ fontWeight: 'bold' }}>
                  <Typography variant="subtitle1">{group}</Typography>
                </TableCell>
              </TableRow>
              {groupCareers.map((career) => (
                <TableRow key={career.id}>
                  <TableCell sx={{ py: 1 }}>
                    {career.Team.image && (
                      <img
                        src={career.Team.image}
                        alt={career.Team.name}
                        style={{
                          width: theme.breakpoints.down('sm') ? '30px' : '50px',
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>
                    {career.Team.name}
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>
                    <Box whiteSpace="nowrap">
                      {career.from_year} -<br />
                      {career.to_year ? career.to_year : 'Present'}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>{career.apps}</TableCell>
                  <TableCell sx={{ py: 1 }}>{career.goals}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CareerTable;
