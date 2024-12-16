import '@testing-library/jest-dom/extend-expect';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
