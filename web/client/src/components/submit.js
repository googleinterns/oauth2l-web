import { SubmissionError } from "redux-form";

/**
 *
 * @param {*} values obtains the values that were submitted in the form and verifies that it's not blank
 */
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
}

export default submit;
