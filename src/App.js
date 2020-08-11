import React, {useEffect, useState} from 'react';
import {Avatar, Layout} from 'antd';
import axios from "axios";
import Spin from "antd/lib/spin";
import IconsUrl from "./data/icons/Icons";
import GridList from "@material-ui/core/GridList";
import CustomNavbar from "./components/navbar/Navbar";

const {Content, Footer} = Layout;

const App = (props) => {

  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(`https://api.publicapis.org/categories`);
      setCategory(result.data);
      setIsLoading(false);
    }
    fetchItem();
  }, []);

  function setIcon(value) {
    const iconUrls = IconsUrl;
    const object = iconUrls.find((item) => {
      return item.name === value;
    })
    return object.url;
  }


  return isLoading ? (<Spin className="justify-content-center" size="large"/>) : (
    <Layout>
      <CustomNavbar/>
      <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
        <GridList cellHeight={"auto"} cols={2}>
          {category.map(function (value, index) {
            return (
              <div key={index} className="col-md-3 mt-3">
                <div className="card">
                  <div className="text-center card-body">
                    <div className="author"><Avatar size={64} src={setIcon(value)}/>
                      <h5 style={{marginTop: "2%"}} className="card-title text-danger">{value}</h5></div>
                    <button type="button" className="text-center btn-icon btn btn-info btn-sm"><span
                      className="btn-inner--icon mr-1 text-center d-flex justify-content-center"><i className="ni ni-fat-add"/></span><span
                      className="btn-inner--text " onClick={() => {
                      props.history.push(`/${value}`)
                    }}>View</span></button>
                  </div>
                </div>
              </div>
            )
          })}
        </GridList>
      </Content>
      <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default App;
