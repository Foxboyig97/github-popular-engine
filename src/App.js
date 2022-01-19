
import React, { useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import Loading from './component/loading';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pages from './router';
import { faBolt, faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router';

const App = () => {
  const { loading } = useSelector(state => state.app)
  const loction = useLocation()
  const [selectedKey, setselectedKey] = useState(loction.pathname);
  const navigate = useNavigate()
  const handleClick = (e) => {
    setselectedKey(e.key)
    navigate(e.key)
  }

  return (
    <>
      <Loading loading={loading} />
      {
        (loction.pathname == '/' || loction.pathname == '/battle') ?
          <Menu onClick={handleClick} selectedKeys={[selectedKey]} mode="horizontal">
            <Menu.Item key="/" icon={<FontAwesomeIcon icon={faFire} color="rgb(129, 194, 245)" />}>
              popular
            </Menu.Item>
            <Menu.Item key="/battle" icon={<FontAwesomeIcon icon={faBolt} color="rgb(129, 194, 245)" />}>
              battle
            </Menu.Item>
          </Menu> :
          null
      }
      <Content style={{ padding: '10px 30px', }}>
        <Pages />
      </Content>
    </>
  )
}
export default App
