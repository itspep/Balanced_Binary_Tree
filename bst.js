// Node class - represents a single node in the tree
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // Tree class - represents the entire BST
  export class Tree {
    constructor(array) {
      this.root = this.buildTree([...new Set(array.sort((a, b) => a - b))]);
    }
  
    // Recursively builds a balanced BST from sorted array
    buildTree(array) {
      if (array.length === 0) return null;
  
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
  
      return root;
    }
  
    // Helper function for printing tree structure
    prettyPrint(node = this.root, prefix = '', isLeft = true) {
      if (node === null) return;
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    }
  
    // Insert a value into the BST
    insert(value, node = this.root) {
      if (node === null) return new Node(value);
      if (value === node.data) return node; // ignore duplicates
  
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else {
        node.right = this.insert(value, node.right);
      }
  
      return node;
    }
  
    // Delete a value from the BST
    deleteItem(value, node = this.root) {
      if (node === null) return node;
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        // Node found
        if (!node.left && !node.right) return null; // leaf node
        if (!node.left) return node.right; // one child (right)
        if (!node.right) return node.left; // one child (left)
  
        // Two children: find inorder successor
        const successor = this.findMin(node.right);
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right);
      }
  
      return node;
    }
  
    // Find node with minimum value
    findMin(node) {
      while (node.left !== null) node = node.left;
      return node;
    }
  
    // Find a node by value
    find(value, node = this.root) {
      if (node === null || node.data === value) return node;
      return value < node.data
        ? this.find(value, node.left)
        : this.find(value, node.right);
    }
  
    // Level order traversal (BFS)
    levelOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error('A callback function is required');
      }
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    // In-order traversal
    inOrderForEach(callback, node = this.root) {
      if (typeof callback !== 'function') {
        throw new Error('A callback function is required');
      }
      if (node === null) return;
      this.inOrderForEach(callback, node.left);
      callback(node);
      this.inOrderForEach(callback, node.right);
    }
  
    // Pre-order traversal
    preOrderForEach(callback, node = this.root) {
      if (typeof callback !== 'function') {
        throw new Error('A callback function is required');
      }
      if (node === null) return;
      callback(node);
      this.preOrderForEach(callback, node.left);
      this.preOrderForEach(callback, node.right);
    }
  
    // Post-order traversal
    postOrderForEach(callback, node = this.root) {
      if (typeof callback !== 'function') {
        throw new Error('A callback function is required');
      }
      if (node === null) return;
      this.postOrderForEach(callback, node.left);
      this.postOrderForEach(callback, node.right);
      callback(node);
    }
  
    // Height of a node
    height(value, node = this.find(value)) {
      if (node === null) return null;
      if (node.left === null && node.right === null) return 0;
      const leftHeight = node.left ? this.height(node.left.data, node.left) : 0;
      const rightHeight = node.right ? this.height(node.right.data, node.right) : 0;
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    // Depth of a node
    depth(value, node = this.root, currentDepth = 0) {
      if (node === null) return null;
      if (node.data === value) return currentDepth;
      return value < node.data
        ? this.depth(value, node.left, currentDepth + 1)
        : this.depth(value, node.right, currentDepth + 1);
    }
  
    // Check if tree is balanced
    isBalanced(node = this.root) {
      if (node === null) return true;
  
      const leftHeight = node.left ? this.height(node.left.data, node.left) : 0;
      const rightHeight = node.right ? this.height(node.right.data, node.right) : 0;
  
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  
    // Rebalance the tree
    rebalance() {
      const nodes = [];
      this.inOrderForEach(node => nodes.push(node.data));
      this.root = this.buildTree(nodes);
    }
  }
  