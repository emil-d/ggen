
//Reingold and Tilford Algorithm for drawing tidy trees
// two procedures: SETUP and PETRIFY

'use strict';

function Extreme(addr, off,lev) {
    this.addr = addr;   //pointer to node
    this.off = off;       //offset from root of subtree
    this.lev = lev;       //tree level
 }

function RTtreeLayout(root, centerpos){

    var rmost = new Extreme(null,0,0);
    var lmost = new Extreme(null,0,0);
    
    RTsetup(root,0,rmost, lmost);

    var minx = RTpetrify(root,centerpos,0);

    console.log("finish RT algorithm", root);
    return minx;

}

function RTsetup(
            T,              //root of subtree
            level,          //current overall level
            rmost,lmost     //extremes descendant
        ){
    //assign relative positioning to all nodes in the tree pointed by T
    var L, R;
    var lr = rmost;//new Extreme(null,0,0);
    var ll = lmost;//new Extreme(null,0,0);
    var rr = rmost;//new Extreme(null,0,0);
    var rl = lmost;//new Extreme(null,0,0);;
    var cursep, rootsep, loffsum, roffsum;
    var minsep = 1;

    //debugger;        
    if( T==null || T==undefined){
        if(rmost==null) debugger;
       rmost.lev=-1;
       lmost.lev=-1; 
    }else{
        T.y=level*2;
        //follow contour of left subtree
        var L = T.children[0];
        //follow contour of right subtree
        var R = T.children[1];
        //position subtrees recursively
        RTsetup(L,level+1,lr,ll);
        RTsetup(R,level+1,rr,rl);

        if(R==undefined && L==undefined){
            //leaf (is both rightmost and leftmost node)
            rmost.addr = T;
            lmost.addr = T;
            rmost.lev = level;
            lmost.lev = level;
            rmost.off = 0;
            lmost.off = 0;
            T.data.offset = 0;
        }else{
            //T is not a leaf
            //set up for subtree pushing: place roots of subtrees min distance apart

            cursep = minsep;
            rootsep = minsep;
            loffsum = 0;
            roffsum = 0;

            //now consider each level in turn until one subtree is exhausted, 
            //pushing the subtrees apart when necessary.

            while(L!=null && L!=undefined && R!=null && R!=undefined){
                if(cursep < minsep){    //push
                    rootsep = rootsep + (minsep - cursep);
                    cursep = minsep;
                }
                //advance L and R
                if(L.children[1]!=undefined){
                    loffsum = loffsum + L.data.offset;
                    cursep = cursep - L.data.offset;
                    L = L.children[1];
                }else{
                    loffsum = loffsum - L.data.offset;
                    cursep = cursep + L.data.offset;
                    L = L.children[0];                  
                }
                if(R.children[0]!=undefined){
                    roffsum = roffsum - R.data.offset;
                    cursep = cursep - R.data.offset;
                    R = R.children[0];
                }else{
                    roffsum = roffsum + R.data.offset;
                    cursep = cursep + R.data.offset;
                    R = R.children[1];                  
                }
            } //end while
            
            //set the offset in node T and include it in accumulated offset for R and L
            T.data.offset = (rootsep+1)/2;
            loffsum = loffsum - T.data.offset;
            roffsum = roffsum + T.data.offset;

            //update extreme descendant information
            if(rl.lev > ll.lev || T.children[0]==undefined){
                lmost = rl;
                lmost.off = lmost.off + T.data.offset;
            }else{
                lmost = ll;
                lmost.off = lmost.off - T.data.offset;
            }
            if(lr.lev>rr.lev || T.children[1]==undefined){
                rmost = lr;
                rmost.off = rmost.off - T.data.offset;
            }else{
                rmost = rr;
                rmost.off = rmost.off + T.data.offset;
            }

            //if subtrees of T were of uneven heights, check to see if threading is necessary
            //at most one thread needs to be inserted

            if(L!=undefined && L!=T.children[0]){
                if(rr.addr == null) debugger;
                rr.addr.data.thread = true;
                rr.addr.data.offset = Math.abs((rr.off - T.data.offset)-loffsum);
                if(loffsum - T.data.offset <= rr.off)
                    rr.addr.children[0] = L;
                else
                    rr.addr.children[1] = L;
            }else if(R!=undefined && R!=T.children[1]){
                ll.addr.data.thread = true;
                ll.addr.data.offset = Math.abs((ll.off - T.data.offset)-roffsum);
                if(roffsum + T.data.offset >= ll.off)
                    ll.addr.children[1] = R;
                else
                    ll.addr.children[0] = R;                
            }

        }   //end of is not leaf

    }   //end of t!=null

}   //end procedure setup



function RTpetrify(T,xpos, minx){
    //this procedure performs a preorder traversal of the tree, converting
    // the relative offsets to absolute coordinates.

    if(xpos < minx)
        minx = xpos;

    if(T!=null && T!=undefined){
        T.x = xpos;
        if(T.data.thread){
            T.data.thread=false;
            //T.children[1] = undefined;
            //T.children[0] = undefined;
            T.children = [];
        }
        var mx1 = RTpetrify( T.children[0], xpos - T.data.offset, minx);
        var mx2 = RTpetrify( T.children[1], xpos + T.data.offset, minx);
        if(mx1 < mx2 && mx1 < minx)
            minx = mx1;
        if(mx2 < mx1 && mx2 < minx)
            minx = mx2;
    } //end if T!=null
    
    return minx;
}