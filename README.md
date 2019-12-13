# GGEN

GGEN (Graph-Generator Library) is a JavaScript library developed particularly for GUI, where it is necessary to show operational flows.
It is based on the algorthm proposed by Van Der Ploeg for drawing tidy trees [1] and relies on D3.js;

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
The library is also capable to draw binary trees using Reingold and Tilford algorithm [2], and Wheterell and Shannon algorithm [3].

## Usage

To use the library in your application.

1. set some initial onfiguration 
2. call the initCanvas() method passing to it a selctor for the HTML element where you want the graph to be rendered 
3. start using the function to add/remove nodes and arcs 

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

### Configuration

* removeNode( )

* removeArc( )

* connectNodeToEnd( )

* setCustomFunction( )

* setBinary

* setLinearEdges

* setCircleBlocks

* setDrag

* setZoom

* setNodeSpacing

* setMultipleNodesConnectedToEnd

* setNodeSize

* setTrimText

### Init (mandatory)

* initCanvas( selector ) 
	The function inserts the SVG canvas where the graph will be rendered.
	With _selector_ is possible to choose an html element as canvas, otherwise by default the svg canvas will be appended to the _body_.

### Graph Drawing Function

* addNode(type= "block", title, parent, nodeclass)
	- type is the kind of node (can be _start_, _end_ or _block_)
	- title is the name of the node
	- parent is the Object associated with the parent node
	- nodeclass is an object {nodeclass:"", arcclass:""} where nodeclass is the CSS class to be assigned to the node, in addition to the _blk+nodeid_ class assigned by default. While arcclass is to be assigned to the arc connecting _parent_ to this node.

* addArc( source, destination, arcclass)
	- source and destination are the object corresponding to source and target node
	- arcclass is the CSS class to be assigned for styling the arc

### Utilities

* currentSelectedNode
* getAvailableOperators
* clearGraph
* getNextNodeId
* checkEndPresence

### Load/store JSON
* storeGraphJSON; 
* loadGraphJSON; 
* getJsonStrGraph;

### Functional Zoom

* zoomIn
* zoomOut

## Bibliograpy

[1] Ploeg, Atze. (2014). Drawing Non-Layered Tidy Trees In Linear Time. Software: Practice and Experience. 44. 10.1002/spe.2213.  
[2] Reingold, E.M., & Tilford, J.S. (1981). Tidier Drawings of Trees. IEEE Transactions on Software Engineering, SE-7, 223-228.  
[3] Wetherell, C., & Shannon, A. (1979). Tidy Drawings of Trees. IEEE Transactions on Software Engineering, SE-5, 514-520.  

## License
This project is licensed under the terms of the GNU General Public License v3.0
