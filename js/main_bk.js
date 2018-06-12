
//////////////////////////////////////////////////////////////////////////
// Scene 1: Hatchery

var lincoln_county = L.geoJson.ajax('assets/data/lincoln_county.geojson', {
    color: 'black',
    weight: 2,
    opacity: 0.3,
    onEachFeature: onEachFeature
    //
    //     function (feature, layer) {
    //     layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
    // }
});

//////////////////////////////////////////////////////////////////////////
// Scene 2: Stakeholders



//////////////////////////////////////////////////////////////////////////
// Scene 3: Seed Crisis

var prep = L.geoJson.ajax('assets/data/cascadia.geojson', {
    color: 'red',
    weight: 2,
    opacity: 0.3,
    onEachFeature: onEachFeature
});

//////////////////////////////////////////////////////////////////////////
// Scene 4: Events
var events = L.geoJson.ajax('assets/data/events-named.geojson', {
    color: 'red',
    weight: 2,
    opacity: 0.3,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: L.divIcon({
                className: "fas fa-marker"})});
    },
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.location + ":<br>" + feature.properties.event, {sticky: true, className: "feature-tooltip"});
    }
    // onEachFeature: function (feature, layer) {
    //     layer.bindTooltip('<p><img src="assets/img/scope/' + feature.properties.media + '" class="img-responsive img-thumbnail"/></p>', {sticky: true, className: "feature-tooltip"});
    // }
});

//////////////////////////////////////////////////////////////////////////
// Scene 5: Successful Adaptation



//////////////////////////////////////////////////////////////////////////
// Layer, Scene, and Storymap Management
var layers = {
    lincoln_county: {layer: lincoln_county},
    events: {layer: events},
    prep: {layer: prep},
    basemap: {layer: L.tileLayer('https://api.mapbox.com/styles/v1/ginnykatz/cji6zhuni0feb2so1xp4i58zc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2lubnlrYXR6IiwiYSI6ImNqZ2J2M2U0Nzl1NzEyd21kZHk4czVxdXgifQ.4KrWqM_F46SXCnyhyZj02A')}
};
//Newport 44.628319, -124.062425
//lcso 44.636324, -124.054765
var scenes = {
    landing: {lat: 44.628319, lng: -124.062425, zoom: 13, name: 'Home'},
    intro: {lat: 44.628319, lng: -124.062425, zoom: 10, name: 'Intro', layers: ['lincoln_county', 'basemap']},
    scope: {lat: 44.628319, lng: -124.062425, zoom: 7, name: 'Scope of Service'},
    prep: {lat: 44.628319, lng: -124.062425, zoom: 7, name: 'Preparedness Priorities' , layers:['prep','basemap']},
    duties: {lat: 44.636324, lng:-124.054765, zoom: 9, name: 'Internship Duties', layers: ['basemap']},
    events: {lat: 44.636324, lng:-124.054765, zoom: 9, name: 'Training Events', layers: ['events','basemap']},
    courses: {lat: 44.628319, lng: -124.062425, zoom: 7, name: 'Applicable Courses', layers: []},
    core: {lat: 44.628319, lng: -124.062425, zoom: 7, name: 'Core Competencies', layers: []},
    challenges: {lat: 44.628319, lng: -124.062425, zoom: 13, name: 'Successful Adaptation', layers: ['basemap']},
    end: {lat: 44.628319, lng: -124.062425, zoom: 13, name: 'The End',
}};

$('#storymap').storymap({
    scenes: scenes,
    layers: layers,
    baselayer: layers.basemap,
    legend: true,
    credits: "",
    loader: true,
    scalebar: false,
    navwidget: true,

    createMap: function () {
        // create a map in the "map" div, set the default view and zoom level
        var map = L.map($(".storymap-map")[0], {
            zoomControl: false,
            scrollWheelZoom: false
        }).setView([45.408, -123.960140], 13);

        // add zoom control with custom position
        L.control.zoom({
            position:'bottomright'
        }).addTo(map);

        return map;
    }
});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-110256930-2', 'auto');
ga('send', 'pageview');

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Interactive Features.
// 3.2.1 highlight a feature when the mouse hovers on it.
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 0.8,
        color: '#ffffff',
        fillColor: '#ffffff',
        fillOpacity: 0.5
    });
    layer.bringToFront();
    // select the update class, and update the content with the input value.
    // $(".update").html('<img src="assets/img/scope/' + events.properties.media + '" class="img-thumbnail img-responsive"/>');
    // $(".info").show();
}

// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }

function resetHighlight(e) {
    prep.resetStyle(e.target);
    lincoln_county.resetStyle(e.target);
    // $(".info").hide();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        // click: zoomToFeature,
        mouseout: resetHighlight
    });
}
