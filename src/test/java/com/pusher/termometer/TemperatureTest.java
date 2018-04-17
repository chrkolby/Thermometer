package com.pusher.termometer;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
public class TemperatureTest {

    private Temperature testTemperature;
    private final float currentTemp = 15;
    private final float targetTemp = 20;
    private final boolean deviceStatus = true;

    @Before
    public void createObject(){
        testTemperature = new Temperature(currentTemp, targetTemp, deviceStatus);
    }

    @Test
    public void testGetCurrentTemperature(){
        assertEquals(currentTemp,testTemperature.getCurrentTemp(), 0.01);
    }

    @Test
    public void testGetTargetTemperature(){
        assertEquals(targetTemp,testTemperature.getTargetTemp(), 0.01);
    }

    @Test
    public void testGetTargetStatus(){
        assertEquals(deviceStatus,testTemperature.isStatus());
    }

    @Test
    public void testPrintCurrent(){
		assertEquals("The current temperature is: " + currentTemp, testTemperature.printCurrent());
	}

    @Test
	public void testPrintTarget(){
		assertEquals("The target temperature is: " + targetTemp, testTemperature.printTarget());
	}

    @Test
	public void testPrintStatus(){
		assertEquals("The device is currently: " + (deviceStatus ? "On" : "Off"), testTemperature.printStatus());
    }
    
    @Test
    public void testSetCurrentTemperature(){
        float newCurrentTemperature = 20;
        testTemperature.setCurrentTemp(newCurrentTemperature);
        assertEquals(newCurrentTemperature, testTemperature.getCurrentTemp(), 0.01);
    }
    @Test
    public void testSetTargetTemperature(){
        float newTargetTemperature = 15;
        testTemperature.setTargetTemp(newTargetTemperature);
        assertEquals(newTargetTemperature, testTemperature.getTargetTemp(), 0.01);
    }

    @Test
    public void testSetDeviceStatus(){
        boolean newDeviceStatus = false;
        testTemperature.setStatus(newDeviceStatus);
        assertEquals(newDeviceStatus, testTemperature.isStatus());
    }
}
    