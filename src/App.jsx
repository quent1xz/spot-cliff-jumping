import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const AddMarker = ({ onAdd }) => {
  useMapEvents({
    click(e) {
      const name = prompt("Nom du spot ?");
      const height = prompt("Hauteur estimée du saut en mètres ?");
      const depth = prompt("Profondeur de l'eau (approximative) ?");
      if (name && height && depth) {
        onAdd({
          position: [e.latlng.lat, e.latlng.lng],
          name,
          height,
          depth
        });
      }
    }
  });
  return null;
};

export default function App() {
  const [spots, setSpots] = useState([
    {
      position: [44.834, 6.776],
      name: "Lac de Serre-Ponçon",
      height: "8m",
      depth: "3m"
    }
  ]);

  const handleAdd = (spot) => setSpots([...spots, spot]);

  return (
    <div className="h-screen w-full">
      <h1 className="text-2xl font-bold text-center p-2">Spot Cliff Jumping</h1>
      <p className="text-center text-sm text-gray-500 mb-2">
        Cliquez sur la carte pour ajouter un spot de saut
      </p>
      <MapContainer center={[44.8, 6.7]} zoom={6} className="h-[90%] w-full z-0">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spots.map((spot, index) => (
          <Marker key={index} position={spot.position}>
            <Popup>
              <strong>{spot.name}</strong>
              <br /> Hauteur : {spot.height}
              <br /> Profondeur : {spot.depth}
            </Popup>
          </Marker>
        ))}
        <AddMarker onAdd={handleAdd} />
      </MapContainer>
    </div>
  );
}