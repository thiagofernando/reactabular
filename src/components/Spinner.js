import React            from 'react';
import classes          from './Spinner.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop         from '@material-ui/core/Backdrop';

const spinner = () => {

  return (
    <div className={classes.Spinner}>
      <Backdrop className={classes.Backdrop} open={true}>
      <CircularProgress color="secondary" />
      </Backdrop>
      </div>
  );

};

export default spinner;
