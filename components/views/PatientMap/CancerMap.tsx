"use client";

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style/map.css";

export default function CancerMap({ kabupaten }: { kabupaten: any }) {
  const mapStyle = {
    fillColor: "white",
    fillOpacity: 1,
    color: "black",
  };

  
  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.NAME_2;
    const cancerCount = country.properties.cancerCount;
    layer.bindPopup(`${name} ${cancerCount}`);
  };

  return (
    <MapContainer
      center={[1, 101.45]} // koordinat Riau
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      dragging={false}
      scrollWheelZoom={false}
    >
      {/* <TileLayer url="https://{s}.tile.opxenstreetmap.org/{z}/{x}/{y}.png" /> */}
      <GeoJSON
        style={mapStyle}
        data={kabupaten}
        onEachFeature={onEachCountry}
        
      />
    </MapContainer>
  );
}
