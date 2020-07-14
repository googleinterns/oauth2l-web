import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  FormHelperText,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../styles/request.css";
import prettifyJSON from "../../util/prettify_json";
import { object, string } from "yup";
import { getHTTPResponse } from "../../util/apiWrapper";

/**
 * @return {Formik} component using Formik for creating send Request
 */
export default function ReqModule() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [response, setResponse] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

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

  const getResponse = async (values) => {
    const Response = await getHTTPResponse(values);
    if ("Error" in Response) {
      setErrorOpen(true);
      setHasError(true);
      setErrMessage(Response["Error"]["message"]);
    } else {
      setResponse(prettifyJSON(JSON.stringify(Response["data"], null, 2)));
    }
  };

  return (
    <Formik
      initialValues={{
        httpMethod: "",
        URI: "",
        contentType: "",
        headers: [{ headerName: "", headerValue: "" }],
        reqBody: "",
        token: "",
      }}
      onSubmit={async (values) => getResponse(values)}
      validationSchema={object({
        httpMethod: string().required("Must have HTTP method"),
        URI: string().required("Must have a URI"),
        token: string().required("Must have a token"),
      })}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <div>
          <Form>
            <Typography variant="h4">HTTP Request </Typography>
            <div>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                className="request-content"
              >
                <Grid item xs={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={errors.httpMethod && touched.httpMethod}
                  >
                    <InputLabel id="http">HTTP Request</InputLabel>
                    <Field
                      name="httpMethod"
                      input={
                        <OutlinedInput label="HTTP Request"></OutlinedInput>
                      }
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
                    {errors.httpMethod && touched.httpMethod && (
                      <FormHelperText>HTTP method required.</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpen(1)}
                  >
                    Add Header
                  </Button>
                </Grid>
              </Grid>

              <Dialog open={open1} onClose={() => handleClose(1)} fullWidth>
                <DialogTitle>Add Header</DialogTitle>
                <FieldArray
                  name="headers"
                  render={({ remove, push }) => (
                    <div>
                      {values.headers.length > 0 &&
                        values.headers.map((_, index) => (
                          <div key={index}>
                            <DialogContent>
                              <Field
                                placeholder="Header Name"
                                name={`headers.${index}.headerName`}
                                fullWidth
                                as={TextField}
                              />
                            </DialogContent>
                            <DialogContent>
                              <Field
                                placeholder="Header Value"
                                name={`headers.${index}.headerValue`}
                                fullWidth
                                as={TextField}
                              />
                            </DialogContent>

                            <IconButton
                              color="primary"
                              component="span"
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ))}

                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() =>
                          push({ headerName: "", headerValue: "" })
                        }
                        style={{ float: "right" }}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </div>
                  )}
                />
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
                variant="outlined"
                className="request-content"
                error={errors.URI && touched.URI}
                helperText={errors.URI && touched.URI ? "URI required." : null}
              />

              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                className="request-content"
              >
                <Grid item xs={6}>
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
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpen(2)}
                  >
                    Add Body
                  </Button>
                </Grid>
              </Grid>

              <Dialog open={open2} onClose={() => handleClose(2)} fullWidth>
                <DialogTitle>Add Body</DialogTitle>
                <DialogContent>
                  <Field
                    name="reqBody"
                    placeholder="Body"
                    as={TextField}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(2)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Field
                name="token"
                label="Token"
                as={TextField}
                fullWidth
                variant="outlined"
                className="request-content"
                error={errors.token && touched.token}
                helperText={
                  errors.token && touched.token ? "Token required." : null
                }
              />

              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                color="primary"
                variant="contained"
                type="submit"
                className="request-content"
              >
                {isSubmitting ? "Submitting" : "Send Request"}
              </Button>
            </div>
          </Form>
          <div className="request-content">
            <Typography variant="h5" gutterBottom>
              Response/Request
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                multiline
                fullWidth
                variant="outlined"
                // value={JSON.stringify(values, null, 2)}
                value={response}
                InputProps={{
                  readOnly: true,
                }}
              />
            </form>
          </div>
          <div>
            {/* Alert for error in fetching request. */}
            {hasError && (
              <Collapse in={errorOpen} className="collapse-reset">
                <Alert
                  variant="outlined"
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrorOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errMessage}
                </Alert>
              </Collapse>
            )}
          </div>
        </div>
      )}
    </Formik>
  );
}
