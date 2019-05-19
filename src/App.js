import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, ListItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import NewPlace from './panels/NewPlace';
import Profile from './panels/Profile';
import Spendlist from './panels/Spendlist';

import axios from 'axios'
const Store = require('store');



var User = {
	userid: 0,
	points: 0,
	route: 'none',
	role: 'none'

}

try{
  if(Store.get('User').userid < 1){
    Store.set('User', User);
  }
}
catch(e){
  console.log('User придется инитнуть');
  Store.set('User', User);
}
Store.set('AxHost','//daw.ict.nsc.ru:10887');

function Query(qry){
	axios.get(Store.get('AxHost') + '/query/' + qry.split(' ').join('+'))
		.then(function (response) {
			Store.set("axios", response.data);
			console.log(response);
			return response.data;
	})
	.catch(function (error) {
		Store.set("axiosErr", error);
	})
}


function GetMe(id){
  axios.post(Store.get('AxHost') + '/query/SELECT+userid,+points,+current_route+AS+route,+role+FROM+userinfo+WHERE+userid=' + id)
    .then(function (response) {
      Store.set("axiosGet", response.data);
      console.log(response);
      var user={
      	userid: response.data.r[0].userid,
      	points: response.data.r[0].points,
      	route: response.data.r[0].route,
      	role: response.data.r[0].role
      }
      if(user.userid != Store.get('User').userid){Store.set('User', user);window.location.reload();}
      Store.set('User', user);

    })
    .catch(function (error) {
      Store.set("error_axios", error);
    })


}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.goOn = this.goOn.bind(this);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};

	}

	readQR(){
		connect.send('VKWebAppOpenQR');
	}



	workNewQR(e){
		//console.log(e.qr_data);
		
		this.goOn('newplace');
	}
	goOn(e){
this.setState({activePanel: e})

	}

	componentDidMount() {
//this.setState({ fetchedUser: {id:1} });
Store.set('fetchedUser', {id:0});


		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
          Store.set('fetchedUser', e.detail.data);
          console.log('Result fetched');
          console.log(
          JSON.stringify(Store.get('fetchedUser')),
          JSON.stringify(this.state.fetchedUser),
          JSON.stringify(Store.get('User')),
          JSON.stringify(Store.get('axios')));
					Query('INSERT IGNORE INTO userinfo (userid, current_route, points, role) VALUES ("' + this.state.fetchedUser.id + '", "none", 1, "")')

          GetMe(this.state.fetchedUser.id);
					break;
				case 'VKWebAppOpenQRResult':
					this.workNewQR({ data: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});

console.log('fetched stored', Store.get('fetchedUser'));



  }

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {

    console.log(
    JSON.stringify(Store.get('fetchedUser')),
    JSON.stringify(this.state.fetchedUser),
    JSON.stringify(Store.get('User')),
    JSON.stringify(Store.get('axios')));

		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} getQR={this.readQR} pageName="Квестач" goOn={this.goOn}/>
				<NewPlace id="newplace" go={this.go} pageName="Отметочка" fetchedUser={this.state.fetchedUser} getQR={this.readQR} goOn={this.goOn}/>
				<Profile id="profile" go={this.go} pageName="Профиль" fetchedUser={this.state.fetchedUser} goOn={this.goOn} />
        <Spendlist id="spendlist" go={this.go} pageName="Квестач" fetchedUser={this.state.fetchedUser} goOn={this.goOn} />
			</View>
		);
	}
}

export default App;
