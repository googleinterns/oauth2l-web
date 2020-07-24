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
  Menu,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import "../../styles/request.css";
import { object, string } from "yup";
import { getHTTPResponse } from "../../util/apiWrapper";
import PropTypes from "prop-types";

/**
 *
 * @param {func} props passes a callback function that sends the response back to the parent
 * @return {Formik} component using Formik for creating send Request
 */
export default function RequestModule(props) {
  const [openHeaderBox, setOpenHeaderBox] = useState(false);
  const [openRequestBodyBox, setOpenRequestBodyBox] = useState(false);
  const [openContentTypeBox, setOpenContentTypeBox] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   *
   * @param {string} response holds the response to the HTTP request
   * sends the response of the HTTP request to the parent to be displayed
   */
  const sendResponse = (response) => {
    props.parentCallback(response);
  };

  /**
   *
   * @param {JSON} values holds the parameter of the HTTP request.
   * @param {func} helpers contains all of the helper functions of formik, passed in order to reset the form
   * calls api wrapper to execute the HTTP request created and sends the response back to the parent component to be displayed
   */
  const getResponse = async (values, helpers) => {
    const param = {
      url: values.url,
      method: values.httpMethod.toLowerCase(),
      headers: {
        Authorization: "Bearer " + values.token,
        ...(values.contentType ? { "Content-Type": values.contentType } : null),
        ...(values.reqBody ? { data: values.reqBody } : null),
      },
    };
    for (let i = 0; i < values.headers.length; i++) {
      if (
        values.headers[i].headerName.length !== 0 &&
        values[i].headerValue.length !== 0
      ) {
        param.headers[values.headers[i].headerName] =
          values.headers[i].headerValue;
      }
    }
    const response = await getHTTPResponse(param);
    helpers.resetForm();
    if ("Error" in response) {
      setErrorOpen(true);
      setHasError(true);
      setErrMessage(response["Error"]["message"]);
    } else {
      sendResponse(JSON.stringify(response["data"], null, 2));
    }
  };

  return (
    <Formik
      initialValues={{
        httpMethod: "",
        url: "",
        contentType: "",
        headers: [{ headerName: "", headerValue: "" }],
        reqBody: "",
        token: "",
      }}
      onSubmit={async (values, helpers) => getResponse(values, helpers)}
      validationSchema={object({
        httpMethod: string().required("Must have HTTP method"),
        url: string().required("Must have a url"),
        token: string().required("Must have a token"),
      })}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <Typography variant="h4">HTTP Request </Typography>
          <div>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              className="request-content"
              direction="row"
              spacing={2}
            >
              <Grid item xs={9}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={errors.httpMethod && touched.httpMethod}
                >
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
                  {errors.httpMethod && touched.httpMethod && (
                    <FormHelperText>HTTP method required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                  }}
                >
                  Options
                </Button>
              </Grid>
            </Grid>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => setOpenHeaderBox(true)}>
                Add Header
              </MenuItem>
              <MenuItem onClick={() => setOpenRequestBodyBox(true)}>
                Add Body
              </MenuItem>
              <MenuItem onClick={() => setOpenContentTypeBox(true)}>
                Add Content Type
              </MenuItem>
            </Menu>

            <Dialog
              open={openHeaderBox}
              onClose={() => setOpenHeaderBox(false)}
              fullWidth
            >
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
                              variant="outlined"
                              name={`headers.${index}.headerName`}
                              fullWidth
                              as={TextField}
                            />
                          </DialogContent>
                          <DialogContent>
                            <Field
                              placeholder="Header Value"
                              variant="outlined"
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
                      onClick={() => push({ headerName: "", headerValue: "" })}
                      style={{ float: "right" }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>
                )}
              />

              <DialogActions>
                <Button onClick={() => setOpenHeaderBox(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openRequestBodyBox}
              onClose={() => setOpenRequestBodyBox(false)}
              fullWidth
            >
              <DialogTitle>Add Body</DialogTitle>
              <DialogContent>
                <Field
                  name="reqBody"
                  placeholder="Body"
                  fullWidth
                  variant="outlined"
                  as={TextField}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenRequestBodyBox(false)}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openContentTypeBox}
              onClose={() => setOpenContentTypeBox(false)}
              fullWidth
            >
              <DialogTitle>Add Content Type</DialogTitle>
              <DialogContent>
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
                  </Field>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenContentTypeBox(false)}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Field
              name="url"
              label="URL"
              as={TextField}
              variant="outlined"
              fullWidth
              className="request-content"
              error={errors.url && touched.url}
              helperText={errors.url && touched.url ? "URL required." : null}
            />

            <Field
              name="token"
              label="Token"
              as={TextField}
              variant="outlined"
              fullWidth
              className="request-content"
              error={errors.token && touched.token}
              helperText={
                errors.token && touched.token ? "Token required." : null
              }
            />

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
        </Form>
      )}
    </Formik>
  );
}
RequestModule.propTypes = {
  parentCallback: PropTypes.func,
};
