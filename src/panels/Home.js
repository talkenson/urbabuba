import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Cell, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import MainBlock from './MapMenu';
import * as Ax from './AxiosSettings';
const Store = require('store');



function updatePoints() { return Store.get("User").points; }

const Home = ({ id, go, fetchedUser, getQR, pageName, goOn }) => (
	<Panel id={id}>
		<PanelHeader>{pageName}</PanelHeader>
		{fetchedUser &&
		<Group title={`Привет, ${fetchedUser.first_name}`}>
		<ListItem style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
		{fetchedUser.first_name}, у тебя <span style={{ fontWeight: 'bold', fontFamily: 'Comfortaa', fontSize:'90px !important'}} id="points" dangerouslySetInnerHTML={{__html: updatePoints()}} ></span> баллов
		</ListItem>
		<Div style={{display: 'flex'}}>
       <Button size="l" stretched style={{marginRight:8}} onClick={go} data-to='profile'>Профиль</Button>
			 <Button size="l" stretched level="commerce" onClick={go} data-to='spendlist'>Куда потратить </Button>

     </Div>

		</Group>}

		<Group title="Ваши исследования">
			<MainBlock id='mainblock_home' fetchedUser={fetchedUser} go={go} getQR={getQR} goOn={goOn}/>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	getQR: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
