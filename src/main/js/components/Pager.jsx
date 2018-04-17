import React from 'react';
import {Pagination, Prev, Next, Item} from 'react-bootstrap';

/**
 * Create a pagination menu for a table
 * Takes in an on click function to handle page change logic,
 * the currently displayed page, and an array of pages to display on the pagination.
 */

export const Pager = ({onClick, currentPage, pages}) => {

	let nextPage = currentPage + 1;
	let prevPage = currentPage - 1;
	let generatedPages = pages.map(page => <Pages key={page} currentPage={currentPage} page={page} onClick={onClick}/>);

	return(
		<Pagination>
			<Pagination.Prev onClick={onClick.bind(this,prevPage)}/>
			{generatedPages}
			<Pagination.Next onClick={onClick.bind(this,nextPage)}/>
		</Pagination>
	)
};

/**
 * Creates the numbered page buttons used in the pagination menu.
 */

export const Pages = ({currentPage, page, onClick}) =>(
	(page == (currentPage+1) ? <Pagination.Item onClick={onClick.bind(this,(page-1))} active>{page}</Pagination.Item>: <Pagination.Item onClick={onClick.bind(this,(page-1))}>{page}</Pagination.Item>)
);