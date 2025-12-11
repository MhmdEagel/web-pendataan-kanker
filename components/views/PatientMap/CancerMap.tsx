"use client";

import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style/map.css";
import { renderToString } from "react-dom/server";

export default function CancerMap({ kabupaten }) {
  const mapStyle = {
    fillColor: "white",
    fillOpacity: 1,
    color: "black",
  };

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.NAME_2;
    const cancerCount = country.properties.cancerCount;
    const drop_out = country.properties.drop_out;
    const meninggal = country.properties.meninggal;
    const pindah_layanan = country.properties.pindah_layanan;
    const relaps_metastase = country.properties.relaps_metastase;
    const survivor = country.properties.survivor;
    const popUpHTML = renderToString(
      <MapPopup
        name={name as string}
        total={cancerCount as number}
        drop_out={drop_out}
        meninggal={meninggal}
        pindah_layanan={pindah_layanan}
        relaps_metastase={relaps_metastase}
        survivor={survivor}
      />
    );

    layer.bindPopup(popUpHTML);
    layer.bindTooltip(name, {
      permanent: true,
      direction: "center",
      className: "map-tooltip",
    });
  };

  return (
    <MapContainer
      center={[1, 101.45]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
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

function MapPopup({
  name,
  total,
  drop_out,
  meninggal,
  pindah_layanan,
  relaps_metastase,
  survivor,
}: {
  name: string;
  total: number;
  drop_out: number;
  meninggal: number;
  pindah_layanan: number;
  relaps_metastase: number;
  survivor: number;
}) {
  return (
    <div className="grid gap-1.5 min-w-32">
      <div className="flex flex-1 justify-between leading-none">
        <div className="text-muted-foreground">{name}</div>
        <div className="font-mono font-medium tabular-nums">{total}</div>
      </div>
      <div className="grid gap-1">
        <div className="flex flex-1 justify-between leading-none">
          <div className="text-muted-foreground">Drop Out</div>
          <div className="font-mono font-medium tabular-nums">{drop_out}</div>
        </div>
        <div className="flex flex-1 justify-between leading-none">
          <div className="text-muted-foreground">Meninggal</div>
          <div className="font-mono font-medium tabular-nums">{meninggal}</div>
        </div>
        <div className="flex flex-1 justify-between leading-none">
          <div className="text-muted-foreground">Pindah Layanan</div>
          <div className="font-mono font-medium tabular-nums">
            {pindah_layanan}
          </div>
        </div>
        <div className="flex flex-1 justify-between leading-none">
          <div className="text-muted-foreground">Relaps/Metastase</div>
          <div className="font-mono font-medium tabular-nums">
            {relaps_metastase}
          </div>
        </div>
        <div className="flex flex-1 justify-between leading-none">
          <div className="text-muted-foreground">Survivor</div>
          <div className="font-mono font-medium tabular-nums">{survivor}</div>
        </div>
      </div>
    </div>
  );
}
