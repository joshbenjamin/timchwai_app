import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const CareerTable = ({ careers }) => {
  // Group careers by type
  const groupBy = (array, key) =>
    array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});

  const groupedCareers = groupBy(careers, 'type');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Years</TableCell>
            <TableCell>Apps</TableCell>
            <TableCell>Goals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedCareers).map(([group, groupCareers]) => (
            <React.Fragment key={group}>
              <TableRow>
                <TableCell colSpan={5} style={{ fontWeight: 'bold' }}>
                  {group}
                </TableCell>
              </TableRow>
              {groupCareers.map((career) => (
                <TableRow key={career.id}>
                  <TableCell>
                    {career.Team.image && (
                        <img
                          src={career.Team.image}
                          alt={career.Team.name}
                          style={{ width: '50px' }}
                        />
                    )}
                  </TableCell>
                  <TableCell>{career.Team.name}</TableCell>
                  <TableCell>
                    {career.from_year} - {career.to_year ? career.to_year : 'Present'}
                  </TableCell>
                  <TableCell>{career.apps}</TableCell>
                  <TableCell>{career.goals}</TableCell>
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
