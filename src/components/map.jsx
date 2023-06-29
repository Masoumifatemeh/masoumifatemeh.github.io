import React, { Component } from "react";
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import LocationMarker from "./LocationMarker";
import AppInfoModal from "./AppInfoModal";
import Galley from "./Galley";
import SideBar from "./SideBar";

const RecenterAutomatically = ({lat,lng, mapZoom}) => {
    const map = useMap();
    map.flyTo([lat, lng], mapZoom, {
        animate: true,
        duration: 1.5
        });
   }

class Map extends Component {
  
  state = {
    mapCenterPosition: { lat: 39.74943382936186, lng: -44.45068187691437 },
    mapZoom: 0.5,
    currentArtitstIdx: null,
    artistIdx:null,
    artists: [],
    displayGalley: false,
    markerRefs:[],
  };

  getData = async () => {
    const data = await fetch(process.env.PUBLIC_URL + "/services/data.json")
                  .then((response) => {
                    return response.json();
                  }).then((data)=>{
                    return data;
                  });
    return data;
  }

  async componentDidMount(){
    const artists = await this.getData();
    this.setState({
      artists: artists,
      mapZoom:2.5,
      markerRefs:new Array(artists.length)
    });
  }

  handleDisplayGallery = (idx) => this.setState({ displayGalley: !this.state.displayGalley , artistIdx:idx});
  
  handleMoveToNextMarker = ()=> {
    const { currentArtitstIdx, artists, markerRefs } = this.state;
    if (currentArtitstIdx === artists.length - 1){
      markerRefs[artists.length - 1].closePopup();
      this.setState({currentArtitstIdx:null,
                     mapCenterPosition: { lat: 39.74943382936186, lng: -44.45068187691437 },
                     mapZoom:2,
                     displayGalley:false })
    }
    else if (currentArtitstIdx === null) {
      markerRefs[0].openPopup();
      this.setState({currentArtitstIdx:0,
                     mapCenterPosition:artists[0].location,
                     mapZoom:7,
                     displayGalley:false })
    }
    else{
      markerRefs[currentArtitstIdx + 1].openPopup();
      this.setState({currentArtitstIdx:currentArtitstIdx + 1 ,
                     mapCenterPosition:artists[currentArtitstIdx + 1].location,
                     mapZoom:7,
                     displayGalley:false })
    }
    }
  render() {
    const {
      mapCenterPosition,
      mapZoom,  
      artists,
      displayGalley,
      currentArtitstIdx,
      markerRefs,
      artistIdx,
    } = this.state;
    return (
      <React.Fragment>
        <div className="row" key={"row"}>
          <div className="col position-absolute" style={{ zIndex: 5000, direction:"rtl" }} key="sidebar">
            <SideBar onMoveToNextMarker={this.handleMoveToNextMarker}/>
          </div>
          <div className="col" key="map">
            <MapContainer
              center={[mapCenterPosition.lat, mapCenterPosition.lng]}
              zoom={mapZoom}
            >
              {/* http://leaflet-extras.github.io/leaflet-providers/preview/index.html */}
              {/* https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png 
               Esri.NatGeoWorldMap
               */}
                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
                // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
                />
                  {artists.map((artist, idx) => (
                      <LocationMarker
                        key={idx}
                        artist={artist}
                        idx={idx}
                        currentArtitstIdx={currentArtitstIdx}
                        markerRefs={markerRefs}
                        onDisplayGalley={this.handleDisplayGallery}
                        />
                  ))}
                
                <Galley 
                    displayGalley={displayGalley}
                    onDisplayGalley={this.handleDisplayGallery}
                    gallery={(artistIdx !== undefined && artistIdx !== null ) ? 
                              artists[artistIdx].gallery: []}
                />
              <RecenterAutomatically lat={mapCenterPosition.lat} lng={mapCenterPosition.lng} mapZoom={mapZoom} /> 
              <AppInfoModal></AppInfoModal>
            </MapContainer>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
