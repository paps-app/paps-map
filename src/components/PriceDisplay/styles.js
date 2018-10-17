import styled from "styled-components";

import { FlexAndCenter } from "shared/styles";

const OutputGroupContent = styled.div`
  ${FlexAndCenter};
  justify-content: center;
  flex-direction: column;
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  > div {
    b {
      font-weight: 500;
      display: block;
      color: #46affc;
    }
  }
`;

export const DistanceOutput = styled(OutputGroupContent)`
  b {
    color: #46affc;
  }
`;

export const PriceOuput = styled(OutputGroupContent)`
  b {
    color: #f37639;
  }
`;
