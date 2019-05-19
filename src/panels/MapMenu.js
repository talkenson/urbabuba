import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Cell, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
//import * as Ax from './AxiosSettings';

var Store = require('store');



function GetPar(fu){
  return Store.get('fetchedUser');
  /* + ' ' + fu + ' ' + Store.get('User')*/

}

const MainBlock = ({ id, go, getQR, fetchedUser, pageName, goOn }) => (



  <Div>
    <Button size="xl" level="1" before={<Icon24Qr/>} onClick={getQR}>Сканировать метку</Button>
    <ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
		Using backend on {Store.get('AxHost')}
		</ListItem>
    <ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>

{Store.get('User').points} {Store.get('User').role}
		</ListItem>
    <ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    {JSON.stringify(Store.get('fetchedUser'))}
    </ListItem>
    <ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    {JSON.stringify(fetchedUser)}
    </ListItem>
    <ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    {JSON.stringify(Store.get('User'))}
    </ListItem>
    <ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    {JSON.stringify(Store.get('axios'))}
        </ListItem>

  </Div>


);

MainBlock.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	getQR: PropTypes.func.isRequired
};

export default MainBlock;
