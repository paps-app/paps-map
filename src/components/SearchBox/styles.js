import styled from "styled-components";

import { medias } from "utils/styles";

import { FlexAndCenter, BaseButton } from "shared/styles";

import OriginIcon from "icons/origin.svg";
import DestinationIcon from "icons/destination.svg";

export const SearchBox = styled.div`
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: white;
  max-width: 340px;
  height: auto;
  overflow: auto;
  width: 460px;

  ${medias.tablet`max-width: 100%; width: 100%;`};
`;

export const InputGroup = styled.div`
  padding: 2em 1.2em;
  padding-bottom: 10px;
`;

export const BaseInput = styled.div`
  > input {
    border: none;
    border-bottom: 1px solid #dadada;
    box-sizing: border-box;
    outline: none;
    border-radius: 0;
  }
`;

export const Input = styled(BaseInput)`
  display: flex;
  justify-content: center;

  > input {
    background-color: #fff;
    font-size: 0.95em;
    font-weight: 300;
    padding: 1em 1em 6px 0;
    text-overflow: ellipsis;
    width: 260px;

    ${medias.tablet`font-size: 1em;`};

    &:focus {
      border-color: #4d90fe;
    }
  }

  label {
    cursor: pointer;
    margin-right: 12px;
    width: 15px;
    background-size: cover;
  }
`;

export const OriginInput = styled(Input)`
  > label {
    margin-top: 17px;
    height: 15px;
    background-image: url(${OriginIcon});
  }
`;

export const DestinationInput = styled(Input)`
  margin-top: 0.7rem;
  margin-bottom: 1em;
  > label {
    margin-top: 14px;
    height: 19px;
    background-image: url(${DestinationIcon});
  }
`;

export const OuputGroup = styled.div`
  padding: 1em 0.2em;
  padding-bottom: 1.5em;
  font-size: 1.3em;
  ${FlexAndCenter};
  justify-content: space-around;
`;

export const AreWeOff = styled.div`
  font-size: 0.85rem;
  margin: 1rem 0;
  text-align: center;
`;

export const AreWeOffState = styled.b`
  text-transform: uppercase;
  color: ${p => (p.state === "Fermé" ? "#f37168" : "#57dc23")};
`;

export const DownloadButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding: 1em 1.4em;

  div:first-child {
    margin-right: 0.4em;
  }

  div:nth-child(2) > img {
    opacity: 0.7;
    pointer-events: none;
  }

  .flex {
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
  }
`;

export const OptionsSelector = styled.div`
  ${FlexAndCenter};
  margin-bottom: 1.6em;
  justify-content: space-around;
`;

export const ValidateButton = styled.button`
  ${BaseButton};
`;
