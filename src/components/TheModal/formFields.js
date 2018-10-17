import React from "react";

import { InfoMsg } from "./styles";

export default [
  {
    type: "text",
    id: "senderName",
    onBlur: "_handleNameChange",
    label: "Nom complet",
    noAutoComplete: true,
    required: true
  },
  {
    type: "text",
    id: "senderPhoneNumber",
    onBlur: "_handleSenderNumberChange",
    label: "Votre numéro",
    required: true,
    float: <span className="indicator">+221</span>,
    errorText: <InfoMsg error="true">Le numéro est invalide.</InfoMsg>
  },
  {
    type: "text",
    id: "receiverName",
    onBlur: "_handleReceiverNameChange",
    label: "Nom destinataire",
    required: true
  },
  {
    type: "tel",
    id: "receiverPhoneNumber",
    onBlur: "_handleReceiverNumberChange",
    label: "Numéro destinataire",
    required: true,
    float: <span className="indicator">+221</span>,
    errorText: <InfoMsg error="true">Le numéro est invalide.</InfoMsg>
  },
  {
    type: "text",
    id: "couponCode",
    onBlur: "_handleCouponCodeChange",
    label: "Code promo",
    helpText: <InfoMsg>Optionnel: sasir ce champs seulement si vous avez un code</InfoMsg>
  },
  {
    type: "text",
    id: "description",
    onBlur: "_handleDescriptionChange",
    label: "Description",
    fullWidth: true,
    required: true,
    helpText: <InfoMsg>Veuillez décrire le bien que vous souhaiter faire livrer</InfoMsg>
  }
];
