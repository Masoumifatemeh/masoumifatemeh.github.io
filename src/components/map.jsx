import React, { Component } from "react";
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import LocationMarker from "./LocationMarker";
import Galley from "./Galley";
import SideBar from "./SideBar";
import { getArtists } from "../services/loadData";

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
    mapZoom: .5,
    currentArtitstIdx: null,
    artists: [],
    showModal: false,
    markerRefs:[],
  };

  componentDidMount() {
    const artists = getArtists();
    this.setState({
      artists: artists,
      mapZoom:2.5,
      markerRefs:new Array(artists.length)
    });
  }

  handleModalToggle = (idx) => this.setState({ showModal: !this.state.showModal , currentArtitstIdx:idx});
  handleMoveToNextMarker = ()=> {
    const { currentArtitstIdx, artists, markerRefs } = this.state;
    if (currentArtitstIdx === artists.length - 1){
      markerRefs[artists.length - 1].closePopup();
      this.setState({currentArtitstIdx:null,
                     mapCenterPosition: { lat: 39.74943382936186, lng: -44.45068187691437 },
                     mapZoom:2,
                     showModal:false })
    }
    else if (currentArtitstIdx === null) {
      markerRefs[0].openPopup();
      this.setState({currentArtitstIdx:0,
                     mapCenterPosition:artists[0].location,
                     mapZoom:7,
                     showModal:false })
    }
    else{
      markerRefs[currentArtitstIdx + 1].openPopup();
      this.setState({currentArtitstIdx:currentArtitstIdx + 1 ,
                     mapCenterPosition:artists[currentArtitstIdx + 1].location,
                     mapZoom:7,
                     showModal:false })
    }
    }
  render() {
    const {
      mapCenterPosition,
      mapZoom,  
      artists,
      showModal,
      currentArtitstIdx,
      markerRefs,
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
                        onModalToggle={this.handleModalToggle}
                        />
                  ))}
                
                <Galley 
                    showModal={showModal}
                    onModalToggle={this.handleModalToggle}
                    gallery={(currentArtitstIdx !== null) ? artists[currentArtitstIdx].gallery:[]}
                />
              <RecenterAutomatically lat={mapCenterPosition.lat} lng={mapCenterPosition.lng} mapZoom={mapZoom} /> 
            </MapContainer>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
