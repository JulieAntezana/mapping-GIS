// ArcGIS libraries use AMD format.  To use the libraries, 
// we specify a list of modules (e.g. Map, MapView) in a list
// with the require.  The second parameter defines a function
// that will use these modules.  We specify the module names
// in order in the function parameter list.  When this javascript
// file is loaded by the html, it will run this function using these
// modules.

// Read more here: https://dojotoolkit.org/documentation/tutorials/1.10/modules/index.html

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/Legend"	
  ], function(Map, MapView, Graphic, GraphicsLayer, FeatureLayer, Locate, Search, Legend) {

        // Create a basemap for the map view
        var myMap = new Map({
          basemap: "gray-vector"
        });


        // Create a map view for the HTML using the basemap
        // previously created.
          var myView = new MapView({
            map: myMap,
            center: [-77.045, 38.889], // longitude, latitude
            zoom: 13, // Zoom level
            container: "viewDiv" // div element
        });



        // Create a Graphics Layer which can be used to draw graphics
        // on the map
        var graphicsLayer = new GraphicsLayer
        myMap.add(graphicsLayer);



        // We will use the XMLHttpRequest object to read data from the map service
        // server and populate graphics on our map based on the results
        // https://www.w3schools.com/js/js_ajax_http.asp
        var xmlhttp = new XMLHttpRequest();

        // This long function below is what will happen when we get a result
        // The actual sending of the http request and reading response occurs
        // after the definition of this function.
        xmlhttp.onreadystatechange = function() {
            // Did we get a response (4) and was the response successful (200)
            if (this.readyState == 4 && this.status == 200) {
                
                // Convert the JSON text to JSON object that we
                // can loop through
                var data = JSON.parse(this.responseText);

                // The structure of the cherry blossom tour data can be found
                // at the arcGIS map service website:
                // https://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/Cherry_Blossom_map_service/FeatureServer/layers
                

            }
        }; // End of XML Call back Function

        // Time to actually send the GET request to the USGS.  When we get a response
        // it will call and execute the function we defined above.
        xmlhttp.open("GET", "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", true);
        xmlhttp.send();

        
        myView.popup.defaultPopupTemplateEnabled = true;   

        var volcanoLayer = new FeatureLayer({
            url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/test_Significant_Global_Volcanic_Eruptions_1/FeatureServer"
        });
    var dcboundariesLayer = new FeatureLayer({
    url:  "https://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/DC_Boundary/FeatureServer"
  });
  var waterbodiesLayer = new FeatureLayer({
    url:
      "https://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/DC_Waterbodies_2017/FeatureServer"
  });

  var cherryLayer = new FeatureLayer({
            url: "https://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/Cherry_Blossom_map_service/FeatureServer"
        });

  var bikesLayer = new FeatureLayer({
            url: "https://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/DC_bikeride_1433345063605/FeatureServer"
        });
  
        var faultsLayer = new FeatureLayer({
            url: "https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/Sean_View_6/FeatureServer"
        });
        myMap.add(dcboundariesLayer);
        myMap.add(waterbodiesLayer);
        myMap.add(cherryLayer);
        myMap.add(bikesLayer);

        // Create a locate me button
       
        var locate = new Locate({
            view: myView,
            useHeadingEnabled: false,
            goToOverride: function(view, options) {
                options.target.scale = 1000000;  // 1/1000000 scale
                return view.goTo(options.target);
              }
        });
        
        myView.ui.add(locate, "top-left");

        // Create a Search Bar
                
        var search = new Search({
            view: myView
        });
        
        myView.ui.add(search, "top-right");

        // Create a Legend for the Feature Layers

        var legend = new Legend({
            view: myView,
            layerInfos: [{
                layer: dcboundariesLayer,
                title: "DC Boundaries Legend"
            }, {
                layer: waterbodiesLayer,
                title: "Water Bodies Legend"
            }, {
                layer: cherryLayer,
                title: "Tour Legend"
            }]
        });
        
        myView.ui.add(legend, "bottom-left");


});
