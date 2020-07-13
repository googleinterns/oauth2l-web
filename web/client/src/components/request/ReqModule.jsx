import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Select,
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Typography,
  Button,
  Grid,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import "../../styles/request.css";

/**
 * @return {Formik} component using Formik for creating send Request
 */
export default function ReqModule() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = (num) => {
    if (num === 1) {
      setOpen1(true);
    } else if (num === 2) {
      setOpen2(true);
    }
  };

  const handleClose = (num) => {
    if (num === 1) {
      setOpen1(false);
    } else if (num === 2) {
      setOpen2(false);
    }
  };

  return (
    <Formik
      initialValues={{
        httpMethod: "",
        URI: "",
        contentType: "",
        headerName: "",
        headerValue: "",
        reqBody: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Typography variant="h4">HTTP Request </Typography>
          <div>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              className="request-content"
            >
              <Grid item xs={6} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="http">HTTP Request</InputLabel>
                  <Field
                    name="httpMethod"
                    input={<OutlinedInput label="HTTP Request"></OutlinedInput>}
                    display="flex"
                    autoWidth={true}
                    as={Select}
                  >
                    <MenuItem value="GET">GET</MenuItem>
                    <MenuItem value="POST">POST</MenuItem>
                    <MenuItem value="PUT">PUT</MenuItem>
                    <MenuItem value="DELETE">DELETE</MenuItem>
                    <MenuItem value="PATCH">PATCH</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleClickOpen(1)}>
                  Add Header
                </Button>
              </Grid>
            </Grid>

            <Dialog open={open1} onClose={() => handleClose(1)}>
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <Field
                  placeholder="Header Name"
                  name="headerName"
                  as={TextField}
                />
              </DialogContent>
              <DialogContent>
                <Field
                  placeholder="Header Value"
                  name="headerValue"
                  as={TextField}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(1)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Field
              name="URI"
              label="URI"
              as={TextField}
              fullWidth
              className="request-content"
            />

            <Grid
              container
              // direction="row"
              justify="space-between"
              alignItems="flex-start"
              className="request-content"
            >
              <Grid item xs={6} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="content">Content</InputLabel>
                  <Field
                    input={<OutlinedInput label="Content"></OutlinedInput>}
                    placeholder="contentType"
                    name="contentType"
                    display="flex"
                    autoWidth={true}
                    as={Select}
                  >
                    <MenuItem value="application/json">
                      application/json
                    </MenuItem>
                    <MenuItem value="text/plain">text/plain</MenuItem>
                    <MenuItem value="text/csv">text/csv</MenuItem>
                    <MenuItem value="Custom...">Custom...</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleClickOpen(2)}>
                  Add Body
                </Button>
              </Grid>
            </Grid>

            <Dialog open={open2} onClose={() => handleClose(2)}>
              <DialogContent>
                <Field name="reqBody" placeholder="Body" as={TextField} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(2)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              color="primary"
              variant="contained"
              type="submit"
              className="request-content"
            >
              {isSubmitting ? "Submitting" : "Send Request"}
            </Button>
          </div>
          <div className="request-content">
            <Typography variant="h5" gutterBottom>
              Response/Request
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                multiline
                fullWidth
                variant="outlined"
                value={JSON.stringify(values, null, 2)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </form>
          </div>
        </Form>
      )}
    </Formik>
  );
}
