import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';

function UserTable({ usersData }) {
  const callToData = usersData.map((elt) => ({
    colNom: elt.firstname + elt.lastname,
    colEmail: elt.email,
    colTel: elt.phone ? elt.phone : 'non renseigné',
    colAdress: elt.adress ? elt.adress : 'non renseigné',
    colPostal: elt.postalcode,
    colVille: elt.city,
    colMessages: elt.messages.length,
    colDevis: elt.devis.length,
  }));

  const data = useMemo(() => callToData, []);

  const columns = useMemo(() => [
    {
      Header: 'Nom',
      accessor: 'colNom',
    },
    {
      Header: 'Email',
      accessor: 'colEmail',
    },
    {
      Header: 'Téléphone',
      accessor: 'colTel',
    },
    {
      Header: 'Adresse',
      accessor: 'colAdress',
    },
    {
      Header: 'Code Postal',
      accessor: 'colPostal',
    },
    {
      Header: 'Ville',
      accessor: 'colVille',
    },
    {
      Header: 'Nbre de messages',
      accessor: 'colMessages',
    },
    {
      Header: 'Nbres de devis',
      accessor: 'colDevis',
    },
  ]);
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((columns) => (
              <th key={columns.accessor} {...columns.getHeaderProps()}>
                {columns.render('Header')}
                {/* <span>{columns.isSorted ? (columns.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span> */}
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
