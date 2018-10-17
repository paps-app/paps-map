import React from "react";

import { FormField } from "./RequestDelivery";

import { FormResponse, InputGroup, ButtonGroup, SubmitButton, InfoMsg } from "./styles";

// 43291558-865b-4992-99d4-aa9dbdd3c6fc

class FormCompleteted extends React.Component {
  state = {
    formResponse: null,
    formCompleted: false,
    emailAddress: null,
    formErrors: {
      emailAddress: false
    },
    isSubmitting: false
  };

  UNSAFE_componentWillMount() {
    this.setState({ formResponse: this.props.formResponse });
  }

  onSubmitForm = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    if (!this.state.formErrors.emailAddress) {
      this.setState(({ formErrors }) => ({
        formErrors: {
          ...formErrors,
          emailAddress: false
        }
      }));
      setTimeout(() => {
        this._sendEmail();
      }, 1500);
    }
  };

  _sendEmail = () => {
    const { emailAddress, formResponse } = this.state;

    const {
      job_pickup_name,
      job_pickup_address,
      customer_address,
      pickup_tracking_link,
      delivery_tracing_link
    } = formResponse;

    const EmailBody = `
      Hello ${job_pickup_name},

      Voici les liens de suivis de votre course sur paps.sn

      <ul style="padding-left:0">
        <li>
          Ramassage: <a target="_blank" href="${pickup_tracking_link}" rel="noopener noreferrer">${job_pickup_address}</a>
        </li>
        <li>
          Livraison: <a target="_blank" href="${delivery_tracing_link}" rel="noopener noreferrer">${customer_address}</a>
        </li>
      </ul>
    `;

    Email.send(
      "Paps <hello@paps-app.com>",
      emailAddress,
      "Lien de suivi de votre commande sur Paps.sn",
      EmailBody,
      { token: "43291558-865b-4992-99d4-aa9dbdd3c6fc" },
      function done(message) {
        // this.setState({ isSubmitting: false });
        console.log(message);
      }
    );

    this.setState({ isSubmitting: true, formCompleted: true });
  };

  handleEmailAddressChange = e => {
    e.persist();

    this.setState(prevState => ({
      emailAddress: e.target.value
    }));
    this._validateEmailAddress(e);
  };

  _validateEmailAddress = e => {
    const valInput = e.target.value;

    const re = /\S+@\S+\.\S+/;

    const isEmailCorrect = re.test(String(valInput).toLowerCase());

    this.setState(({ formErrors }) => ({
      formErrors: {
        ...formErrors,
        emailAddress: !isEmailCorrect
      }
    }));
  };

  onStartNewOrder = e => {
    console.log(e);
    this.props.resetToDefault();
  };

  render() {
    const { emailAddress, formErrors, isSubmitting, formCompleted } = this.state;

    return (
      <FormResponse>
        <form onSubmit={this.onSubmitForm}>
          <div>Votre commande s'est déroulé avec succés.</div>
          <div>Renseignez votre adresse email pour recevoir</div>
          <div>les liens de suivi de la course.</div>
          {formCompleted ? (
            <div
              style={{
                fontWeight: 500,
                padding: "0.7rem",
                backgroundColor: "#f5f3f3",
                borderRadius: "4px",
                marginTop: "1rem"
              }}
            >
              Le mail a été bien envoyé!
            </div>
          ) : (
            <InputGroup>
              <FormField
                type="email"
                id="emailAddress"
                label="Entrer votre adresse email"
                fieldValue={emailAddress}
                onBlur={this.handleEmailAddressChange}
                {...formErrors.emailAddress && {
                  errorText: (
                    <InfoMsg error="true">Cette adresse email est invalide.</InfoMsg>
                  )
                }}
                labelY
                fullWidth
                required
              />
            </InputGroup>
          )}
          <ButtonGroup>
            <SubmitButton
              w="auto"
              m="1rem 0 0"
              type="submit"
              {...isSubmitting && { className: "disabled" }}
            >
              Envoyer
            </SubmitButton>
            <SubmitButton
              type="button"
              w="auto"
              m="1rem 0 0"
              ghost
              onClick={this.onStartNewOrder}
            >
              Nouvelle course 🙂
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormResponse>
    );
  }
}

export default FormCompleteted;
