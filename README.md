# GGEN

GGEN (Graph-Generator Library) is a JavaScript library developed particularly for GUI, where it is necessary to show operational flows.
It is based on the Van Der Ploeg algorithm for drawing tidy trees () and relies on D3.js;

## Installation

To give it a try, include in your html page:
* D3.js version 5, first.
* graph-gen.css
* (optionally) fontawesome
* the actual library: graph-gen.js

Example:

```html
	<script src="https://d3js.org/d3.v5.min.js"></script>
    <link rel="stylesheet" href="graph-gen.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <script src="graph-gen.js"></script>
```

You can also try the test provided, by cloning the project and opening in your browser the "test.html" in the "test" folder.

## Usage

To use the library in your application.

1 set some initial onfiguration
2 call the initCanvas() method passing to it a selctor for the HTML element where you want the graph to be rendered
3 start using the function to add/remove nodes and arcs

```javascript
    ggen.initCanvas('#canvas')
    n0 = ggen.addNode(type="start", title="+");
```
Now to connect some nodes to node n0:

```javascript
    n1 = ggen.addNode(type="block", title=" ", parent=n0);
    n2 = ggen.addNode(type="block", title=" ", parent=n0);
```
The arcs connecting the parent (n0) to the children (n1, n2) will be automatically added.

## API

*
*
*
*
*
*

## License