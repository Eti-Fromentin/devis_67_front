/* eslint-disable react/display-name */
import React, { useMemo, Fragment, useCallback } from 'react';
import { useExpanded, useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';
import Select from 'react-select';

function MessagesTable({ messagesData, updateMessage }) {
  const statusList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];
  const data = useMemo(() => messagesData, [messagesData]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        accessor: 'registered',
        Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '-' : '+'}</span>,
      },
      {
        Header: 'Réception/Traitement',
        accessor: (row) => row.created_at.split('T')[0],
      },
      {
        Header: 'Statut',
        accessor: 'statut',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row, e.value);
              }}
              options={statusList}
              defaultValue={{ label: row.original.statut === 1 ? '✅' : '❌', value: row.original.statut }}
            />
          );
        },
      },
      {
        Header: 'Sujet',
        accessor: 'subject',
      },
      {
        Header: 'Enregistré',
        accessor: (row) => (row.user_id ? '✅' : '❌'),
      },
      {
        Header: 'Nom',
        accessor: 'sender_name',
      },
      {
        Header: 'Email',
        accessor: (row) => <a href={`mailto:${row.sender_email}`}> {row.sender_email} </a>,
      },
    ],
    [messagesData],
  );

  const updateMyData = (row, value) => {
    updateMessage(row.original.id, value);
  };

  const tableInstance = useTable({ columns, data }, useSortBy, useExpanded);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = tableInstance;

  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '20px',
          overflowWrap: 'anywhere',
        }}
      >
        <div>{row.original.text}</div>
      </pre>
    ),
    [],
  );

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((columns, index) => (
              <th key={index} {...columns.getHeaderProps(columns.getSortByToggleProps())}>
                {columns.render('Header')}
                <span>{columns.isSorted ? (columns.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const rowProps = row.getRowProps();
          return (
            <Fragment key={rowProps.key}>
              <tr {...rowProps}>
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
              {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>{renderRowSubComponent({ row })}</td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
}

export default MessagesTable;
