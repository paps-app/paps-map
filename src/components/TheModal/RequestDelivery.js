import React from "react";
import axios from "axios";

import { formatDateToString, isOffWorkingHours } from "utils";
import FormCompleted from "./FormCompleted";

import FormFields from "./formFields";

import { ReactComponent as CrossIcon } from "assets/svg/cross.svg";

import {
  CloseModalBtn,
  MainForm,
  InputGroup,
  InputField,
  Input,
  InfoMsg,
  InputGroupRadio,
  SubmitButton,
  PriceIndicator,
  PriceTag,
  ModalContent,
  ModalHeader
} from "./styles";

const areAllKeysValid = obj =>
  !Object.keys(obj).some(key => null == obj[key] || "" === obj[key]);

const InitialState = {
  isSubmitting: false,
  requiredValues: {
    senderName: null,
    receiverName: null,
    senderPhoneNumber: null,
    receiverPhoneNumber: null,
    description: null
  },
  optionalValues: {
    couponCode: null
  },
  formValues: {},
  formResponse: null,
  formErrors: {
    hasErrors: false,
    senderPhoneNumber: false,
    receiverPhoneNumber: false
  }
};

class RequestDelivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  _resetToInitialState = () => {
    this.setState(InitialState);
  };

  resetToDefault = () => {
    this.props.onResetValues();
  };

  _onInputFocus = e => {
    e.currentTarget.parentNode.classList.add("focused");
  };

  _handleInputChange = (e, stateKey, stateKeyValue) => {
    e.persist();
    this.setState(prevState => ({
      [stateKey]: { ...prevState[stateKey], [stateKeyValue]: e.target.value }
    }));
    e.currentTarget.parentNode.classList.remove("focused");
  };

  _handleNameChange = e => {
    this._handleInputChange(e, "requiredValues", "senderName");
  };

  _handleReceiverNameChange = e => {
    this._handleInputChange(e, "requiredValues", "receiverName");
  };

  _handleSenderNumberChange = e => {
    this._handleInputChange(e, "requiredValues", "senderPhoneNumber");
    this._validatePhoneNumber(e);
  };

  _handleReceiverNumberChange = e => {
    this._handleInputChange(e, "requiredValues", "receiverPhoneNumber");
    this._validatePhoneNumber(e);
  };

  _handleCouponCodeChange = e => {
    this._handleInputChange(e, "optionalValues", "couponCode");
  };

  _handleDescriptionChange = e => {
    this._handleInputChange(e, "requiredValues", "description");
  };

  _onCreateTask = () => {
    const dataToSend = mapFormValuesToApiValues(
      this.state.formValues,
      this._convertToJobDatetime
    );

    axios
      .post("https://paps-tookan-api.now.sh/api/v1/createPDTask", dataToSend)
      .then(res => {
        const { data } = res.data.payload;
        console.log(data);
        if (data) {
          this.setState({ formResponse: data, isSubmitting: false });
        } else {
          this.setState({ isSubmitting: false, formErrors: { hasErrors: true } });
          setTimeout(() => {
            this.setState(({ formErrors }) => ({
              formErrors: { ...formErrors, hasErrors: false }
            }));
          }, 7000);
        }
      });
  };

  _onFormSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });

    if (
      !this.state.formErrors.senderPhoneNumber &&
      !this.state.formErrors.receiverPhoneNumber &&
      areAllKeysValid(this.state.requiredValues)
    ) {
      const { placesValues, price } = this.props;

      this.setState(({ requiredValues, optionalValues, formErrors }) => ({
        formValues: {
          ...requiredValues,
          ...optionalValues,
          price,
          ...placesValues
        },
        formErrors: {
          ...formErrors,
          hasErrors: false
        }
      }));
      setTimeout(() => {
        this._onCreateTask();
      }, 800);
    } else {
      this.setState(({ formErrors }) => ({
        formErrors: {
          ...formErrors,
          hasErrors: true
        },
        isSubmitting: false
      }));
      setTimeout(() => {
        this.setState(({ formErrors }) => ({
          formErrors: { ...formErrors, hasErrors: false }
        }));
      }, 7000);
    }
  };

  _validatePhoneNumber = e => {
    const valInput = e.target.value;
    const valId = e.target.id;

    const isNumberCorrect = /^\d+$/.test(valInput) && valInput.match(/\d/g).length === 9;

    this.setState(({ formErrors }) => ({
      formErrors: {
        ...formErrors,
        [valId]: !isNumberCorrect
      }
    }));
  };

  _convertToJobDatetime = pad => {
    const { mapCountryCode } = this.props;

    const workingHoursStart = "08:00:00";
    const workingHoursEnd = mapCountryCode === "sn" ? "17:30:00" : "23:00:00";

    return isOffWorkingHours(workingHoursStart, workingHoursEnd)
      ? formatDateToString(new Date(), pad, true)
      : formatDateToString(new Date(), pad);
  };

  render() {
    const {
      requiredValues,
      optionalValues,
      formErrors,
      formResponse,
      isSubmitting
    } = this.state;
    const { price, onModalClose, mapCountryCode } = this.props;

    const allFields = { ...requiredValues, ...optionalValues };

    const workingHoursStart = "08:00:00";
    const workingHoursEnd = mapCountryCode === "sn" ? "17:30:00" : "23:00:00";

    return (
      <React.Fragment>
        <ModalHeader>
          <h2>{formResponse ? "Commande confirmée" : "Continuer la commande"}</h2>
          <CloseModalBtn type="button" onClick={onModalClose}>
            <CrossIcon />
          </CloseModalBtn>
        </ModalHeader>
        <ModalContent>
          <PriceIndicator>
            {isOffWorkingHours(workingHoursStart, workingHoursEnd) && (
              <b style={{ marginBottom: "1rem" }}>
                Prise en charge demain à partir de{" "}
                {mapCountryCode === "sn" ? "09:00" : "08:30"}.
              </b>
            )}
            <div>
              <span>Cette course vous sera facturée à</span>
              <PriceTag>{price} FCFA</PriceTag>
            </div>
          </PriceIndicator>
          {formResponse ? (
            <FormCompleted
              formResponse={formResponse}
              resetToDefault={this.resetToDefault}
            />
          ) : (
            <MainForm onSubmit={this._onFormSubmit}>
              <InputGroup>
                {FormFields.map(field => (
                  <FormField
                    key={field.id}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    fieldValue={allFields[field.id]}
                    {...field.fullWidth && { fullWidth: true }}
                    {...field.onBlur && { onBlur: this[field.onBlur] }}
                    {...field.required && { required: true }}
                    {...field.noAutoComplete && { autoComplete: "off" }}
                    {...field.float && { float: field.float }}
                    {...field.helpText && { helpText: field.helpText }}
                    {...formErrors[field.id] && { errorText: field.errorText }}
                  />
                ))}
              </InputGroup>
              <InputGroupRadio>
                <span>Mode de payement</span>
                <div>
                  <label htmlFor="cash">
                    Cash (A la livraison)
                    <input type="radio" name="resp" id="cash" defaultChecked />
                    <div />
                  </label>
                  <label htmlFor="orangeMoney" disabled="disabled">
                    Orange money
                    <input type="radio" name="resp" id="orangeMoney" disabled />
                    <div />
                  </label>
                </div>
              </InputGroupRadio>
              {formErrors.hasErrors && (
                <InfoMsg big="up" error="true">
                  Vérifiez que tous les champs sont bien remplis
                </InfoMsg>
              )}
              <SubmitButton type="submit" {...isSubmitting && { className: "disabled" }}>
                Confirmer la commande
              </SubmitButton>
            </MainForm>
          )}
        </ModalContent>
      </React.Fragment>
    );
  }
}

