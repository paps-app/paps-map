import React from "react";
import axios from "axios";
import styled from "styled-components";

import { formatDateToString } from "../utils";

const PopupWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  width: 430px;
  z-index: 99;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  width: inherit;
  padding: 1.4rem 2.4rem 2rem;
`;

export const OverlayModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 98;
`;

export const PopupHeader = styled.header`
  padding: 0.6rem 0;
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;

  h2 {
    margin: 0;
    font-size: 1.8em;
  }

  .closePopup {
    margin-left: auto;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
`;

const PriceIndicator = styled.div`
  display: flex;
  font-weight: 500;
  margin-bottom: 0.4rem;
`;

const PriceTag = styled.span`
  display: inline-block;
  font-weight: 500;
  color: #f37639;
  margin-left: 5px;
`;

const MainForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;

  > div {
    position: relative;
    width: 170px;
  }

  label {
    font-size: 15px;
    opacity: 0.8;
    position: absolute;
    top: 7px;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: 0.15s ease-out;
    cursor: text;
  }

  input {
    border: none;
    border-bottom: 1px solid #dadada;
    box-sizing: border-box;
    outline: none;
    background-color: #fff;
    font-size: 15px;
    font-weight: 300;
    padding: 0.5em 0.6em;
    padding-left: 0;
    text-overflow: ellipsis;
    width: 100%;

    &:focus,
    &.valid {
      border-color: #4d90fe;

      + label {
        font-size: 13px;
        color: #4d90fe;
        transform: translateY(-80%);
      }
    }

    &:valid {
      background: white;
    }
  }
`;

const InputGroupRadio = styled.div`
  margin-top: 1.6rem;

  > span {
    display: block;
    margin-bottom: 1rem;
    font-size: 14px;
    color: #4d90fe;
  }

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 0.7rem;
  }

  label {
    display: block;
    position: relative;
    padding-left: 1.6rem;
    margin-right: 0.6rem;
    font-size: 15px;
    cursor: pointer;

    > div {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      background: #e6e6e6;
      border-radius: 50%;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 6px;
        height: 6px;
        width: 6px;
        background: #fff;
        border-radius: 50%;
      }
    }
  }

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked ~ div {
      background: #406d80;
      &:after {
        display: block;
      }
    }

    &:disabled ~ div {
      background: #e6e6e6;
      opacity: 0.6;
      pointer-events: none;
    }
  }
`;

const SubmitButton = styled.button`
  display: block;
  border: none;
  background-color: #406d80;
  padding: 0 1rem;
  min-width: 2rem;
  width: 80%;
  color: white;
  margin: 1.8rem auto 0;
  height: 2.6rem;
  cursor: pointer;
  font-size: 100%;
  border-radius: 3px;
`;

const areAllKeysValid = obj =>
  !Object.keys(obj).some(key => null == obj[key] || "" === obj[key]);

class PopupConfirmation extends React.Component {
  state = {
    isFormValid: false,
    requiredValues: {
      senderName: null,
      senderNumber: null,
      receiverNumber: null,
      description: null
    },
    optionalValues: {
      couponCode: null
    },
    formValues: {}
  };

  _handleInputChange = (e, stateKey, stateKeyValue) => {
    e.persist();
    this.setState(prevState => ({
      [stateKey]: { ...prevState[stateKey], [stateKeyValue]: e.target.value }
    }));
  };

  _handleNameChange = e => {
    this._handleInputChange(e, "requiredValues", "senderName");
  };

  _handleSenderNumberChange = e => {
    this._handleInputChange(e, "requiredValues", "senderNumber");
  };

  _handleReceiverNumberChange = e => {
    this._handleInputChange(e, "requiredValues", "receiverNumber");
  };

  _handleCouponCodeChange = e => {
    this._handleInputChange(e, "optionalValues", "couponCode");
  };

  _handleDescriptionChange = e => {
    this._handleInputChange(e, "requiredValues", "description");
  };

  _onCreateTask = () => {
    const dataToSend = mapFormValuesToApiValues(this.state.formValues);

    axios.post("/api/v1/createPDTask", dataToSend).then(res => console.log(res.data));
  };

  _onFormSubmit = e => {
    e.preventDefault();
    if (areAllKeysValid(this.state.requiredValues)) {
      this.setState(prevState => ({
        formValues: {
          ...prevState.requiredValues,
          ...prevState.optionalValues,
          ...this.props.placesValues
        },
        isFormValid: true
      }));
      setTimeout(() => {
        this._onCreateTask();
      }, 500);
    }
  };

  render() {
    const { onPopupClose, price } = this.props;
    const { requiredValues, optionalValues } = this.state;
    return (
      <PopupWrapper>
        <PopupContainer>
          <PopupHeader>
            <h2>Continuer la commande</h2>
            <button type="button" className="closePopup" onClick={onPopupClose}>
              x
            </button>
          </PopupHeader>
          <PriceIndicator>
            <span>Cette course vous sera facturée à</span>
            <PriceTag>{price} FCFA</PriceTag>
          </PriceIndicator>
          <MainForm onSubmit={this._onFormSubmit}>
            <InputGroup>
              <div>
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  onChange={this._handleNameChange}
                  {...requiredValues.senderName && { className: "valid" }}
                  required
                />
                <label htmlFor="name">Nom complet</label>
              </div>
              <div>
                <input
                  type="tel"
                  id="tel"
                  onChange={this._handleSenderNumberChange}
                  {...requiredValues.senderNumber && { className: "valid" }}
                  required
                />
                <label htmlFor="tel">Votre numéro</label>
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <input
                  type="tel"
                  id="tel2"
                  onChange={this._handleReceiverNumberChange}
                  {...requiredValues.receiverNumber && { className: "valid" }}
                  required
                />
                <label htmlFor="tel2">Numéro du destinaire</label>
              </div>
              <div>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  onChange={this._handleDescriptionChange}
                  {...requiredValues.description && { className: "valid" }}
                  required
                />
                <label htmlFor="desc">Description</label>
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <input
                  type="number"
                  id="couponCode"
                  onChange={this._handleCouponCodeChange}
                  {...optionalValues.couponCode && { className: "valid" }}
                />
                <label htmlFor="couponCode">Code coupon</label>
              </div>
            </InputGroup>
            <InputGroupRadio>
              <span>Mode de payement</span>
              <div>
                <label htmlFor="cash">
                  Cash (A la livraison)
                  <input type="radio" name="resp" id="cash" defaultChecked />
                  <div />
                </label>
                <label htmlFor="orangeMoney">
                  Orange money
                  <input type="radio" name="resp" id="orangeMoney" disabled />
                  <div />
                </label>
              </div>
            </InputGroupRadio>
            <SubmitButton type="submit" onClick={this._onFormSubmit}>
              Confirmer la commande
            </SubmitButton>
          </MainForm>
        </PopupContainer>
      </PopupWrapper>
    );
  }
}

const mapFormValuesToApiValues = formValues => {
  let apiValues = {};
  apiValues = {
    jobPickupName: formValues.senderName,
    jobDescription: formValues.description,
    jobPickupAddress: formValues.pickup,
    jobPickupPhone: formValues.senderNumber,
    autoAssignment: "0",
    customerPhone: formValues.receiverNumber,
    jobPickupDatetime: formatDateToString(new Date(), 1),
    jobDeliveryDatetime: formatDateToString(new Date(), 3),
    customerAddress: formValues.delivery,
    timezone: "0"
  };
  return apiValues;
};

export default PopupConfirmation;
