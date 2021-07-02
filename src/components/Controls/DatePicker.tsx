import React from 'react'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePicker(props) {
  const classes = useStyles();
  const { name, label, value, onChange } = props

// console.log(value);
  const convertToDefEventPara = (name, value) => ({
      target: {
          name, value
      }
  })

  return (
      <TextField
        id="date"
        label={label}
        type="date"
        defaultValue={moment(value).format('YYYY-MM-DD')}
        name={name}
        onChange={onChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}
