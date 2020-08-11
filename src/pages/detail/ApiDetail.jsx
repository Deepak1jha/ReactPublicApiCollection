import React from "react";
import * as axios from "axios";
import IconsUrl from "../../data/icons/Icons";
import CustomNavbar from "../../components/navbar/Navbar";


class ApiDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      apiList: []
    }
  }

  componentDidMount = async () => {
    const category = this.props.match.params;
    const result = await axios(`https://api.publicapis.org/entries?category=${category.category}`);
    await this.setState({apiList: result.data.entries});
    console.log(this.state)
  }
  setIcon = () => {
    const category = this.props.match.params;
    const iconUrls = IconsUrl;
    const object = iconUrls.find((item) => {
      return item.name === category.category;
    });
    return object.url;
  }

  setAuth(auth) {
    if (auth === "") {
      return (<span className="badge-lg badge badge-success">No Auth</span>)
    }
    return (<span className="badge-lg badge badge-warning">Api Key</span>);
  }

  setHttp(http) {
    if (http === true) {
      return (<span className="badge-lg badge badge-success">Yes</span>)
    }
    return (<span className="badge-lg badge badge-warning">No</span>);
  }

  setCors(cors) {
    if (cors === "no") {
      return (<span className="badge-lg badge badge-success">No</span>)
    } else if (cors === "unknown") {
      return (<span className="badge-lg badge badge-danger">unknown</span>)
    }else {
      return (<span className="badge-lg badge badge-warning">Yes</span>)
    }
  }

  render() {
    const obj = this;
    return (
      <>
        <CustomNavbar/>
        <div className="mt--1 container-fluid">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="border-0 card-header"><h3 className="mb-0">Api</h3></div>
                <div className="table-responsive">
                  <table className="align-items-center table-flush table">
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">Api</th>
                      <th scope="col">Description</th>
                      <th scope="col">Auth</th>
                      <th scope="col">Https</th>
                      <th scope="col">Cors</th>
                      <th scope="col">Link</th>
                      <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody className="list">
                    {obj.state.apiList.map((item) => {
                      return (
                        <>
                          <tr key={item.description}>
                            <th scope="row">
                              <div className="align-items-center media">
                                <img className=" rounded-circle mr-3" alt="..."
                                     src={this.setIcon()}/>
                                <div className="media"><span className="name mb-0 text-sm">{item.API}</span>
                                </div>
                              </div>
                            </th>
                            <td className="budget">{item.Description}</td>
                            <td><span className="badge-dot mr-4 badge badge-"><span
                              className="status">{obj.setAuth(item.Auth)}</span></span></td>
                            <td>
                              <span className="badge-dot mr-4 badge badge-"><span
                                className="status">{obj.setHttp(item.HTTPS)}</span></span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center"><span
                                className="completion mr-2">{obj.setCors(item.Cors)}</span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <a style={{display: "table-cell"}} href={item.Link} target="_blank">{item.Link}</a>
                              </div>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                    </tbody>
                  </table>
                </div>
                <div className="py-4 card-footer">
                  <nav aria-label="...">
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ApiDetail;
