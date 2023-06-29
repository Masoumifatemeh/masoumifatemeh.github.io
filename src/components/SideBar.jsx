import React, { Component } from "react";
class SideBar extends Component {
  render() {
    const {onMoveToNextMarker} = this.props;
    return (
      <React.Fragment>
        <div className="d-flex flex-column flex-shrink-0 position-absolute">
          <ul className="nav nav-pills nav-flush flex-column mb-auto text-center p-1">
          <li className="nav-item mt-2 bg-white rounded border border-fern-green" title="next" >
              <button 
                onClick={onMoveToNextMarker}
                className="btn btn-sm rounded"
              >
                <img
                  src={process.env.PUBLIC_URL + "/assets/svg/play.svg"}
                  width={25}
                  height={25}
                  alt=""
                />
              </button>
          </li>
          </ul>
        </div>
          
      </React.Fragment>
    );
  }
}

export default SideBar;


// color-green:#2c3929
// text_color:#2c3929
// Theme_color#2d3b28