import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const modelRef = React.useRef();
  const [annots, setAnnots] = useState([]);

  const handleClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
      if (hit) {
        setAnnots((annots) => {
          return [...annots, hit];
        });
      }
    }
  };

  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };

  return (
    <model-viewer
      // className="model-viewer"
      src="./M08.glb"
      alt="A rock"
      exposure="0.008"
      camera-controls
      ar
      ar-modes="webxr"
      onClick={handleClick}
      ref={(ref) => {
        modelRef.current = ref;
      }}
    >
      {annots.map((annot, idx) => (
        <button
          key={`hotspot-${idx}`}
          className="view-button"
          slot={`hotspot-${idx}`}
          data-position={getDataPosition(annot)}
          data-normal={getDataNormal(annot)}
        ></button>
      ))}
    </model-viewer>
  );
}
