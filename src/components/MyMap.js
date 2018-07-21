import React from "react";

import { GoogleMap, withGoogleMap, DirectionsRenderer } from "react-google-maps";
import get from "lodash.get";

import LabelledMarker from "./MarkerWithLabel";
import WillBeCharged from "./WillBeCharged";

import OriginPin from "../icons/originPin.svg";
import DestinationPin from "../icons/destinationPin.svg";

import {
  SearchBox,
  OriginInput,
  DestinationInput,
  InputGroup,
  OuputGroup,
  Separator,
  ModeSelector
} from "./styles";

import { computePlace } from "../utils";

const EMG = {
  lat: 14.72653,
  lng: -17.4414
};

// const URBAM = {
//   lat: 14.73515,
//   lng: -17.45741
// };

// const SONATEL = {
//   lat: 14.713026,
//   lng: -17.4733996
// };

const GoogleMapsWrapper = withGoogleMap(props => {
  const { onMapMounted, ...otherProps } = props;
  return (
    <GoogleMap ref={onMapMounted} {...otherProps}>
      {props.children}
    </GoogleMap>
  );
});

class MapPage extends React.Component {
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZnF19RSZU0ud4oeIbsOmru1iPnXlpl7w&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />,
    defaultZoom: 13,
    defaultCenter: EMG
  };

  state = {
    bounds: null,
    center: EMG,
    markers: [],
    origin: null,
    destination: null,
    distance: null
  };

  _mapRef = null;
  _directionRef = null;
  _originRef = null;
  _destinationRef = null;
  originAutocomplete = null;
  destinationAutocomplete = null;

  componentDidMount() {
    const options = {
      componentRestrictions: { country: "sn" }
    };

    const interval = window.setInterval(() => {
      if (this._mapRef) {
        this.originAutocomplete = new google.maps.places.Autocomplete(
          this._originRef,
          options
        );
        this.destinationAutocomplete = new google.maps.places.Autocomplete(
          this._destinationRef,
          options
        );
        this.originAutocomplete.addListener(
          "place_changed",
          this._handleOrginPlaceChanged
        );
        this.destinationAutocomplete.addListener(
          "place_changed",
          this._handleDestinationPlaceChanged
        );
        window.clearInterval(interval);
      }
    }, 500);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture the destination state before it updates.
    if (
      prevState.destination !== this.state.destination ||
      prevState.origin !== this.state.origin
    ) {
      return this.state.destination;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let OrginID = this.state.origin;
    let DestinationID = this.state.destination;
    const DirectionsService = new google.maps.DirectionsService();

    if (snapshot !== null && OrginID && DestinationID) {
      DirectionsService.route(
        {
          origin: OrginID,
          destination: DestinationID,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [
            {
              location: OrginID
            },
            {
              location: DestinationID,
              stopover: false
            }
          ],
          provideRouteAlternatives: true,
          optimizeWaypoints: true
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              distance: google.maps.geometry.spherical.computeDistanceBetween(
                OrginID,
                DestinationID
              )
            });
          } else {
            console.error(`Could not display directions due to: ${status}`);
          }
        }
      );
    }
    // else {
    //   window.alert("Veuillez sélectionner que les résultats sur la liste défilante");
    // }
  }

  _handleMapMounted = c => {
    if (!c || this._mapRef) return;
    this._mapRef = c;
    // console.log("Ref set later @ " + Date.now());
  };

  _onOriginBoxMounted = ref => {
    this._originRef = ref;
  };

  _onDestinationBoxMounted = ref => {
    this._destinationRef = ref;
  };

  _onDirectionsMounted = ref => {
    this._directionRef = ref;
  };

  _handleBoundsChanged = () => {
    if (!this._mapRef) return;
    const center = this._mapRef.getCenter();
    const bounds = this._mapRef.getBounds();
    this.setState({
      bounds: bounds,
      center: center
    });
    // console.log(center, bounds);
  };

  _onDirectionsChanged = () => {
    const newDirection = this._directionsRef.getDirection();
    this.setState({
      directions: newDirection
    });
    console.log({ newDirection });
  };

  _handleOrginPlaceChanged = () => {
    let place = this.originAutocomplete.getPlace();
    const bounds = new google.maps.LatLngBounds();

    computePlace(place, bounds);

    const nextMarkers = [{ position: place.geometry.location }];
    const nextCenter = get(nextMarkers, "0.position", this.state.center);
    this.setState({
      center: nextCenter,
      markers: nextMarkers,
      origin: nextCenter
    });

    this._mapRef.fitBounds(bounds);
  };

  _handleDestinationPlaceChanged = () => {
    let place = this.destinationAutocomplete.getPlace();
    const bounds = new google.maps.LatLngBounds();

    computePlace(place, bounds);

    const nextMarkers = [{ position: place.geometry.location }];
    const nextCenter = get(nextMarkers, "0.position", this.state.center);
    this.setState({
      center: nextCenter,
      // markers: nextMarkers,
      destination: nextCenter
    });

    this._mapRef.fitBounds(bounds);
  };

  _onOriginChanged = e => {
    // When the user starts changing the origin again!
    if (this.state.origin && this.state.destination) {
      this.setState({
        // origin: null,
        // markers: null,
        // directions: null,
        // destination: null,
        // distance: null
      });
      // this._destinationRef.value = "";
    }
  };

  render() {
    const { props, state } = this;
    return (
      <React.Fragment>
        <GoogleMapsWrapper
          onMapMounted={this._handleMapMounted}
          onBoundsChanged={this._handleBoundsChanged}
          {...props}
        >
          {state.origin && (
            <LabelledMarker position={state.origin} dir="origin" icon={OriginPin} />
          )}
          {state.destination && (
            <LabelledMarker
              position={state.destination}
              dir="destination"
              icon={DestinationPin}
            />
          )}
          {state.directions && (
            <DirectionsRenderer
              ref={this._onDirectionsMounted}
              onDirectionsChanged={this._onDirectionsMounted}
              directions={state.directions}
              options={{
                suppressMarkers: true,
                polylineOptions: { strokeColor: "#587084", strokeWeight: 5 }
              }}
            />
          )}
        </GoogleMapsWrapper>
        <SearchBox>
          <InputGroup>
            <SelectorMode />
            <OriginInput>
              <label htmlFor="origin" />
              <input
                id="origin"
                ref={this._onOriginBoxMounted}
                type="text"
                placeholder="Point de départ"
                onChange={this._onOriginChanged}
              />
            </OriginInput>
            <DestinationInput>
              <label htmlFor="destination" />
              <input
                id="destination"
                ref={this._onDestinationBoxMounted}
                type="text"
                placeholder="Point d'arrivée"
              />
            </DestinationInput>
          </InputGroup>
          <Separator />
          <OuputGroup>
            <WillBeCharged distance={state.distance} />
          </OuputGroup>
        </SearchBox>
      </React.Fragment>
    );
  }
}

const SelectorMode = () => (
  <ModeSelector>
    <div>
      <input type="radio" name="type" id="Bike" onChange={Function} checked="checked" />
      <label htmlFor="bike">Moto</label>
    </div>
    <div>
      <input type="radio" name="type" id="pickup" disabled />
      <label htmlFor="pickup">Pickup</label>
    </div>
    <div>
      <input type="radio" name="type" id="van" disabled />
      <label htmlFor="van">Van</label>
    </div>
  </ModeSelector>
);

export default MapPage;