export const FormField = ({
  type,
  id,
  label,
  onBlur,
  fieldValue,
  float,
  helpText,
  errorText,
  fullWidth,
  ...rest
}) => (
  <InputField {...fullWidth && { fullWidth: true }}>
    <Input {...fieldValue && { className: "filled" }} {...rest}>
      <input type={type} id={id} onFocus={OnInputFocus} onBlur={onBlur} />
      {float}
      <label htmlFor={id}>{label}</label>
    </Input>
    {helpText || errorText}
  </InputField>
);

const OnInputFocus = e => e.currentTarget.parentNode.classList.add("focused");

const mapFormValuesToApiValues = (formValues, toJobDatetime) => {
  let apiValues = {};
  apiValues = {
    jobPickupName: formValues.senderName,
    jobDescription: `${formValues.description} 
    -- Commande venant du site web
    -- Le prix est à ${formValues.price}
    -- Le mode de payement cash et se fait à la livraison
    `,
    jobPickupAddress: formValues.pickup,
    jobPickupPhone: formValues.senderPhoneNumber,
    autoAssignment: "0",
    customerPhone: formValues.receiverPhoneNumber,
    jobPickupDatetime: toJobDatetime(),
    jobDeliveryDatetime: toJobDatetime(1),
    customerAddress: formValues.delivery,
    customerUsername: formValues.receiverName,
    timezone: "0"
  };
  return apiValues;
};

// const jobDatetime = pad =>
//   isOffWorkingHours()
//     ? formatDateToString(new Date(), pad, true)
//     : formatDateToString(new Date(), pad);

export default RequestDelivery;
