import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';

function UserTable({ usersData }) {
  const callToData = usersData.map((elt) => ({
    colId: elt.id,
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
  //     [
  //       {
  //         colId: 79,
  //         isAdmin: 0,
  //         created_at: '2022-01-25T21:56:28.000Z',
  //         colNom: 'Arni',
  //         lastname: 'bgn',
  //         colEmail: 'arnibgn@email.com',
  //         colPhone: 123456,
  //         colAdress: 'LE MONT ROTI',
  //         ColPostal: 75017,
  //         colCity: 'Paris',
  //         status: 0,
  //         messages: 1,
  //         devis: 15,
  //       },
  //       {
  //         colId: 80,
  //         isAdmin: 0,
  //         created_at: '2022-01-24T21:56:28.000Z',
  //         colNom: 'Arniaea',
  //         lastname: 'bgnfdf',
  //         colEmail: 'arnibqsgn@email.com',
  //         colPhone: 12345678,
  //         colAdress: 'le chauve',
  //         ColPostal: 75017,
  //         colCity: 'Paris',
  //         status: 0,
  //         messages: 5,
  //         devis: 1,
  //       },
  //       {
  //         colId: 86,
  //         isAdmin: 0,
  //         created_at: '2022-01-13T21:56:28.000Z',
  //         colNom: 'Arnnghi',
  //         lastname: 'bghhfn',
  //         colEmail: 'arnibgdkkn@email.com',
  //         colPhone: 12345674,
  //         colAdress: 'whatever',
  //         ColPostal: 75017,
  //         colCity: 'Parissq',
  //         status: 0,
  //         messages: 8,
  //         devis: 13,
  //       },
  //     ],
  //   [],
  // );

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'colId',
      },
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
