import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Controls from "../../../Controls/Controls";
import { useForm, ErrorMessage, Form } from '../../../Controls/useForm';

const UserForm = ({ open, onHandleClose, onHandleSubmit, user }) => {

  const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
  ]

  const departmentItems = [
    { id: '0', title: 'None' },
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
  ]

  const initialFValues = {
      id: 0,
      name: '',
      email: '',
      mobile: '',
      city: '',
      gender: 'male',
      departmentId: '',
      hireDate: new Date(),
      isPermanent: false,
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors } as ErrorMessage;
    if ('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "This field is required."
    if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('mobile' in fieldValues)
        temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
    if ('departmentId' in fieldValues)
        temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
}

  const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
  } = useForm(initialFValues, user, true, validate);

  const createUser = async (e) => {
    e.preventDefault()
    if (validate()){
      onHandleSubmit(values);
    }
  }

  return (
    <Dialog open={open} onClose={onHandleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{user.id? 'Edit ' + user.name : 'Add a user'}</DialogTitle>
      <DialogContent>
        <Form >
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="name"
                label="Full Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <Controls.Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Controls.Input
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
              />
              <Controls.Input
                label="City"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={values.gender}
                onChange={handleInputChange}
                items={genderItems}
              />
              <Controls.Select
                name="departmentId"
                label="Department"
                value={values.departmentId}
                onChange={handleInputChange}
                options={departmentItems}
                error={errors.departmentId}
              />
              <Controls.DatePicker
                name="hireDate"
                label="Hire Date"
                value={values.hireDate}
                onChange={handleInputChange}
              />
              <Controls.Checkbox
                name="isPermanent"
                label="Permanent Employee"
                value={values.isPermanent}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createUser} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserForm;
