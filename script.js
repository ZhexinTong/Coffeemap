mapboxgl.accessToken = 'pk.eyJ1IjoicGFtdG9uZyIsImEiOiJjbWg5Y2Jka2MwbjFwMm9vb2FrZnZsc3J5In0.iqRw1Ebsq6UA8hTxQPP1Pg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/pamtong/cmh9cfcei00ap01sqfzts1h9y',
  center: [-122.2748, 37.8725], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom,
    });