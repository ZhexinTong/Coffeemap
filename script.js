mapboxgl.accessToken = 'pk.eyJ1IjoicGFtdG9uZyIsImEiOiJjbWg5Y2Jka2MwbjFwMm9vb2FrZnZsc3J5In0.iqRw1Ebsq6UA8hTxQPP1Pg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/pamtong/cmh9cfcei00ap01sqfzts1h9y',
  center: [-122.2748, 37.8725], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom,
    });

map.on('load', function() {
  const layers = [
    { id: 'fav',      file: 'pt-coffee-ratings/fav.geojson',      color: '#2ecc71' }, // green
    { id: 'yeee',     file: 'pt-coffee-ratings/yeee.geojson',     color: '#3498db' }, // blue
    { id: 'meh',      file: 'pt-coffee-ratings/meh.geojson',      color: '#f1c40f' }, // yellow
    { id: 'nah',      file: 'pt-coffee-ratings/nah.geojson',      color: '#e67e22' }, // orange
    { id: 'hellnah',  file: 'pt-coffee-ratings/hell-nah.geojson', color: '#e74c3c' }  // red
  ];

  // loop through each layer to add it to the map
  layers.forEach(({ id, file, color }) => {
    map.addSource(`${id}-src`, {
      type: 'geojson',
      data: file // relative path since geojson files are in same folder
    });

    map.addLayer({
      id: `${id}-layer`,
      type: 'circle',
      source: `${id}-src`,
      paint: {
        'circle-radius': 6,
        'circle-color': color,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 1
      },
      layout: {
        visibility: 'visible'
      }
    });
  });


  map.on('click', 'points-layer', (e) => {
      // Copy coordinates array
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;

      // Create popup content using the actual data properties
      const popupContent = `
        <div>
          <h3>${properties.name}</h3>
          ${properties["Addresses"] ? `<p><strong>Address:</strong> ${properties["Addresses"]}</p>` : ''}
          ${properties["City "] ? `<p><strong>City:</strong> ${properties["City "]}</p>` : ''}
          ${properties.website ? `<p><a href="${properties.website}" target="_blank">Website</a></p>` : ''}
          ${properties.hyperlink ? `<p><a href="${properties.hyperlink}" target="_blank">View on Google Maps</a></p>` : ''}
          ${properties.description ? `<p><strong>Notes:</strong> ${properties.description}</p>` : ''}
        </div>
      `;
      // Adding the pop up to the map

 });
});
