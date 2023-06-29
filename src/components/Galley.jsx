import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";


class Galley extends Component {
  state = {  };
  render() {
    const {showModal, onModalToggle, gallery} = this.props;
    return (
      <React.Fragment>
        <Modal show={showModal} onHide={onModalToggle} centered className="modal-lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
           <div className="row">
            <div className="card">
                <div className="card-header text-center bg-white">
                    Gallery
                </div>
                <div className="card-body">
                  <div className="lightbox">
                    <div className="row">
                    {gallery.map((img_data,idx) => (
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4"  key={`div-${idx}`}>
                          <figure className="figure">
                            <img key={`img-${idx}`}
                                  src={img_data.url}
                                  alt={img_data.title}
                                  className="figure-img img-fluid rounded"></img>
                            <figcaption className="font-weight-bold">
                                <div>
                                  <span id="title" className="text-center text-dark">{img_data.title} ({img_data.year})</span>
                                </div>
                            </figcaption>
                          </figure>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
            </div>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onModalToggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Galley;







