import React from 'react';
import Pagify from 'react-pagify';
import segmentize from 'segmentize';
import classes from './Table.module.css';

const Paginator = ({ pagination, pages, onSelect }) => (
  <div >
    <Pagify.Context
      className={classes.Pagify}
      segments={segmentize({
        page: pagination.page,
        pages,
        beginPages: 3,
        endPages: 3,
        sidePages: 2
      })}
      onSelect={onSelect}
    >
      <Pagify.Button page={pagination.page - 1}>Anterior</Pagify.Button>
      
      <Pagify.Segment field="beginPages" />
      
      <Pagify.Ellipsis
        className={classes.Ellipsis}
        previousField="beginPages"
        nextField="previousPages"
      />
      
      <Pagify.Segment field="previousPages" />
      <Pagify.Segment field="centerPage" className={classes.Selected} />
      <Pagify.Segment field="nextPages" />
      
      <Pagify.Ellipsis
        className={classes.Ellipsis}
        previousField="nextPages"
        nextField="endPages"
      />
      
      <Pagify.Segment field="endPages" />
      
      <Pagify.Button page={pagination.page + 1}>Próximo</Pagify.Button>
    </Pagify.Context>
  </div>
);


export default Paginator;
