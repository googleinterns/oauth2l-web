import { SubmissionError } from "redux-form";

function submit(values) {
  if (!values.type) {
    throw new SubmissionError({
      type: "No type selected",
      _error: "Submission failed",
    });
  }

  if (!values.format) {
    throw new SubmissionError({
      format: "No type selected",
      _error: "Submission failed",
    });
  }
  if (values.type === "JWT" && values.format === "Header") {
    throw new SubmissionError({
      format: "Format not allowed",
      _error: "JWT Token does not have Header format",
    });
  }
}

export default submit;
