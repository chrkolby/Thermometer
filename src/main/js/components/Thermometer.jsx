import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { FormatCell } from './TemperatureOverview.jsx';

/**
 * Use two bootstrap progress bars to simulate a thermometer.
 * The component takes in an object in form of:
 * {"current":int, "target": int, "status": boolean}
 */

export const Thermometer = ({pusherData}) => (
    <div>
        <ProgressBar min={-50} max={50} label={`Target: ${pusherData.target} degrees`} now={pusherData.target} />
        <ProgressBar min={-50} max={50} bsStyle={((pusherData.target != pusherData.current) ? "danger" : "success")} label={`Current: ${pusherData.current} degrees`} now={pusherData.current} />
        <StatusDisplay status={pusherData.status}/>
    </div>
)

/**
 * Display the current status of the device
 */

export const StatusDisplay = ({status}) => (
    <div>
        <h2 style={{color:(status) ? "red" : "#5cb85c"}}>The device is currently {FormatCell(status)}</h2>
    </div>
);