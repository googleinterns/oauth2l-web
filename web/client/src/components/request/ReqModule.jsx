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
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../styles/request.css";
import { object, string } from "yup";

/**
 * @return {Formik} component using Formik for creating send Request
 */
export default function RequestModule() {
  const [openHeaderBox, setOpenHeaderBox] = useState(false);
  const [openRequestBodyBox, setOpenRequestBodyBox] = useState(false);

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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
      }}
      validationSchema={object({
        httpMethod: string().required("Must have HTTP method"),
        URI: string().required("Must have a URI"),
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
                  onClick={() => setOpenHeaderBox(true)}
                >
                  Add Header
                </Button>
              </Grid>
            </Grid>

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
            <Field
              name="URI"
              label="URI"
              as={TextField}
              variant="outlined"
              fullWidth
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
                  </Field>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => setOpenRequestBodyBox(true)}
                >
                  Add Body
                </Button>
              </Grid>
            </Grid>

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
