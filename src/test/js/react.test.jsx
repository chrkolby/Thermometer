import { FormatCell, CalculatePages, APICall, ManageTemperature, PagedTable, TableContent } from '../../main/js/components/TemperatureOverview';
import { Pages, Pager } from '../../main/js/components/Pager'; 
import { Header, MenuItem } from '../../main/js/components/Header'; 
import { StatusDisplay, Thermometer } from '../../main/js/components/Thermometer';
import Logo from '../../main/js/components/Logo.jsx';
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const testData = {"current": 20, "target": 15, "status" : false};

test("Table with data is rendered properly", () => {
    let rendered = renderer.create(
        <ManageTemperature/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Format the table cell properly", () => {
    expect(FormatCell("Hello World")).toEqual("Hello World");
    expect(FormatCell(true)).toEqual("On");
});

test("Find the right page range from current page and total pages", () => {
    expect(CalculatePages(9, 5)).toEqual([3,4,5,6,7]);
});

test("Table cells are rendered properly", () => {
    let rendered = renderer.create(
        <TableContent data={testData}/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Table is rendered properly", () => {
    let data = [testData,{"current": 15, "target": 20, "status" : true}];
    let headers = ["Current", "Target", "Status"];
    let rendered = renderer.create(
        <PagedTable data={data} columns={headers}/>
    );
    
    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Thermometer is rendered properly", () => {
    let rendered = renderer.create(
        <Thermometer pusherData={testData}/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Status is displayed correctly", () => {
    let wrapper = Enzyme.mount(
        <StatusDisplay status={false}/>
    );

    expect(wrapper.contains("Off")).toBeTruthy();
});

test("Logo is rendered properly", () =>{
    let rendered = renderer.create(
        <Logo/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Header is rendering properly", () => {
    let rendered = renderer.create(
        <MemoryRouter>
            <Header menu={["Thermometer", "MenuLink"]}/>
        </MemoryRouter>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Links in header",() =>{
    let wrapper = Enzyme.mount(
        <MemoryRouter>
          <MenuItem item={"MenuItem"}/>
        </MemoryRouter>
    );

    let link = wrapper.find("a");

    expect(link.prop('href')).toBe("MenuItem");

});

test("Pager functionality", () => {
    let pageChange = jest.fn();
    let pages = [3,4,5,6,7];
    let wrapper = Enzyme.mount(
        <Pager onClick={pageChange} currentPage={5} pages={pages} />
    );

    let links = wrapper.find("a");

    links.forEach((node) => {
        node.simulate("click");
    });

    expect(pageChange).toHaveBeenCalledTimes(6);

    let rendered = renderer.create(
        <Pager onClick={pageChange} currentPage={5} pages={pages} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});

test("Pages functionality", () => {
    let pageChange = jest.fn();
    let wrapper = Enzyme.mount(
        <Pages currentPage={3} page={3} onClick={pageChange}/>
    );

    let elem = wrapper.find("a");

    elem.simulate("click");

    expect(pageChange).toHaveBeenCalled();
    expect(elem.text()).toBe("3");
    expect(elem.hasClass("active")).toBeFalsy();

});