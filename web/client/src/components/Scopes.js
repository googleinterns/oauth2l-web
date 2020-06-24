import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBBtn, MDBInput } from "mdbreact";

/**
 * @return {div} returns page the has the ability to choose scopes to use
 */
function Scopes() {
  const [scopes, setScopes] = useState([]);

  const handleChange = (event) => setScopes(event.target.value.split(" "));

  const handleSubmit = (event) => {
    event.preventDefault();
    return [scopes];
  };
  return (
    <div className="top">
      <div className="shadow-box-example z-depth-2">
        <MDBContainer>
          <form onSubmit={handleSubmit}>
            <MDBCol>
              {" "}
              <p className="h5 text-center mb-4">Enter scopes </p>
            </MDBCol>
            <MDBInput
              id="scopes-label"
              label="Scopes"
              size="lg"
              onChange={handleChange}
            />

            <div className="next">
              <MDBBtn outline color="info" type="submit">
                Submit
              </MDBBtn>
            </div>
          </form>
        </MDBContainer>
      </div>
    </div>
  );
}

export default Scopes;
