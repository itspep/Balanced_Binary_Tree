import { Tree } from './bst.js';

// Helper to generate random array of numbers < 100
function randomArray(size = 10) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

//Create tree
const tree = new Tree(randomArray(10));

console.log("Initial Balanced Tree:");
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());

//Print traversals
console.log("\nLevel Order:");
tree.levelOrderForEach(node => console.log(node.data));

console.log("\nPre Order:");
tree.preOrderForEach(node => console.log(node.data));

console.log("\nPost Order:");
tree.postOrderForEach(node => console.log(node.data));

console.log("\nIn Order:");
tree.inOrderForEach(node => console.log(node.data));

//Unbalance the tree by adding values > 100
tree.insert(120);
tree.insert(150);
tree.insert(200);

console.log("\nUnbalanced Tree:");
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());

//Rebalance the tree
tree.rebalance();

console.log("\nRebalanced Tree:");
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());

//Final traversals
console.log("\nLevel Order After Rebalancing:");
tree.levelOrderForEach(node => console.log(node.data));
