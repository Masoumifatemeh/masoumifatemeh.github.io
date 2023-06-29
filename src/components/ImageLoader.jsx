import { Circles } from "react-loader-spinner";
class ImageLoader extends Component {
    state = {visible:true};
    handleLoading = () => {
      this.setState({visible:false})
    }
    render() {
        const {visible} = this.state;
        const {url} = this.props;
      return <div className="row text-center">
        {/* <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="d-flex justify-content-center"
          visible={visible}
        /> */}
        <img src={url} 
        className="figure-img img-fluid rounded"
        alt=""
        onLoad={this.handleLoading}></img>
      </div>
    }
  }