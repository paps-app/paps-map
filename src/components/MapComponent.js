import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

import get from "lodash.get";

import { Input } from "./styles";

const EMG = {
  lat: 14.72653,
  lng: -17.4414
};

const URBAM = {
  lat: 14.73515,
  lng: -17.45741
};

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZnF19RSZU0ud4oeIbsOmru1iPnXlpl7w&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      let OrginID = null;
      let DestinationID = null;

      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: EMG,
          destination: URBAM,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          optimizeWaypoints: true
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
    componentWillMount() {
      let refs = {};

      this.setState({
        bound: null,
        center: EMG,
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onOriginBoxMounted: ref => {
          refs.originBox = ref;
        },
        onDestinationBoxMounted: ref => {
          refs.destinationBox = ref;
        },
        onDirectionsMounted: ref => {
          refs.directionsRef = ref;
        },
        onDirectionsChanged: () => {
          this.setState({
            newDirections: refs.directionsRef.getDirection()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places: Array = refs.originBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = get(nextMarkers, "0.position", this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
        }
      });
    }
  })
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    defaultCenter={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <OriginInputBox {...props} />
    <DestinationInputBox {...props} />
    {props.directions && (
      <DirectionsRenderer
        ref={props.onDirectionsMounted}
        onDirectionsChanged={props.onDirectionsChanged}
        directions={props.directions}
      />
    )}
  </GoogleMap>
));

const OriginInputBox = ({ onOriginBoxMounted, bounds, onPlacesChanged }) => (
  <SearchBox
    ref={onOriginBoxMounted}
    bounds={bounds}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={onPlacesChanged}
  >
    <Input type="text" placeholder="Entrer le point de départ" />
  </SearchBox>
);

const DestinationInputBox = ({ onDestinationBoxMounted, bounds, onPlacesChanged }) => (
  <SearchBox
    ref={onDestinationBoxMounted}
    bounds={bounds}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={onPlacesChanged}
  >
    <Input type="text" placeholder="Entrer la destination" />
  </SearchBox>
);

export default MapWithASearchBox;
