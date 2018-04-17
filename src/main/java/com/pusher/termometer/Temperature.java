package com.pusher.termometer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Create an entity that automatically create a new table if it doesnt already exist
 * ID is auto incremented.
 * Getter functions for all properties and setter functions for editable properties.
 * Print functions for information about the object.
 */

@Entity 
@Table(name = "temperature")
public class Temperature {
	
	@Id
	@GeneratedValue
	private Long id;
	private float currentTemp;
	private float targetTemp;
	private boolean status;
	private long timestamp;
	  
	public Temperature() {
		super();
	}
	public Temperature(float current, float target, boolean status) {
		this.currentTemp = current;
		this.targetTemp = target;
		this.status = status;
		this.timestamp = System.currentTimeMillis() / 1000L;
	}
	
	public Long getId() {
		return id;
	}      
	public float getCurrentTemp() {
		return currentTemp;
	}
	public void setCurrentTemp(float current) {
		this.currentTemp = current;
	}
	public float getTargetTemp() {
		return targetTemp;
	}
	public void setTargetTemp(float target) {
		this.targetTemp = target;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public long getTimestamp() {
		return timestamp;
	}
 
	public String printCurrent(){
		return "The current temperature is: " + this.currentTemp;
	}

	public String printTarget(){
		return "The target temperature is: " + this.targetTemp;
	}

	public String printStatus(){
		return "The device is currently: " + (this.status ? "On" : "Off");
	}
}
