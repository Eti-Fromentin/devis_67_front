import React, { useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import { Table } from 'react-bootstrap';

function UserTable({ usersData }) {
  useEffect(() => {
    console.log(usersData);
  }, []);

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
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((columns) => (
              <th key={columns.accessor} {...columns.getHeaderProps()}>
                {columns.render('Header')}
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
        {/* {!usersData ? (
      <Spinner animation="border" />
    ) : (
      usersData.map((elt, index) => (
        <tr key={index}>
          <td>{elt.id}</td>
          <td>{elt.firstname + elt.lastname}</td>
          <td>{elt.email}</td>
          <td>{elt.phone ? elt.phone : 'Non renseigné'}</td>
          <td>{elt.address ? elt.address : 'Non renseigné'}</td>
          <td>{elt.postalcode}</td>
          <td>{elt.city}</td>
          <td>{elt.messages.length}</td>
          <td>{elt.devis.length}</td>
        </tr>
      ))
    )} */}
      </tbody>
    </Table>
  );
}

export default UserTable;
