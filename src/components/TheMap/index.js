import React from "react";

import {
  GoogleMap,
  withGoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import get from "lodash.get";

// import TheModal from "components/TheModal";
import MapSearchBox from "components/SearchBox";

import {
  computePlace,
  computeTotalDistance,
  computeDistanceToScooterPrice,
  computeDistanceToBerlingoPrice,
  computeDistanceToJumperPrice
} from "utils";

import { getStorageMapStyle, setStorageMapStyle } from "components/MapSelector";

import { MapStyled } from "./styles";

import OriginPin from "assets/images/D.png";
import DestinationPin from "assets/images/P.png";

import MapStyles from "./mapStyles";

// setStorageMapStyle("");

const InitialState = {
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
  vehicleType: "scooter",
  deliveryType: "express",
  mapStyle: getStorageMapStyle() || "gris",
  isModalOpen: false,
  price: 0,
  priceDelivery: 0,
  hasNotValidatedPlaces: false
};

class MapPage extends React.Component {
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZnF19RSZU0ud4oeIbsOmru1iPnXlpl7w&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div className="map" style={{ height: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />,
    defaultZoom: 12
  };

  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  _resetToInitialState = () => {
    this.setState(InitialState);
  };

  _mapRef = null;
  _directionRef = null;
  _originRef = null;
  _destinationRef = null;
  originAutocomplete = null;
  destinationAutocomplete = null;

  componentDidMount() {
    const options = {
      componentRestrictions: { country: this.props.defaultCountryCode }
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
      }
    }, 300);

    setTimeout(() => {
      window.clearInterval(interval);
    }, 400);
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
              location: OrginID,
              stopover: true
            },
            {
              location: DestinationID,
              stopover: true
            }
          ],
          provideRouteAlternatives: false,
          optimizeWaypoints: true,
          avoidTolls: true
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });

            setTimeout(() => {
              const DirectionResult = this._directionRef.getDirections();
              this.setState({
                distance: computeTotalDistance(DirectionResult)
              });
              // console.log(computeTotalDistance(DirectionResult));
            }, 200);

            // console.log(getDistance(OrginID, DestinationID));
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

  _handleBoundsChanged = centerAt => {
    if (!this._mapRef) return;
    const center = this._mapRef.getCenter();
    const bounds = this._mapRef.getBounds();
    this.setState({
      bounds: bounds,
      center: center
    });
  };

  _onDirectionsChanged = () => {
    const newDirection = this._directionsRef.getDirection();
    this.setState({
      directions: newDirection
    });
  };

  _handlePlaceChanged = point => {
    let place =
      point === "origin"
        ? this.originAutocomplete.getPlace()
        : this.destinationAutocomplete.getPlace();
    const bounds = new google.maps.LatLngBounds();

    computePlace(place, bounds);

    const nextMarkers = [{ position: place.geometry.location }];
    const nextCenter = get(nextMarkers, "0.position", this.state.center);
    const toUpdate =
      point === "origin"
        ? { pickup: this._originRef.value }
        : { delivery: this._destinationRef.value };

    this.setState(prevState => ({
      center: nextCenter,
      markers: nextMarkers,
      [point]: nextCenter,
      placesValues: { ...prevState.placesValues, ...toUpdate }
    }));

    this._mapRef.fitBounds(bounds);
  };

  _handleOrginPlaceChanged = () => {
    this._handlePlaceChanged("origin");
  };

  _handleDestinationPlaceChanged = () => {
    this._handlePlaceChanged("destination");
  };

  _onStyleChange = e => {
    this.setState({ mapStyle: e.target.value });
    setStorageMapStyle(e.target.value);
  };
  //for vehicleType
  _onFormValidate = () => {
    if (this.state.destination && this.state.distance < 70000) {
      this._onPriceChanged();
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
      document.getElementById("root").classList.toggle("lock-scroll");
    } else {
      this.setState({ hasNotValidatedPlaces: true });
      setTimeout(() => {
        this.setState({ hasNotValidatedPlaces: false });
      }, 8000);
    }
  };

  _onPriceChanged = () => {
    const { distance, deliveryType, vehicleType } = this.state;
    let price = 0;

    switch (vehicleType) {
      case "scooter":
        price = computeDistanceToScooterPrice(distance, deliveryType);
        break;
      case "berlingo":
        price = computeDistanceToBerlingoPrice(distance, deliveryType);
        break;
      case "jumper":
        price = computeDistanceToJumperPrice(distance, deliveryType);
        break;

      default:
        price = computeDistanceToScooterPrice(distance, deliveryType);
        break;
    }

    if (distance) {
      this.setState({ price });
    }
  };

  _changeVehicleType = e => {
    this.setState({
      vehicleType: e.target.value
    });
  };

  __changeDeliveryType = e => {
    this.setState({
      deliveryType: e.target.value
    });
  };

  __onFormValidate = () => {
    if (this.state.destination && this.state.distance < 70000) {
      this.__onPriceChanged();
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
      document.getElementById("root").classList.toggle("lock-scroll");
    } else {
      this.setState({ hasNotValidatedPlaces: true });
      setTimeout(() => {
        this.setState({ hasNotValidatedPlaces: false });
      }, 8000);
    }
  };
  render() {
    const { props, state } = this;
    return (
      <React.Fragment>
        <MapSearchBox
          mapCountryCode={props.defaultCountryCode}
          onCountryChange={props.changeDefaultCountryCode}
          vehicleType={state.vehicleType}
          deliveryType={state.deliveryType}
          onVehicleTypeChange={this._changeVehicleType}
          onDeliveryTypeChange={this.__changeDeliveryType}
          hasNotValidatedPlaces={state.hasNotValidatedPlaces}
          distance={state.distance}
          price={state.price}
          priceDelivery={state.priceDelivery}
          onFormValidate={this._onFormValidate}
          _onFormValidate={this.__onFormValidate}
          onOriginBoxMounted={this._onOriginBoxMounted}
          onDestinationBoxMounted={this._onDestinationBoxMounted}
        />
        <MapStyled>
          <GoogleMapsWrapper
            onMapMounted={this._handleMapMounted}
            onBoundsChanged={this._handleBoundsChanged}
            mapStyle={state.mapStyle}
            defaultCenter={props.defaultMapCenter}
            {...props}
          >
            {state.origin && (
              <Marker
                animation={google.maps.Animation.DROP}
                position={state.origin}
                icon={OriginPin}
              />
            )}
            {state.destination && (
              <Marker
                animation={google.maps.Animation.DROP}
                position={state.destination}
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
                  polylineOptions: { strokeColor: "#3a91d2", strokeWeight: 5 }
                }}
              />
            )}
          </GoogleMapsWrapper>
        </MapStyled>
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
        // mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        scaleControl: true
      }}
      {...otherProps}
    >
      {children}
    </GoogleMap>
  );
});

export default MapPage;
