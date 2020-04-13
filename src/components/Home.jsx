import React from "react";
import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <div className="title">Welcome to Page Transition App!</div>
      <section>
        <p>Click the links on header to change routes!</p>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* omitted */
`;

export default Home;
