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

  const groupBy = (array, key) =>
    array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});

  const sortGroups = (groups) => {
    const sortOrder = ['YOUTH', 'COLLEGE', 'SENIOR', 'INTERNATIONAL', 'MANAGER'];
  
    return groups.sort((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    });
  };

  const hasLoan = (careers) => {
    return careers.some((career) => career.loan === true);
  };
  
  const hasCurrentTeam = (careers) => {
    return careers.some((career) => career.to_year === null);
  };  

  const getFontWeight = (career) => {
    if (career.to_year === null) {
      return 'bold';
    } else {
      return 'normal';
    }
  };

  const getFontStyle = (career) => {
    if (career.loan === true) {
      return 'italic';
    } else {
      return 'normal';
    }
  };

  const groupedCareers = groupBy(careers, 'type');

  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Box padding={1}>
        {hasLoan(careers) && (
          <Box display="block">
            <Typography variant="body2" component="span" fontStyle="italic">
              Italics - Loan
            </Typography>
          </Box>
        )}
        {hasCurrentTeam(careers) && (
          <Box display="block">
            <Typography variant="body2" component="span" fontWeight="bold">
              Bold - Current
            </Typography>
          </Box>
        )}
      </Box>
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
          {sortGroups(Object.keys(groupedCareers)).map((group) => {
            const groupCareers = groupedCareers[group];
            return (
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
                          src={`${career.Team.image}?t_cache=public,max-age=31536000`}
                          alt={career.Team.name}
                          style={{
                            width: theme.breakpoints.down('sm') ? '30px' : '50px',
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 1, fontWeight: getFontWeight(career), fontStyle: getFontStyle(career) }}>{career.Team.name}</TableCell>
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
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CareerTable;
