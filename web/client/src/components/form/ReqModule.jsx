import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Select,
  CircularProgress,
  InputLabel,
  MenuItem,
  makeStyles,
  FormControl,
  TextField,
  Typography,
  Button,
  Menu,
} from "@material-ui/core";
// import  { object, string } from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  content: {
    margin: theme.spacing(1),
    minWidth: 120,
    float: "right",
  },
  request: {
    margin: theme.spacing(1),
  },
}));

/**
 * @return {Formik} component using Formik for creating send Request
 */
export default function ReqModule() {
  return <TKS> </TKS>;
}

/**
 *
 * @param {*} props formik style
 * @return {Formik} returns the formik values to ReqModule
 */
export function TKS(props) {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);
  const [anchor2, setAnchor2] = useState(false);
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
          <Typography variant="h5">HTTP Request </Typography>
          <div>
            <FormControl className={classes.root}>
              <InputLabel id="http">HTTP method</InputLabel>
              <Field placeholder="httpMethod" name="httpMethod" as={Select}>
                <MenuItem value="GET">GET</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PUT">PUT</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
                <MenuItem value="PATCH">PATCH</MenuItem>
              </Field>
            </FormControl>

            <Button
              variant="contained"
              className={classes.content}
              onClick={(e) => setAnchor(e.currentTarget)}
              onClose={(e) => {
                setAnchor(false);
              }}
            >
              Add Header
            </Button>
            <Menu
              anchorEl={anchor}
              label="header-menu"
              open={Boolean(anchor)}
              onClose={(e) => setAnchor(false)}
              className={classes.content}
              keepMounted
            >
              <MenuItem>
                <Field
                  placeholder="Header Name"
                  name="headerName"
                  as={TextField}
                />
                <Field
                  placeholder="Header Value"
                  name="headerValue"
                  as={TextField}
                />
              </MenuItem>
            </Menu>
            <Field name="URI" label="URI" as={TextField} fullWidth />

            <FormControl className={classes.content}>
              <InputLabel id="content">Content Type</InputLabel>
              <Field placeholder="contentType" name="contentType" as={Select}>
                <MenuItem value="applciation/json">application/json</MenuItem>
                <MenuItem value="text/plain">text/plain</MenuItem>
                <MenuItem value="text/csv">text/csv</MenuItem>
                <MenuItem value="Custom...">Custom...</MenuItem>
              </Field>
            </FormControl>

            <Button
              variant="contained"
              className={classes.content}
              onClick={(e) => setAnchor2(e.currentTarget)}
              onClose={(e) => {
                setAnchor2(false);
              }}
            >
              Body
            </Button>
            <Menu
              anchorEl={anchor2}
              label="reBody"
              open={Boolean(anchor2)}
              onClose={(e) => setAnchor2(false)}
              className={classes.content}
              keepMounted
            >
              <MenuItem>
                <Field name="reqBody" placeholder="Body" as={TextField} />
              </MenuItem>
            </Menu>

            <Button
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              color="primary"
              variant="contained"
              type="submit"
            >
              {isSubmitting ? "Submitting" : "Send Request"}
            </Button>
          </div>
          <br />
          <br />
          <h5>Response/Request</h5>
          <div style={{ "border-style": "dotted" }}>
            {JSON.stringify(values, null, 2)}
          </div>
        </Form>
      )}
    </Formik>
  );
}
