package com.pusher.termometer;

import com.pusher.client.Pusher;
import com.pusher.client.PusherOptions;
import com.pusher.client.channel.ChannelEventListener;
import com.pusher.client.connection.ConnectionState;
import com.pusher.client.connection.ConnectionStateChange;
import com.pusher.constants.PusherConstants;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.pusher.client.connection.ConnectionEventListener;
import org.json.simple.parser.ParseException;

@Component
public class ApplicationReady 
implements ApplicationListener<ApplicationReadyEvent> {


    @Autowired
	TemperatureRepository repository;

	/**
	 * Connect to pusher and listen for events once the application is ready.
	 * Create a new Temperature object when a new event is recieved and add it to the embeded database
	 * Print temperature information to the console.
	 */

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
    
        PusherOptions options = new PusherOptions().setCluster(PusherConstants.PUSHER_APP_CLUSTER);
		Pusher pusher = new Pusher(PusherConstants.PUSHER_APP_KEY, options);
		
		pusher.connect(new ConnectionEventListener() {
			@Override
			public void onConnectionStateChange(ConnectionStateChange change) {
				System.out.println("State changed to " + change.getCurrentState() +
								   " from " + change.getPreviousState());
			}

			@Override
			public void onError(String message, String code, Exception e) {
				System.out.println("There was a problem connecting!");
			}
		}, ConnectionState.ALL);

		
        pusher.subscribe(PusherConstants.CHANNEL_NAME, new ChannelEventListener() {
            @Override
            public void onSubscriptionSucceeded(String channelName) {
				System.out.println("Subbed to: " + channelName);
            }
        
            @Override
            public void onEvent(String channelName, String eventName, String data) {
                JSONParser jsonParser = new JSONParser();
				try{
					Object obj = jsonParser.parse(data);
					JSONObject elem = (JSONObject)obj;
					
					float currentTemp = ((Number)elem.get("current")).floatValue();
					float targetTemp = ((Number)elem.get("target")).floatValue();
					boolean status = (boolean)elem.get("status");
					
					Temperature newTemperature = new Temperature(currentTemp,targetTemp,status);
                    
                    System.out.println(newTemperature.printCurrent());
                    System.out.println(newTemperature.printTarget());
                    System.out.println(newTemperature.printStatus());

					repository.save(newTemperature);
				}
				catch(ParseException e){
					System.out.println(e);
				}
            }
        }, "tempChange");
        
        return;
    }
 
} // class