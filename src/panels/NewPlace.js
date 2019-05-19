import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Cell, Div, Avatar, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
const osname = platform();

const NewPlace = ({ id, go, fetchedUser, pageName, goOn, getQR }) => (
	<Panel id={id}>
  <PanelHeader
left={<HeaderButton onClick={go} data-to="home">{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
  >{pageName}</PanelHeader>

    {fetchedUser &&
		<Group title={`Поздравляем, ${fetchedUser.first_name}!`}>
		<Cell style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontWeight: 'bold'}}>
		Вы получили баллы!
		</Cell>
		<Div style={{display: 'flex'}}>
       <Button size="l" stretched style={{marginRight:8}} onClick={() => goOn('profile')}>Профиль</Button>
			 <Button size="l" stretched level="commerce">Куда потратить</Button>

     </Div>
     </Group>}

		<Group title="Метки">
			<Div>
				<Button size="xl" level="1" before={<Icon24Qr/>} onClick={getQR}>Сканировать ещё одну</Button>
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
