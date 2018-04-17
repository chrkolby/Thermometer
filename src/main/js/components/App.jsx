import React from 'react';
import Pusher from 'pusher-js';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import { Header } from './Header.jsx';
import { ManageTemperature } from './TemperatureOverview.jsx';
import { Thermometer } from './Thermometer.jsx';

/**
 * Main component that handles routes and starts the pusher listener.
 * Update the pusher data in the state when new pusher event is recieved. 
 */

class App extends React.Component {
	
  constructor(props) {
    super(props);
		this.menu = ["Thermometer", "H2"];
		this.state = {
			pusherTemperature: {"current": 0, "target":0, "status": false}
		}
	}
	
	componentDidMount(){
		const pusher = new Pusher('db2f8c1396d2c5949986', {

      cluster: 'eu',

      encrypted: true

    });

    const channel = pusher.subscribe('termostat');

    channel.bind('tempChange', data => {
			this.setState({pusherTemperature: data});
		});
	}

  render() {
    return (
		<BrowserRouter>
			<div>
				<Header menu={this.menu}/>
				<Grid bsClass="container">
					<Switch>
						<Route path="/" exact render={() => <Thermometer pusherData={this.state.pusherTemperature}/>}/>
						<Route path="/H2" component={ManageTemperature}/>
						<Redirect to="/" />
					</Switch>
				</Grid>
			</div>
		</BrowserRouter>
    );
  }
}


export default App;