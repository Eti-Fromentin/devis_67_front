/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState, useContext, useRef, forwardRef } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import Select from 'react-select';
import { Button, Table } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import axios from 'axios';
import styles from '../../styles/NavBarTable.module.css';
const _ = require('lodash');

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

function DataTable({ columns, data, updateMyData, skipPageReset, setDisplayedData, displayedData }) {
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      initialState: { pageIndex: 0, pageSize: 20 },
      updateMyData,
      // initialCellStateAccessor,
    },
    usePagination,
    useRowSelect,
    // useRowState,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  const deleteRow = async () => {
    const items = selectedFlatRows.map((elt) => elt.original);
    const itemsToDelete = await items.map((elt) => ({ id: elt.colId }));
    await axios({
      method: 'delete',
      url: `${apiUrl}/navbar/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: itemsToDelete,
    })
      .then((res) => {
        if (res.status === 204) {
          setDisplayedData(displayedData.filter((elt) => !itemsToDelete.some((element) => elt.colId === element.id)));
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  return (
    <>
      {' '}
      <Button
        className={styles.buttonEffacerLesDonnées}
        variant="danger"
        onClick={() => {
          deleteRow();
        }}
      >
        {' '}
        Effacer les données{' '}
      </Button>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Aller à la page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Voir {pageSize} lignes
            </option>
          ))}
        </select>
      </div>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
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
    </>
  );
}

function NavbarTable({ navbarData, setNavbarData, urls }) {
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // const callToData = navbarData.map((elt) => ({
  //   id: elt.id,
  //   text: elt.text,
  //   position: elt.position,
  //   visible: elt.visible,
  //   pages: elt.pages === '/' ? 'Homepage' : elt.pages,
  //   pagetype: elt.pagetype,
  // }));

  const positionList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];

  const urlsList = urls.map((elt) => ({ value: elt.url, label: elt.url }));

  const typeList = [
    { value: 'devis', label: 'Devis' },
    { value: 'aides', label: 'Aides' },
  ];

  const data = useMemo(() => navbarData, []);
  const [displayedData, setDisplayedData] = useState(data);

  const columns = useMemo(
    () => [
      {
        Header: 'Text',
        accessor: 'text',
      },
      {
        Header: 'Visible ?',
        accessor: 'visible',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'visible', e.value);
              }}
              options={positionList}
              defaultValue={{ label: row.original.visible === 1 ? '✅' : '❌', value: row.original.visible }}
            />
          );
        },
      },
      {
        Header: 'Lien vers ?',
        accessor: 'pages',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                console.log(e.value);
                updateMyData(row.index, 'pages', e.value);
              }}
              options={urlsList}
              defaultValue={{ label: row.original.pages, value: row.original.pages }}
            />
          );
        },
      },
      {
        Header: 'Partie du site',
        accessor: 'pagetype',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'pagetype', e.value);
              }}
              options={typeList}
              defaultValue={{ label: row.original.pagetype === 'devis' ? 'Devis' : 'Aides', value: row.original.pagetype }}
            />
          );
        },
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
    ],
    [displayedData],
  );

  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setDisplayedData(
      displayedData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...displayedData[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  const sendUpdatedData = async () => {
    const newData = await displayedData.map((elt) => ({
      id: elt.id,
      position: Number(elt.position),
      text: elt.text,
      visible: Number(elt.visible),
      pagetype: elt.pagetype,
      pages: elt.pages === 'Homepage' ? '/' : elt.pages,
    }));
    const filteredData = await newData.filter((elt, index) => !_.isEqual(elt, navbarData[index]));
    // console.log(newData);
    // console.log(filteredData);
    // console.log(navbarData);
    await axios({
      method: 'put',
      url: `${apiUrl}/navbar/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: filteredData,
    })
      .then((res) => {
        if (res.status === 200) {
          const body = res.body;
          alert('Données mises à jour');
          setNavbarData([...newData, { body }]);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  const addEmptyRow = async () => {
    await axios({
      method: 'post',
      url: `${apiUrl}/navbar/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: { position: 20, text: 'à remplir', visible: 0, pagetype: 'devis' },
    })
      .then((res) => {
        if (res.status === 201) {
          setDisplayedData([
            ...displayedData,
            { colId: res.data.id, text: 'à remplir', position: 20, visible: 0, pages: 'Homepage', pagetype: 'devis' },
          ]);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [displayedData]);

  return (
    <section className={styles.xyz}>
      <section className={styles.buttonsDevis}>
        <Button
          className={styles.buttonAjouterUneLigne}
          variant="info"
          onClick={() => {
            addEmptyRow();
          }}
        >
          {' '}
          Ajouter une ligne{' '}
        </Button>
        <Button
          className={styles.buttonMettreAJour}
          variant="primary"
          onClick={() => {
            sendUpdatedData();
          }}
        >
          {' '}
          Mettre à jour{' '}
        </Button>
      </section>
      <DataTable
        columns={columns}
        data={displayedData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setDisplayedData={setDisplayedData}
        displayedData={displayedData}
      />
    </section>
  );
}

export default NavbarTable;
