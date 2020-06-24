/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false
    }
}]*/

import React from "react";
import {Field, reduxForm} from 'redux-form';
import {Container, Grid,Typography,Button, Radio, RadioGroup, FormControlLabel,FormControl} from '@material-ui/core';
/**
 * 
 * @param {*} values returns the error that occurred 
 */
const validate = values => {
  const errors = {}
  const reqFields = ['type','format']
  reqFields.forEach(field => {
    if (!values[field]) {
       errors[field] = 'Required'
    }
  })

  if(values.type === "JWT" && values.format === "Header"){
    errors.format = "Invalid format type for JWT token"
  }
  return errors
}


const radioButtonA = ({input , ...rest}) => (
  
 <FormControl>
  <RadioGroup  {...input} {...rest}>
  <FormControlLabel value="OAuth" control= {<Radio color = "primary"/>} label= "OAuth"/>
  <FormControlLabel value="JWT" control= {<Radio color = "primary"/>} label= "JWT"/>
  </RadioGroup>
 </FormControl>

)


const radioButtonB = ({input , ...rest}) => (
  
  <FormControl>
   <RadioGroup  {...input} {...rest}>
   <FormControlLabel value="Bare" control= {<Radio color = "primary"/>} label= "Bare"/>
   <FormControlLabel value="Header" control= {<Radio color = "primary"/>} label= "Header"/>
   <FormControlLabel value="JSON" control= {<Radio color = "primary"/>} label= "JSON"/>
   <FormControlLabel value="JSON_Compact" control= {<Radio color = "primary"/>} label= "JSON_Compact"/>
   <FormControlLabel value="Pretty" control= {<Radio color = "primary"/>} label= "Pretty"/>
   </RadioGroup>
  </FormControl>
 
 )
 
/**
 *
 * @return {div} returns the page that contains the ability to choose the type and type 
 */
function Credentials(props) {
  const {handleSubmit,pristine, reset, submitting} = props;

  return (
    <div className="top">
      <div className="shadow-box-example z-depth-2">
        <Container>
          <form onSubmit={handleSubmit}> 
            <Typography variant = "h5">Choose token type </Typography>
            <Field name="type" component = {radioButtonA}>
              <Grid container = "row">
              <Grid container spacing = {3}>
                <Grid item xs>
                  <Radio name = "OAuth" label = "OAuth"/>
                </Grid> 
                <Grid item xs>
                  <Radio name = "JWT" label = "JWT" />
                </Grid>
                </Grid>
                </Grid>
            </Field>
            <Typography variant = "h5">Choose token format</Typography>
            <Field name="format" component = {radioButtonB}>
              <Grid container = "row">
                <Grid container spacing = {3}>
                  <Grid item xs>
                  <Radio
                    value="Bare"
                    label="Bare"
                    >OAuth</Radio>
                </Grid>
                <Grid item xs>
                  <Radio
                    value = "Header"
                    label = "Header"
                  />
                  </Grid>
                </Grid>
              </Grid>
              <div style = {{padding: 30}}>
              <Grid container = "row">
                <Grid container spacing = {3}>
                  <Grid item xs>
                  <Radio
                    value = "JSON"
                    label = "JSON"
                
                  />
                  </Grid>
                <Grid item xs>
                  <Radio
                    value = "JSON_Compact"
                    label = "JSON_Compact"
                  />
                  </Grid>
                </Grid>
              </Grid>
              </div>
              <div id="next"></div>
              <Grid containter = "row">
                <Grid item xs>
                <Radio
                  value = "Pretty"
                  label = "Pretty"
                 />
                </Grid>
              </Grid>
            </Field>
            <div className="btn1">
              <Button variant = "outlined" color = "primary"  type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Container>
      </div>
      <div style={{ float: "right" }} className="next">
        <Button name="Next"></Button>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'Credentials',
  validate
})(Credentials)
