/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState } from 'react';
import Select from 'react-select';

import DataTable from './DataTable';

import styles from '../../styles/NavBarTable.module.css';

function CategTable({ categData, setCategData }) {
  const [table] = useState('categories');

  const [emptyRowTable] = useState({
    title: 'catégorie',
  });

  const visibleList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];

  const newEmptyRowDisplay = (res) => {
    const emptyRow = { id: res.id, title: 'catégorie', position: 50, visible: 1 };
    return emptyRow;
  };

  const dataToUpdate = (data) => {
    const newData = data.map((elt) => ({
      id: elt.id,
      position: Number(elt.position),
      title: elt.title,
      visible: Number(elt.visible),
      alias: elt.title,
    }));
    return newData;
  };

  const data = useMemo(() => categData, [categData]);
  const columns = useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'title',
      },
      {
        Header: 'Visible',
        accessor: 'visible',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'visible', e.value);
              }}
              options={visibleList}
              defaultValue={{ label: row.original.visible === 1 ? '✅' : '❌', value: row.original.visible }}
            />
          );
        },
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
    ],
    [categData],
  );
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setCategData(
      categData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...data[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [categData]);

  return (
    <section className={styles.xyz}>
      <DataTable
        columns={columns}
        data={data}
        table={table}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setTableData={setCategData}
        tableData={categData}
        newEmptyRowDisplay={newEmptyRowDisplay}
        dataToUpdate={dataToUpdate}
        newEmptyRowTable={emptyRowTable}
        setSkipPageReset={setSkipPageReset}
        // refreshData={refreshData}
      />
    </section>
  );
}

export default CategTable;
