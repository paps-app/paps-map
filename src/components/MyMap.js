import React from "react";
import { GoogleMap, withGoogleMap, DirectionsRenderer, Marker } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
// import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

import get from "lodash.get";

import LabelledMarker from "./MarkerWithLabel";
import { Input, DistanceOutput, ModeSelector } from "./styles";

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

const computePlaces = (places, bounds) =>
  places.forEach(place => {
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });

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
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "500px" }} />,
    mapElement: <div style={{ height: `100%` }} />,
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

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture the destination state before it updates.
    if (prevState.destination !== this.state.destination) {
      return this.state.destination;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Mounted @ " + Date.now());
    let OrginID = this.state.origin;
    let DestinationID = this.state.destination;
    const DirectionsService = new google.maps.DirectionsService();
    console.log({ snapshot });

    if (OrginID && DestinationID) {
      DirectionsService.route(
        {
          origin: OrginID,
          destination: DestinationID,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [
            {
              location: OrginID,
              stopover: false
            },
            {
              location: DestinationID
            }
          ],
          provideRouteAlternatives: true,
          optimizeWaypoints: true
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            if (snapshot !== null) {
              this.setState({
                directions: result,
                distance: google.maps.geometry.spherical.computeDistanceBetween(
                  OrginID,
                  DestinationID
                )
              });
            }
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

  _mapRef = null;
  _directionRef = null;
  _originRef = null;
  _destinationRef = null;

  _handleMapMounted = c => {
    if (!c || this._mapRef) return;
    this._mapRef = c;
    console.log("Ref set later @ " + Date.now());
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

  _onOriginChanged = () => {
    const originPlaces: Array = this._originRef.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    computePlaces(originPlaces, bounds);

    const nextMarkers = originPlaces.map(place => ({
      position: place.geometry.location
    }));
    const nextOriginCenter = get(nextMarkers, "0.position", this.state.center);

    console.log({ nextOriginCenter });

    this.setState({
      center: nextOriginCenter,
      markers: nextMarkers,
      origin: nextOriginCenter
    });
    this._mapRef.fitBounds(bounds);
  };

  _onDestinationChanged = () => {
    const destinationPlaces: Array = this._destinationRef.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    computePlaces(destinationPlaces, bounds);

    const nextMarkers = destinationPlaces.map(place => ({
      position: place.geometry.location
    }));
    const nextDestinationCenter = get(nextMarkers, "0.position", this.state.center);

    console.log({ nextDestinationCenter });

    this.setState({
      markers: nextMarkers,
      destination: nextDestinationCenter
    });
    // this._mapRef.fitBounds(bounds);
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
          <OriginInputBox
            onOriginBoxMounted={this._onOriginBoxMounted}
            onPlacesChanged={this._onOriginChanged}
          />
          <DestinationInputBox
            onDestinationBoxMounted={this._onDestinationBoxMounted}
            onPlacesChanged={this._onDestinationChanged}
          />
          {state.origin && <LabelledMarker position={state.origin} dir="origin" />}
          {state.destination && (
            <LabelledMarker position={state.destination} dir="destination" />
          )}
          {state.directions && (
            <DirectionsRenderer
              ref={this._onDirectionsMounted}
              onDirectionsChanged={this._onDirectionsChanged}
              directions={state.directions}
            />
          )}
        </GoogleMapsWrapper>
        <SelectorMode />
        {state.distance && (
          <DistanceOutput>
            <div>{Math.round(state.distance) / 1000}km</div>
          </DistanceOutput>
        )}
      </React.Fragment>
    );
  }
}

const OriginInputBox = ({ onOriginBoxMounted, onPlacesChanged, bounds }) => (
  <SearchBox
    ref={onOriginBoxMounted}
    bounds={bounds}
    controlPosition={google.maps.ControlPosition.LEFT}
    onPlacesChanged={onPlacesChanged}
  >
    <Input origin="yes" type="text" placeholder="Entrer le point de départ" />
  </SearchBox>
);

const DestinationInputBox = ({ onDestinationBoxMounted, onPlacesChanged, bounds }) => (
  <SearchBox
    ref={onDestinationBoxMounted}
    bounds={bounds}
    controlPosition={google.maps.ControlPosition.LEFT}
    onPlacesChanged={onPlacesChanged}
  >
    <Input dest="yes" type="text" placeholder="Entrer la destination" />
  </SearchBox>
);

const SelectorMode = () => (
  <ModeSelector>
    <input type="radio" name="type" id="changemode-walking" />
    <label for="changemode-walking">Walking</label>
    <input type="radio" name="type" id="changemode-transit" />
    <label for="changemode-transit">Transit</label>
    <input type="radio" name="type" id="changemode-driving" />
    <label for="changemode-driving" checked="checked">
      Driving
    </label>
  </ModeSelector>
);

export default MapPage;
