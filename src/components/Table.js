import React, { Component }   from 'react';
import { compose }            from 'redux';
import { cloneDeep, orderBy } from 'lodash';
import * as RTable            from 'reactabular-table';
import * as search            from 'searchtabular';
import * as sort              from 'sortabular';
import * as resolve           from 'table-resolver';
import classes                from './Table.module.css';
import './sort.css';

import Paginator from './Paginator';

import Grid                                   from '@material-ui/core/Grid';
import TextField                              from '@material-ui/core/TextField';
import FormControl                            from '@material-ui/core/FormControl';
import InputLabel                             from '@material-ui/core/InputLabel';
import Select                                 from '@material-ui/core/Select';
import OutlinedInput                          from '@material-ui/core/OutlinedInput';
import IconButton                             from '@material-ui/core/IconButton';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';


const searchAllName = {
  all: 'ALL'
};
const CustomField   = props => (
  <Grid item xs={12}>
    <TextField
      id="outlined-filter-text"
      label="Filter"
      name="Filter"
      fullWidth
      variant="outlined"
      {...props}
    />
  </Grid>
);
const CustomSelect  = ({options, onChange}) => (
  <Grid item xs={12}>
    <FormControl variant="outlined" fullWidth className={classes.Select}>
      <InputLabel htmlFor="select"> Fields </InputLabel>
      <Select native id={'select'} onChange={onChange} color="primary"
              input={<OutlinedInput labelWidth={60} name="filter" id="outlined-filter"/>}>
        {options.map(({key, name, value}) => (
          <option key={key} value={value}> {name}  </option>
        ))}
      </Select>
    </FormControl>
  </Grid>
);
const paginate      = ({page, perPage}) => {
  
  return (rows = []) => {
    // adapt to zero indexed logic
    const p = page - 1 || 0;
    
    const amountOfPages = Math.ceil(rows.length / perPage);
    const startPage     = p < amountOfPages ? p : 0;
    
    return {
      amount: amountOfPages,
      rows  : rows.slice(startPage * perPage, (startPage * perPage) + perPage),
      page  : startPage
    };
  };
};
const sortHeader    = (sortable, getSortingColumns) => {
  
  
  return (value, {columnIndex}) => {
    
    const sortingColumns = getSortingColumns() || [];
    
    return (
      <div style={{display: 'inline'}}>
        <span>{value}</span>
        <span  {...sortable(value, {columnIndex}, {style: {float: 'right'}})}/>
        {sortingColumns[columnIndex] &&
        <span className="sort-order" style={{marginLeft: '0.5em', float: 'right'}}>
            {sortingColumns[columnIndex].position + 1}
          </span>
        }
      </div>
    );
  };
};

