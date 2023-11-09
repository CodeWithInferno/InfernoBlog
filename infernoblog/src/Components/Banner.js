import React from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  banner: {
    width: 400,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto', // Center horizontally
    marginTop: theme.spacing(2), // Add top margin for spacing
  },
}));

function Banner({ bannerImage }) {
  const classes = useStyles();

  return (
    <Paper className={classes.banner}>
      <img src={bannerImage} alt="Banner" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </Paper>
  );
}

export default Banner;
