/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';

function UserTable({ usersData }) {
  const data = useMemo(() => usersData, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
      },
      {
        Header: 'Nom',
        accessor: (row) => row.firstname + row.lastname,
      },
      {
        Header: 'Email',
        accessor: (row) => <a href={`mailto:${row.email}`}> {row.email} </a>,
      },
      {
        Header: 'Téléphone',
        accessor: (row) => (row.phone ? row.phone : 'non renseigné'),
      },
      {
        Header: 'Adresse',
        accessor: (row) => (row.address ? row.address : 'non renseigné'),
      },
      {
        Header: 'Code Postal',
        accessor: 'postalcode',
      },
      {
        Header: 'Ville',
        accessor: 'city',
      },
      {
        Header: 'Messages',
        accessor: (row) => row.messages.length,
      },
      {
        Header: 'Devis',
        accessor: (row) => row.devis.length,
      },
    ],
    [],
  );
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((columns) => (
              <th key={columns.accessor} {...columns.getHeaderProps(columns.getSortByToggleProps())}>
                {columns.render('Header')}
                <span>{columns.isSorted ? (columns.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;
