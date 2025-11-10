mapboxgl.accessToken = 'pk.eyJ1IjoicGFtdG9uZyIsImEiOiJjbWg5Y2Jka2MwbjFwMm9vb2FrZnZsc3J5In0.iqRw1Ebsq6UA8hTxQPP1Pg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/pamtong/cmh9cfcei00ap01sqfzts1h9y',
  center: [-122.2748, 37.8725], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom,
    });

map.on('load', function() {
  const layers = [
    { id: 'fav',  label: 'Love It! ☕',    file: 'https://raw.githubusercontent.com/ZhexinTong/Coffeemap/refs/heads/main/pt-coffee-ratings/fav.geojson',      color: '#2ecc71' }, // green
    { id: 'yeee',  label: 'Pretty Good 👍',   file: 'https://raw.githubusercontent.com/ZhexinTong/Coffeemap/refs/heads/main/pt-coffee-ratings/yeee.geojson',     color: '#3498db' }, // blue
    { id: 'meh',  label: 'It’s Okay 😐',    file: 'https://raw.githubusercontent.com/ZhexinTong/Coffeemap/refs/heads/main/pt-coffee-ratings/meh.geojson',      color: '#f1c40f' }, // yellow
    { id: 'nah', label: 'Not Great 👎',     file: 'https://raw.githubusercontent.com/ZhexinTong/Coffeemap/refs/heads/main/pt-coffee-ratings/nah.geojson',      color: '#e67e22' }, // orange
    { id: 'hellnah', label: 'Never Again 💀', file: 'https://raw.githubusercontent.com/ZhexinTong/Coffeemap/refs/heads/main/pt-coffee-ratings/hell-nah.geojson', color: '#e74c3c' }  // red
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
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1
      },
      layout: {
        visibility: 'visible'
      }
    });


    // Add click event for popups
    map.on('click', `${id}-layer`, (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;

      // Create popup content using the actual data properties
      const popupContent = `
      <div>
        <h3>${properties.name || properties.Name || 'Unnamed location'}</h3>
        ${properties.Addresses ? `<p><strong>Address:</strong> ${properties.Addresses}</p>` : ''}
        ${properties.City ? `<p><strong>City:</strong> ${properties.City}</p>` : ''}
        ${properties.website ? `<p><strong>Website:</strong> <a href="${properties.website}" target="_blank">${properties.website}</a></p>` : ''}
        ${properties.hyperlink ? `<p><strong><a href="${properties.hyperlink}" target="_blank">Open in Google Map</a><strong></p>` : ''}
        ${!properties.Addresses && !properties.City && !properties.website && !properties.hyperlink ? '<p>No additional info available.</p>' : ''}
      </div>
    `;    

    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(popupContent)
    .addTo(map);
     
    });

        // Change cursor to pointer when hovering over points
    map.on('mouseenter', `${id}-layer`, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', `${id}-layer`, () => {
      map.getCanvas().style.cursor = '';
    });
  });
  const panel = document.getElementById('layer-controls');

  // Build a checkbox for each layer
  layers.forEach(({ id, color, label }) => {
    const layerId = `${id}-layer`;

    const row = document.createElement('label');

    const swatch = document.createElement('span');
    swatch.className = 'swatch';
    swatch.style.background = color;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // initial state: visible unless set to 'none'
    checkbox.checked = (map.getLayoutProperty(layerId, 'visibility') !== 'none');

    checkbox.addEventListener('change', () => {
      map.setLayoutProperty(layerId, 'visibility', checkbox.checked ? 'visible' : 'none');
    });

    const text = document.createElement('span');
    text.textContent = label; // label text (e.g., fav, yeee, meh)

    row.appendChild(swatch);
    row.appendChild(checkbox);
    row.appendChild(text);
    panel.appendChild(row);
  });


});
