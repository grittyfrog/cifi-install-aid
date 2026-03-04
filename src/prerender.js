import init from 'uhtml/init';
import { Document } from 'uhtml/dom';
import { App } from './components/App.js';

const doc = new Document();
const { render, html, svg } = init(doc);

render(doc.body, App(html, svg, { generators: 8 }));

export function getPrerenderedHTML() {
  return doc.body.innerHTML;
}
