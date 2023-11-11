# Binary Search Tree Implementation

## Introduction

This repository provides a simple implementation of a Binary Search Tree (BST) in JavaScript. A BST is a tree data structure where each node has at most two children, referred to as the left and right child. The left child is always less than the parent node, and the right child is always greater. The tree starts with a root node, and nodes with no children are called leaf nodes.

This implementation focuses on balanced binary search trees, where the heights of the left and right subtrees of every node differ by at most one. A balanced tree enables fast operations for lookup, insertion, and deletion.

## Components

### 1. `Node` Class/Factory

A class/factory representing a node in the BST. Each node has attributes for the stored data, left child, and right child.

### 2. `Tree` Class/Factory

A class/factory representing the binary search tree. It accepts an array of data during initialization and builds a balanced BST. The `Tree` class includes functions for insertion, deletion, traversal, and checking balance.

### 3. `buildTree` Function

A function that takes an array of data, removes duplicates, sorts the array, and builds a balanced binary search tree. It returns the level-0 root node.

### 4. Insert and Delete Functions

Functions for inserting and deleting nodes in the tree. Special cases for deletion, such as nodes with children, are handled.

### 5. `find` Function

A function that accepts a value and returns the node with the given value.

### 6. Traversal Functions

Functions for traversing the tree in various orders: `levelOrder`, `inOrder`, `preOrder`, and `postOrder`. These functions accept an optional callback for performing operations on each node during traversal.

### 7. `height` Function

A function that accepts a node and returns its height, defined as the number of edges in the longest path from the node to a leaf node.

### 8. `depth` Function

A function that accepts a node and returns its depth, defined as the number of edges in the path from the node to the tree's root node.

### 9. `isBalanced` Function

A function that checks if the tree is balanced. A balanced tree ensures the difference between heights of left and right subtrees for every node is not more than 1.

### 10. `rebalance` Function

A function that rebalances an unbalanced tree using a traversal method to provide a new array to the `buildTree` function.

## Usage

```javascript
// Function to generate an array of random numbers
function generateRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Create a binary search tree from an array of random numbers < 100
const randomNumbers = generateRandomArray(10, 100);
const bst = new Tree(randomNumbers);

console.log("Original Tree:");
bst.prettyPrint();
console.log("Is the tree balanced? " + bst.isBalanced());

console.log("\nPrint Elements in Level Order:");
console.log(bst.levelOrder());

console.log("\nPrint Elements in Preorder:");
bst.preorder(bst.root);

console.log("\nPrint Elements in Postorder:");
bst.postorder(bst.root);

console.log("\nPrint Elements in Inorder:");
bst.inorder(bst.root);

// Unbalance the tree by adding several numbers > 100
bst.insert(120);
bst.insert(130);
bst.insert(110);

console.log("\n\nUnbalanced Tree:");
bst.prettyPrint();
console.log("Is the tree balanced? " + bst.isBalanced());

// Balance the tree
bst.rebalance();

console.log("\nRebalanced Tree:");
bst.prettyPrint();
console.log("Is the tree balanced? " + bst.isBalanced());

console.log("\nPrint Elements in Level Order:");
console.log(bst.levelOrder());

console.log("\nPrint Elements in Preorder:");
bst.preorder(bst.root);

console.log("\nPrint Elements in Postorder:");
bst.postorder(bst.root);

console.log("\nPrint Elements in Inorder:");
bst.inorder(bst.root);
```

Feel free to use and modify this implementation to suit your needs.
