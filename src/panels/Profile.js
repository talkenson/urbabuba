import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Cell, Div, Avatar, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
const osname = platform();
let pos=12;
const Store = require('store');

const NewPlace = ({ id, go, fetchedUser, pageName, goOn }) => (
	<Panel id={id}>
  <PanelHeader
left={<HeaderButton onClick={go} data-to="home">{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
  >{pageName}</PanelHeader>
    {fetchedUser &&
		<Group title='Ваш профиль'>
    <ListItem
      before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
      description={`Вы занимаете ${pos} место`}
    >
      {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
    </ListItem>
		<Div style={{display: 'flex'}}>
			 <Button size="l" stretched level="commerce" onClick={go} data-to='spendlist'>Куда потратить баллы?</Button>
       <Button size="l" stretched level="tertiary">Перевод</Button>
     </Div>
     </Group>}

		<Group title="Достижения">
			<Div>
      <ListItem>
      12:46
      Оперный театр
      <Button size="l" align='right' level="tertiary">На карте</Button>
      </ListItem>
      <ListItem>
      13:00
      KFC
      <Button size="l" align='right' level="tertiary">На карте</Button>
      </ListItem>
      <ListItem>
      13:47
      Вокзал
      <Button size="l" align='right' level="tertiary">На карте</Button>
      </ListItem>
			</Div>
		</Group>
	</Panel>
);

NewPlace.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	goOn: PropTypes.func.isRequired,
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

export default NewPlace;
