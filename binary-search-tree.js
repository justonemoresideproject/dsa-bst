class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(this.root == null){
      this.root = new Node(val)
      return this;
    }
    const toVisistQueue = [this.root];
    while(toVisistQueue.length){
      const current = toVisistQueue.shift();
      if(current.val > val && current.left == null){
        current.left = new Node(val)
      } else if(current.val < val && current.right == null){
        current.right = new Node(val);
      } else if(current.val > val){
        toVisistQueue.push(current.left)
      } else if(current.val < val){
        toVisistQueue.push(current.right)
      } else {
        throw new Error('Cannot add duplicates')
      }
    }
    return this
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if(this.root == null){
      this.root = new Node(val)
      return this;
    }
  
    function recInsert(current=this.root){
      if(current == null || current == Error){
        return this;
      }
      console.log(this)
      if(current.val > val && current.left == null){
        current.left = new Node(val)
        recInsert(null)
      } else if(current.val < val && current.right == null){
        current.right = new Node(val);
        recInsert(null)
      } else if(current.val > val){
        recInsert(current.left)
      } else if(current.val < val){
        recInsert(current.right)
      } else {
        return new Error('Cannot add duplicates');
      }
    }

    return recInsert(this.root).bind(insertRecursively)
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while(current.val != null){
      if(current.val == val){
        return current;
      } else if(current.val > val){
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const toVisitStack = [this.root]

    function findHelper(){
      const current = toVisitStack.pop();
      if(current.val == val){
        return current;
      } else if(current.val > val){
        toVisitStack.push(current.left)
      } else {
        toVisitStack.push(current.right)
      }
    }

    return findHelper()
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node=this.root) {
    console.log(node.val)
    this.dfsPreOrder(node.left)
    this.dfsPreOrder(node.right)  
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node=this.root) {
    this.dfsInOrder(node.left)
    console.log(node.val)
    this.dfsInOrder(node.right)
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node=this.root) {
    this.dfsPostOrder(node.left)
    this.dfsPostOrder(node.right)
    console.log(node.val)    
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(node=this.root) {
    const toVisistQueue = [node];
    const returnArr = []

    while(toVisistQueue.length){
      const current = toVisistQueue.shift();

      if(current.left && current.right){
        toVisistQueue.push(current.left)
        toVisistQueue.push(current.right)
        returnArr.push(current.left)
        returnArr.push(current.right)
      } else if(current.left && !current.right){
        toVisistQueue.push(current.left)
        returnArr.push(current.left)
      } else if(!current.left && current.right) {
        toVisistQueue.push(current.right)
        returnArr.push(current.right)
      }
    }
    return returnArr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const arr = bfs();
    arr.sort();
    arr.remove(val);
    
  }

  removeAll(node=this.root) {
    // const arr = bfs();
    if(!node.left && !node.right){
      return null;
    } else if(node.right){
      node.val = this.removeAll(node.right)
    } else if(node.left){
      node.val = this.removeAll(node.left)
    }

    if(node.val == null){
      node.left = null;
      node.right = null;
    } 
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(node=this.root){
    function balancedHelper(node){
      if(node.left == null && node.right == null){
        return 1;
      } else if(node.left && node.right){
        let left = 1 + balancedHelper(node.left);
        let right = 1 + balancedHelper(node.right);
        return left + right;
      } else if(node.right && node.left == null){
        return 1 + balancedHelper(node.right);
      } else if(node.left && node.right == null){
        return 1 + balancedHelper(node.left);
      }
    }

    const right = balancedHelper(node.right);
    const left = balancedHelper(node.left);
    const answer = right == left ? true : false;
    return answer;
  }

  rebalance(arr=this.bfs) {
    arr.sort;
    this.removeAll();
    while(arr.length){
      const current = arr[Math.floor(arr.length / 2)];
      arr.splice((arr.indexOf(current), 1));
      this.insert(current);
    }  
    return this;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(node=this.root) {
    let highest = 0;
    let secondHighest = 0;
    const toVisistQueue = [node];

    while(toVisistQueue.length){
      const current = toVisistQueue.shift();

      if(current.val > highest){
        secondHighest = highest;
        highest = current.val;
      }

      if(current.left && current.right){
        toVisistQueue.push(current.left)
        toVisistQueue.push(current.right)
      } else if(current.left && !current.right){
        toVisistQueue.push(current.left)
      } else if(!current.left && current.right) {
        toVisistQueue.push(current.right)
      }
    }
    return secondHighest;
  }
}

// module.exports = BinarySearchTree;