class Table extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rows          : this.props.rows,
      filterColumn  : 'all',
      query         : {}, // search query
      sortingColumns: null, // reference to the sorting columns
      columns       : this.getColumns(this.props.columns), // initial columns
      detailedRow   : [],
      pagination    : {
        page   : 1,
        perPage: 100
      },
    };
    
  }
  
  getColumns(columns) {
    const sortable       = sort.sort({
      getSortingColumns: () => this.state.sortingColumns || [],
      onSort           : selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      },
      // strategy: sort.strategies.byProperty  //--> doesnt works
    });
    const sortableHeader = sortHeader(sortable, () => this.state.sortingColumns);
    
    const myCols = cloneDeep(columns);
    
    for (const column of myCols) {
      
      // column.header.formatters = [sortableHeader];
      // console.log("AAA", column.header.formatters);
      if (!column.header.formatters) {
        column.header.formatters = [sortableHeader];
        // if (column.header.userFormatters) column.header.formatters.push(...column.header.userFormatters);
      }
      
      if (column.cell && column.cell.isDetail && !column.cell.formatters) {
        column.cell.formatters = [
          (value, {rowData, rowIndex}) => {
            
            return (
              <div>
                <IconButton
                  aria-label="Detalhar"
                  onClick={() => this.manageDetail(rowData, rowIndex)}>
                  {/*{this.state.detailRowArrow[rowIndex]}*/}
                  {!!this.state.detailedRow[rowIndex] ? <KeyboardArrowUp fontSize="small"/> : <KeyboardArrowDown fontSize="small"/>}
                </IconButton>
              </div>
            );
          }
        ];
      }
      if (!column.cell) column.cell = {};
      if (!column.cell.props) column.cell.props = {};
      column.cell.props['mobile-label'] = column.header.label;
      
      
    }
    
    return myCols;
  }
  
  onSelect(page) {
    const pages = Math.ceil(
      this.state.rows.length / this.state.pagination.perPage
    );
    
    this.setState({
      pagination: {
        ...this.state.pagination,
        page: Math.min(Math.max(page, 1), pages)
      }
    });
  }
  
  cellWrapper  = props => {
    
    let {children, field, ...others} = props;
    
    if (field && Array.isArray(children)) {
      // children = JSON.stringify(children);
      let cell = '';
      for (const properties of children) {
        cell += `${properties[field]} `;
      }
      return <td {...others}>
        {cell}
      </td>;
    }
    
    return <td {...props}/>;
    
  };
  rowWrapper   = Component => props => {
    
    let rowData, colSpan, detailRow;
    if (props.children.length) {
      rowData = props.children[0]._owner.memoizedProps.rowData;
      colSpan = props.children[0]._owner.memoizedProps.columns.length;
      
      detailRow = rowData.detailRow;
    }
    
    if (detailRow) {
      const detail = <Component row={rowData} index={rowData._index} {...this.props.detailData}/>;
      return <tr className={classes.Test}>
        {/*return <tr inside="true" style={{backgroundColor: 'cornsilk'}}>*/}
        <td colSpan={colSpan}>{detail}</td>
      </tr>;
    }
    return <tr {...props}/>;
    
  };
  manageDetail = (rowData, rowIndex) => {
    
    const {pagination, rows, detailedRow} = this.state;
    const {callDetails}                   = this.props;
    
    const lines = [...rows];
    
    const newPagination = {...pagination};
    
    console.log("oi", rowIndex)
    
    if (lines[rowIndex + 1] && lines[rowIndex + 1].detailRow) {
      
      rowData.detailed      = false;
      detailedRow[rowIndex] = false;
      lines.splice(rowIndex + 1, 1);
      newPagination.perPage--;
    } else {
      if (!lines[rowIndex].detail && callDetails) callDetails(rowData.id, rowIndex);
      const newRow = {...rowData, detailRow: true, id: `${rowData.id}d`};
      
      detailedRow[rowIndex] = true;
      rowData.detailed      = true;
      // lines[rowIndex].detailed = true;
      lines.splice(rowIndex + 1, 0, newRow);
      newPagination.perPage++;
    }
    
    this.setState({rows: lines, pagination: newPagination, detailedRow});
    
  };
  
  render() {
    
    const {
            columns, rows, pagination, sortingColumns, filterColumn, query
          }    = this.state;
    const cols = columns;
    
    const paginated = compose(
      paginate(pagination),
      sort.sorter({columns: cols, sortingColumns, sort: orderBy}),
      search.highlighter({columns: cols, matches: search.matches, query}),
      search.multipleColumns({columns: cols, query}),
      resolve.resolve({
        columns: cols,
        method : resolve.nested
      })
    )(rows);
    
    return (
      <Grid container>
        <Grid item xs={12} className={classes.FilterContainer}>
          <Grid container alignItems={'center'}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} md={6}>
                <search.Field
                  column={filterColumn}
                  query={query}
                  columns={cols}
                  rows={rows}
                  i18n={searchAllName}
                  components={{
                    filter: CustomField,
                    select: CustomSelect,
                    props : {
                      filter: {
                        placeholder: 'Refine'
                      }
                    }
                  }}
                  onColumnChange={filterColumn => this.setState({filterColumn})}
                  onChange={query => this.setState({query})}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.ScrollTable}>
          <RTable.Provider className={classes.MyTable} columns={cols}
                           renderers={{body: {row: this.rowWrapper(this.props.detailComponent), cell: this.cellWrapper}}}>
            <RTable.Header headerRows={resolve.headerRows({columns: cols})}/>
            <RTable.Body rows={paginated.rows} rowKey="id"/>
          </RTable.Provider>
          <div className={classes.Page}>
            <Paginator
              pagination={pagination}
              pages={paginated.amount}
              onSelect={page => this.onSelect(page)}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
  
  
}


export default Table;
