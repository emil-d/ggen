
//Wetherell and Shannon Algorithm 3
//Satisfies aesthetics while minimizing paper width (most of the time)
'use strict';

var FIRST_VISIT = 0;
var LEFT_VISIT = 1;
var RIGHT_VISIT = 3;
//max_height=100;

function WStreeLayout(root, max_height){ 

	//root is the first node
	//height is the number of branches between a node and the root
	// => max_height is the total depth of the tree
	
	//Variables required by algorithm
	var modifier  = new Array(max_height+1);
	var next_pos = new Array(max_height+1);
	var h;
	var place;
	var is_leaf;
	var modifier_sum=0;
	var i=0;
	var current;
	var flag;
	var counter=-1;
	
	for(i=0; i<=max_height; i++){
        modifier[i] = 0;
        next_pos[i] = 1;
     }

	//FIRST WALK (POST-ORDER TRAVERSAL)
	 
	current = root; 
	current.data.status = FIRST_VISIT;

	//Flag is to indicate when NIL has been reached i.e when parent=-1 //NOT USED
	 
	while(current != undefined){
		
		//console.log(current, current.data.status);
		//debugger;
		counter++;
		if(counter>100){
			console.log("somthing is broken");
			return;
		}

		//Iterative traversal through status markers
		switch(current.data.status){

			case FIRST_VISIT:
				//console.log(current, current.data.status,"first visit");

				//Move to LEFT section from node
				current.data.status = LEFT_VISIT;
				if(current.children[0] != undefined){
					current = current.children[0];
					current.data.status = FIRST_VISIT;
				}
				break;

			case LEFT_VISIT:

				//LEFT section visited, now visit RIGHT section
				//console.log(current, current.data.status,"left visit");
				current.data.status = RIGHT_VISIT;
				if(current.children[1]!=undefined){
					current = current.children[1];
					current.data.status = FIRST_VISIT;
				}
				break;

			case RIGHT_VISIT:

				//After RIGHT, two possibilities arise
				//We are on a leaf or an internal node
				//We need to adjust the place of this node accordingly
				//console.log(current, current.data.status,"right visit");
				h = current.data.height;
				is_leaf = current.children[0]==undefined && current.children[1]==undefined;//current.children.length==0;

				//Use algorithm 1's concept if a leaf
				
				if(is_leaf){
					
					place = next_pos[h];

				//If only one child, keep child below parent
                }else if(current.children[0]==undefined){
					
					place = current.children[1].x-1; //tree[current.children[0]].x;
					

				}else if(current.children[1]==undefined){
					

					place = current.children[0].x+1;
				}else{
					
					//If both children, take average of positions and assign
					place = (current.children[0].x + current.children[1].x )/2;
						//(tree[current->children[0]].x + tree[current->children[1]].x)/2;
                }

				//Compute modifier for second traversal
				
				modifier[h] = Math.max(modifier[h], next_pos[h] - place);

				if(is_leaf){
					
					current.x = place;
				}else{
					current.x = place + modifier[h];
				}
				current.subtree.mod = modifier[h];

				//Update next_pos for current height
				next_pos[h] = current.x + 2;

				//Go up level and visit parent
				
				if(current.parent!=null && current.parent.length>0){
					current = current.parent[0];
				
				}else{
					//If parent==null we are at the root
					current = undefined;
				}
				break;
		}
		
	}

	console.log("FIRST WALK DONE");
	//DEBUG
	console.log("root: ", root.x, " - ", root.y);
	console.log("child 0: ", root.children[0].x, " - ", root.children[0].y);
	console.log("child 1: ", root.children[1].x, " - ", root.children[1].y);

	//Set traversal variables to initial values for second traversal
	current = root;	//ggen.nodes[0];//&tree[0];
	current.data.status = FIRST_VISIT;
	modifier_sum = 0;
	flag = true;

	while(current!=undefined){

		//POST-ORDER traversal
		switch(current.data.status){

			case FIRST_VISIT:
				//Pass down modifier_sum down the tree
				//Set x,y coordinates for current node
				current.x = current.x + modifier_sum;
				modifier_sum = modifier_sum + current.subtree.mod;
				current.y = 2*current.data.height + 1;
				//Move to left section of tree
				current.data.status = LEFT_VISIT;
				if(current.children[0]!=undefined){

					current = current.children[0];
					current.data.status = FIRST_VISIT;
				}
				break;

			case LEFT_VISIT:
				//Same as previous traversal, move from left to right
				current.data.status = RIGHT_VISIT;
				if(current.children[1]!=undefined){

					current = current.children[1];
					current.data.status = FIRST_VISIT;
				}
				break;
			case RIGHT_VISIT:
				//Traverse upwards
				//Do not pass up the same modifier sum up the tree
				modifier_sum = modifier_sum - current.subtree.mod;
				
				if(current.parent!=null && current.parent.length>0)
					current = current.parent[0];
				else
					current =undefined;
				break;
		}
	}
	console.log("SECOND WALK DONE");
}

