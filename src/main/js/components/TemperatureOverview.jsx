import React from 'react';
import Request from 'request';
import { Table } from 'react-bootstrap';

import { Pager } from './Pager.jsx';

/**
 * Returns an array of pages to display
 * If total pages is less than 5 it returns an array of numbers 1 to the total pages
 * If more than 5 it returns an array of numbers around the current page
 */

export const CalculatePages = function(total, current){

	var startPage, endPage;

    if (total <= 5) {
        startPage = 1;
		endPage = total;
		
    } else {

        if (current <= 3) {
        	startPage = 1;
			endPage = 5;
			
        } else if (current + 2 >= total) {

            startPage = total - 4;
			endPage = total;
			
        } else {

             startPage = current - 2;
			 endPage = current + 2;
			 
         }
	}
		
	var pages = [];

	for(var i = startPage; i <= endPage; i++){
		pages.push(i);
	}

	return pages;
}

/**
 * Make a call to the input URL and returns a promise.
 */

export const APICall = function(apicall){

	return new Promise(function(resolve, reject){
		Request(apicall, function(error, response, body){
			if(error) return reject(error);
			try{
				resolve(body);
			}
			catch(e){
				reject(e);
			}
		});
	});
}

/**
 * Format a cell to display on or off if the arg is a boolean.
 */

export const FormatCell = function(cell){
	if(typeof(cell) == "boolean"){
		if(cell){
			return "On";
		}
		else{
			return "Off";
		}
	}
	else{
		return cell;
	}
}

/**
 * Controller component for the temperature display table
 * Update the state with data returned from a call to the API.
 */

export class ManageTemperature extends React.Component{

	constructor(props){
		super(props);
		this.baseUrl = "http://localhost:8080/api/temperature";
		this.columns = ["ID", "Current Temperature", "Target Temperature", "Device Status", "Time Stamp"];
		this.fetchData = this.fetchData.bind(this);
		this.page = 0;
		this.totalPages = 1;
		this.pages = [];
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		this.fetchData(this.page);
	}

	fetchData(page){
		if(page >= 0 && page < this.totalPages){
			let callUrl = this.baseUrl + "?page=" + page;
			APICall(callUrl).then(function(val){
				let JSONBody = JSON.parse(val);
				this.pages = CalculatePages(JSONBody.totalPages, JSONBody.number);
				this.page = JSONBody.number;
				this.totalPages = JSONBody.totalPages;
				this.setState({data: JSONBody.content});
			}.bind(this));
		}
	}

	render(){
		return (
			<div style={{textAlign:"center"}}>
				<Pager onClick={this.fetchData} currentPage={this.page} pages={this.pages}/>
				<PagedTable data={this.state.data} columns={this.columns}/>
			</div>
		)
	}
}

/**
 * Generic table with inputted data
 * Takes in an array of objects with data and an array of column titles.
 */

export const PagedTable = ({data, columns}) => {

	let rows = data.map(rowData => <TableContent key={rowData.id} data={rowData}/>);

	let tableHeaders = columns.map(column => <th key={column}>{column}</th>);
	
	return (
		<Table striped bordered hover>
			<tbody>
				<tr>
					{tableHeaders}
				</tr>
				{rows}
			</tbody>
		</Table>
	)
}

/**
 * Table rows with data
 * Takes in an object of data.
 */

export const TableContent = ({data}) => {
	let i = 0;
	let row = Object.values(data).map(cell => <td key={i++}>{FormatCell(cell)}</td>);

	return(
		<tr>
			{row}
		</tr>
	)
}