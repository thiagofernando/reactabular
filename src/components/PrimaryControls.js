import React from 'react';
import PropTypes from 'prop-types';
import * as search from 'searchtabular';

const PrimaryControls = ({
                           perPage, columns, rows, column, query,
                           onSearch, onColumnChange,
                           ...props
                         }) => (
  <div {...props}>
    <div className="search-container">
      <span>Search</span>
      <search.Field
        column={column}
        query={query}
        columns={columns}
        rows={rows}
        onChange={onSearch}
        onColumnChange={onColumnChange}
      />
    </div>
  </div>
);
PrimaryControls.propTypes = {
  perPage: PropTypes.number,
  columns: PropTypes.array,
  rows: PropTypes.array,
  column: PropTypes.string,
  query: PropTypes.object,
  onSearch: PropTypes.func,
  onColumnChange: PropTypes.func
};

export default PrimaryControls;
