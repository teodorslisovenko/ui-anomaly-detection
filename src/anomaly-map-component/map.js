import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import LocalChart from "../chart-components/local-chart";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import DataFormatation from "./data-formatation";

// For some reason, react-leaflet has some issues loading up the standard icon picture for those markers,
// so in the next few lines, we are resetting them manually.
import blueIcon from "../assets/icons/marker-icon-blue.png";
import iconShadow from "../assets/icons/marker-shadow.png";

// Icon to mark anomalous features with red marker
import redIcon from "../assets/icons/marker-icon-red.png";

const defaultIcon = L.icon({
  iconUrl: blueIcon,
  shadowUrl: iconShadow,
  // In zooming the markers tends to float along, the next 2 lines are fixing them static.
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// To set markers globaly -> L.Marker.prototype.options.icon = defaultIcon;

const anomalayIcon = L.icon({
  iconUrl: redIcon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const Map = ({ data }) => {
  // console.log(answer);

  const localData = DataFormatation(data, "local");

  console.log(localData);

  const markers = data.map(({ results }) => {
    let markerCollection = [];
    let counter = 0;

    // console.log(data);

    for (const features of results) {
      for (const anomaly of features.ranking) {
        const { anomaly_level, coordinates, feature, importance, value } =
          anomaly;
        counter++;
        //console.log(counter);
        markerCollection.push(
          <Marker
            key={counter}
            position={[coordinates.y, coordinates.x]}
            icon={features.anomaly === "true" ? anomalayIcon : defaultIcon}
          >
            <StyledPopup maxWidth="1000" maxHeight="auto">
              <Container>
                <InfoContent>
                  <h1 id="default_heading">Feature info</h1>
                  <table className="table table-primary table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Attribute</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Feature name:</td>
                        <td>{feature}</td>
                      </tr>
                      <tr>
                        <td>Timestamp:</td>
                        <td>{features.timestamp}</td>
                      </tr>
                      <tr>
                        <td>Value:</td>
                        <td>{value}</td>
                      </tr>
                      <tr>
                        <td>Importance:</td>
                        <td>{importance}</td>
                      </tr>
                      <tr>
                        <td>Anomaly level:</td>
                        <td>{anomaly_level}</td>
                      </tr>
                      <tr>
                        <td>Coordinates:</td>
                        <td>
                          Longitude X: {coordinates.x.substring(0, 7)} <br />
                          Latitude Y: {coordinates.y.substring(0, 7)}
                        </td>
                      </tr>
                      <tr
                        className={
                          features.anomaly === "true"
                            ? "table-danger"
                            : "table-primary"
                        }
                      >
                        <td>Anomalous:</td>
                        <td>{features.anomaly === "true" ? "YES" : "NO"}</td>
                      </tr>
                    </tbody>
                  </table>
                </InfoContent>
                <ChartContent>
                  <LocalChart featureName={feature} anomalies={localData} />
                </ChartContent>
              </Container>
            </StyledPopup>
          </Marker>
        );
      }
    }
    return markerCollection;
  });

  // console.log(markers);

  return (
    <Main>
      <MapContainer
        style={{ height: "99vh", width: "198vh" }}
        center={[40.0, 15.0]}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => marker)}
      </MapContainer>
    </Main>
  );
};

export default Map;

// CSS styling

const Main = styled.div`
  position: absolute;
  z-index: 314159;
  pointer-events: initial;
`;

// Styling a markers popup

const StyledPopup = styled(Popup)`
  width: 1000px;
`;

const Container = styled.div`
  display: flex;
`;

const InfoContent = styled.div`
  text-align: center;
  height: 370px;
  width: 300px;
  margin-top: 15px;
  font-size: 14px;
  // background-color: #2196f3;
`;

const ChartContent = styled.div`
  width: 800px;
  flex-grow: 1;
`;
