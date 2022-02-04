/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState, useContext, useRef, forwardRef } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import Select from 'react-select';
import { Button, Table } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import axios from 'axios';
import DevisAllQuestions from '../../pages/devis/[params]';
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
      <Button
        variant="danger"
        onClick={() => {
          deleteRow();
        }}
      >
        {' '}
        Effacer les données{' '}
      </Button>
    </>
  );
}

function NavbarTable({ navbarData, setNavbarData }) {
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const callToData = navbarData.map((elt) => ({
    colId: elt.id,
    colText: elt.text,
    colPos: elt.position,
    colVisi: elt.visible,
    colLink: elt.pages === '/' ? 'Homepage' : elt.pages,
    colSite: elt.pagetype,
  }));

  const positionList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];

  const typeList = [
    { value: 'devis', label: 'Devis' },
    { value: 'aides', label: 'Aides' },
  ];

  const data = useMemo(() => callToData, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Text',
        accessor: 'colText',
      },
      {
        Header: 'Position',
        accessor: 'colPos',
      },
      {
        Header: 'Visible ?',
        accessor: 'colVisi',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'colVisi', e.value);
              }}
              options={positionList}
              defaultValue={{ label: row.original.colVisi === 1 ? '✅' : '❌', value: row.original.colVisi }}
            />
          );
        },
      },
      {
        Header: 'Lien vers ?',
        accessor: 'colLink',
      },
      {
        Header: 'Partie du site',
        accessor: 'colSite',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'colSite', e.value);
              }}
              options={typeList}
              defaultValue={{ label: row.original.colSite === 'devis' ? 'Devis' : 'Aides', value: row.original.colSite }}
            />
          );
        },
      },
    ],
    [],
  );

  const [displayedData, setDisplayedData] = useState(data);
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
      id: elt.colId,
      position: Number(elt.colPos),
      text: elt.colText,
      visible: Number(elt.colVisi),
      pagetype: elt.colSite,
      pages: elt.colLink === 'Homepage' ? '/' : elt.colLink,
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
            { colId: res.data.id, colText: 'à remplir', colPos: 20, colVisi: 0, colLink: 'Homepage', colSite: 'devis' },
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
    <>
      <DataTable
        columns={columns}
        data={displayedData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setDisplayedData={setDisplayedData}
        displayedData={displayedData}
      />
      <Button
        variant="info"
        onClick={() => {
          addEmptyRow();
        }}
      >
        {' '}
        Ajouter une ligne{' '}
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          sendUpdatedData();
        }}
      >
        {' '}
        Mettre à jour{' '}
      </Button>
    </>
  );
}

export default NavbarTable;
