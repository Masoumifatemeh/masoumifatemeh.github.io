import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

class LocationMarker extends Component {
  
  renderLocationIcon = () => {
    return L.icon({
      iconUrl: process.env.PUBLIC_URL + "/assets/img/marker.png",
      iconSize: [40, 40],
      popupAnchor: [-200,300]
    });
  };
  renderLocationGif = () => {
    return L.icon({
      iconUrl: process.env.PUBLIC_URL + "/assets/gif/marker.gif",
      iconSize: [40, 40],
      popupAnchor: [-200,300]
    });
  };
  render() {
    const { artist, idx, currentArtitstIdx, markerRefs, onDisplayGalley} = this.props;
    return (
      <React.Fragment>
          <Marker
            key={idx}
            position={[artist.location.lat, artist.location.lng]}
            icon={currentArtitstIdx === idx?  this.renderLocationGif(): this.renderLocationIcon()}
            ref={(ref)=>markerRefs[idx]=ref}
          >
            <Popup position="left">
              <div className="row" >
                <div className="card mt-2">
                  <div className="card-header text-center bg-white">
                    {artist.artist_name} ({artist.birth_date}-{artist.death_date})
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                    <figure className="figure w-70">
                    <img src={process.env.PUBLIC_URL + artist.artist_image} 
                        className="figure-img img-fluid rounded"
                        alt=""></img>
                      <figcaption className="font-weight-bold">
                          <div>
                           <span className="font-weight-bold text-primary"><i className="fa fa-map-marker mx-1" aria-hidden="true"></i>Country: </span>
                            <span id="country" className="text-dark">{artist.country}</span>
                          </div>
                          <div>
                            <span className="font-weight-bold text-primary"><i className="fa fa-paint-brush mx-1" aria-hidden="true"></i>Movements and Styles: </span>
                            <span id="movements_and_styles" className="text-dark">{artist.movements_and_styles}</span>
                          </div>
                      </figcaption>
                    </figure>
                    </div>
                    <div className="card-footer bg-white">
                      <div className="row">
                        <button type="button" className="btn btn-light border-dark" onClick={()=>onDisplayGalley(idx)}>Gallery</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
      </React.Fragment>
    );
  }
}

export default LocationMarker;
