import React from "react";

import { GoogleMap, withGoogleMap, DirectionsRenderer } from "react-google-maps";
import get from "lodash.get";

import LabelledMarker from "./MarkerWithLabel";
import MapStyleSelector from "./MapStyleSelector";
import WillBeCharged from "./WillBeCharged";
import PopupConfirmation, { OverlayModal } from "./Popup";

import { computePlace, computeDistanceToPrice } from "../utils";

import { getStorageMapStyle, setStorageMapStyle } from "./MapStyleSelector";

import OriginPin from "../icons/D.png";
import DestinationPin from "../icons/P.png";

import {
  SearchBox,
  OriginInput,
  DestinationInput,
  InputGroup,
  OuputGroup,
  ValidateButton as Button
} from "./styles";

import GrisMap from "../mapStyles/gris.json";
// import VelouMap from "../mapStyles/velou.json";
import DarkMap from "../mapStyles/dark.json";
// import Mapco from "../mapStyles/mapco.json";
import LieuxMap from "../mapStyles/lieux.json";

const MapStyles = {
  gris: GrisMap,
  dark: DarkMap,
  lieux: LieuxMap
};

class MapPage extends React.Component {
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZnF19RSZU0ud4oeIbsOmru1iPnXlpl7w&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div className="map" style={{ height: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />,
    defaultZoom: 12,
    defaultCenter: {
      lat: 14.72653,
      lng: -17.4414
    },
    tilt: 45
  };

  state = {
    bounds: null,
    waypoints: [],
    center: {},
    markers: [],
    origin: null,
    destination: null,
    placesValues: {
      pickup: null,
      delivery: null
    },
    distance: null,
    mapStyle: getStorageMapStyle() || "lieux",
    isPopupOpen: false,
    price: 0,
    hasNotValidatedPlaces: false
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
  };

  _handleOrginPlaceChanged = () => {
    let place = this.originAutocomplete.getPlace();
    const bounds = new google.maps.LatLngBounds();

    computePlace(place, bounds);

    const nextMarkers = [{ position: place.geometry.location }];
    const nextCenter = get(nextMarkers, "0.position", this.state.center);
    this.setState(prevState => ({
      center: nextCenter,
      markers: nextMarkers,
      origin: nextCenter,
      placesValues: { ...prevState.placesValues, pickup: this._originRef.value }
    }));

    this._mapRef.fitBounds(bounds);
  };

  _handleDestinationPlaceChanged = () => {
    let place = this.destinationAutocomplete.getPlace();
    const bounds = new google.maps.LatLngBounds();

    computePlace(place, bounds);

    const nextMarkers = [{ position: place.geometry.location }];
    const nextCenter = get(nextMarkers, "0.position", this.state.center);
    this.setState(prevState => ({
      center: nextCenter,
      destination: nextCenter,
      placesValues: { ...prevState.placesValues, delivery: this._destinationRef.value }
    }));

    this._mapRef.fitBounds(bounds);
  };

  _onStyleChange = e => {
    this.setState({ mapStyle: e.target.value });
    setStorageMapStyle(e.target.value);
  };

  _onFormValidate = () => {
    if (this.state.destination) {
      this._onPriceChanged();
      this.setState({
        isPopupOpen: !this.state.isPopupOpen
      });
    } else {
      this.setState({ hasNotValidatedPlaces: true });
      setTimeout(() => {
        this.setState({ hasNotValidatedPlaces: false });
      }, 8000);
    }
  };

  _onPriceChanged = () => {
    const { distance } = this.state;
    if (distance) {
      this.setState({ price: computeDistanceToPrice(distance) });
    }
  };

  render() {
    const { props, state } = this;
    return (
      <React.Fragment>
        <SearchBox>
          <InputGroup>
            {/* <SelectorMode /> */}
            <MapStyleSelector
              selected={state.mapStyle}
              onStyleChange={this._onStyleChange}
            />
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
          <OuputGroup>
            <WillBeCharged distance={state.distance} />
          </OuputGroup>
          <Button type="submit" onClick={this._onFormValidate}>
            Valider
          </Button>
          {state.hasNotValidatedPlaces && (
            <div
              style={{
                padding: "1rem",
                marginTop: "1rem",
                textAlign: "center",
                color: "red"
              }}
            >
              Veuillez choisir d'abord deux destinations avant de valider la course
            </div>
          )}
        </SearchBox>
        {state.isPopupOpen && (
          <React.Fragment>
            <OverlayModal onClick={this._onFormValidate} />
            <PopupConfirmation
              onPopupClose={this._onFormValidate}
              price={state.price}
              placesValues={state.placesValues}
            />
          </React.Fragment>
        )}
        <GoogleMapsWrapper
          onMapMounted={this._handleMapMounted}
          onBoundsChanged={this._handleBoundsChanged}
          mapStyle={state.mapStyle}
          {...props}
        >
          {state.origin && (
            <LabelledMarker position={state.origin} icon={OriginPin} dir="origin" />
          )}
          {state.destination && (
            <LabelledMarker position={state.destination} icon={DestinationPin} />
          )}
          {state.directions && (
            <DirectionsRenderer
              ref={this._onDirectionsMounted}
              onDirectionsChanged={this._onDirectionsMounted}
              directions={state.directions}
              options={{
                suppressMarkers: true,
                polylineOptions: { strokeColor: "#4d90fe", strokeWeight: 5 }
              }}
            />
          )}
        </GoogleMapsWrapper>
      </React.Fragment>
    );
  }
}

const GoogleMapsWrapper = withGoogleMap(props => {
  const { onMapMounted, children, mapStyle, ...otherProps } = props;
  return (
    <GoogleMap
      ref={onMapMounted}
      options={{
        styles: MapStyles[mapStyle],
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        streetViewControl: true
      }}
      {...otherProps}
    >
      {children}
    </GoogleMap>
  );
});

export default MapPage;
