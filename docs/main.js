// docs/main.js - Versión Básica (Punto + Radio Amarillo)

// 1. CAPTURAR DATOS DE LA URL
const params = new URLSearchParams(window.location.search);

// Si no llegan datos, usamos Plaza de Bolívar por defecto
const lat = parseFloat(params.get('lat')) || 4.5981;
const lon = parseFloat(params.get('lon')) || -74.0760;
const radio = parseFloat(params.get('radio')) || 500;
const localidad = params.get('loc') || "Bogotá";

// Actualizar textos del panel si existen
if(document.getElementById('titulo')) {
    document.getElementById('titulo').innerText = `📍 ${localidad}`;
    document.getElementById('lblRadio').innerText = radio;
    document.getElementById('lblLat').innerText = lat.toFixed(4);
    document.getElementById('lblLon').innerText = lon.toFixed(4);
}

// 2. INICIAR VISOR (Modo Ligero)
const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,       // Sin reloj
    timeline: false,        // Sin línea de tiempo
    baseLayerPicker: false, // Mapa base por defecto (Bing Maps)
    fullscreenButton: false,
    homeButton: false,
    infoBox: false,
    selectionIndicator: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    geocoder: false
});

// Ocultar créditos para limpiar la vista
viewer.cesiumWidget.creditContainer.style.display = "none";

// 3. DIBUJAR EL RADIO (CÍRCULO AMARILLO)
viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    ellipse: {
        semiMinorAxis: radio, // Radio en metros
        semiMajorAxis: radio,
        // Amarillo con transparencia (Alpha 0.4) para ver el mapa debajo
        material: Cesium.Color.YELLOW.withAlpha(0.4), 
        outline: true,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 2
    }
});

// 4. DIBUJAR EL PUNTO CENTRAL
viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    point: {
        pixelSize: 12,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2
    }
});

// 5. MOVER LA CÁMARA
// Calculamos altura para que el círculo quepa en pantalla
const alturaCamara = radio * 4; 

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat - 0.005, alturaCamara), 
    orientation: {
        heading: Cesium.Math.toRadians(0.0),  // Norte
        pitch: Cesium.Math.toRadians(-45.0),  // Inclinación
        roll: 0.0
    },
    duration: 3 // Segundos de vuelo
});

console.log("Visualizador Básico Cargado");