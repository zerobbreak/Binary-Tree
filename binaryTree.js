class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildlist(array);
  }

  buildlist(array) {
    if (!array || array.length === 0) {
      return null;
    }

    const root = new Node(array[0]);
    const queue = [root];

    let index = 1;
    while (index < array.length) {
      const currentNode = queue.shift();

      const leftData = array[index++];
      if (leftData !== undefined) {
        currentNode.left = new Node(leftData);
        queue.push(currentNode.left);
      }

      const rightData = array[index++];
      if (rightData !== undefined) {
        currentNode.right = new Node(rightData);
        queue.push(currentNode.right);
      }
    }

    return root;
  }

  prettyPrint() {
    this.printlist(this.root, 0, "ROOT");
  }

  printlist(node, level, direction) {
    if (node !== null) {
      this.printlist(node.right, level + 1, "RIGHT");

      let spaces = "";
      let branches = "";

      for (let i = 0; i < level; i++) {
        spaces += "       ";
      }

      if (level > 0) {
        const branchSymbol = direction === "LEFT" ? "┌── " : "└── ";
        branches = spaces.substring(0, spaces.length - 1) + branchSymbol;
      }

      console.log(branches + node.data);

      this.printlist(node.left, level + 1, "LEFT");
    }
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  delete(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      //deleting node with one child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      //deleting node with two children
      const aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  find(value, node = this.root) {
    if (node === null) {
      return null; //Node not found
    }

    if (value === node.data) {
      return node; //Node with the given value found
    } else if (value < node.data) {
      return this.find(value, node.left); //Search in the left sublist
    } else {
      return this.find(value, node.right); //Search in the right sublist
    }
  }

  levelOrder(callback) {
    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.data);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  levelOrderRecursion(callback, queue = [this.root], result = []) {
    if (queue.length === 0) {
      return result;
    }

    const currentNode = queue.shift();
    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    if (currentNode.left) {
      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    return this.levelOrder(callback, queue, result);
  }

  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  preorder(node) {
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  postorder(node) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  height(node) {
    if (node === null) {
      return -1; //Height of an empty list is -1
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(root) {
    if (root === null) {
      return -1; // Depth of an empty tree is -1
    }

    const leftDepth = this.depth(root.left);
    const rightDepth = this.depth(root.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  isBalanced() {
    return this.checkBalanced(this.root) !== -1;
  }

  checkBalanced(node) {
    if (node === null) {
      return 0; // Height of an empty tree is 0
    }

    const leftHeight = this.checkBalanced(node.left);
    const rightHeight = this.checkBalanced(node.right);

    if (leftHeight === -1 || rightHeight === -1) {
      return -1; // Subtree is not balanced
    }

    const heightDifference = Math.abs(leftHeight - rightHeight);

    if (heightDifference > 1) {
      return -1; // Subtree is not balanced
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    const sortArray = this.inOrderTraversal();
    this.root = this.buildlist(sortArray);
  }

  inOrderTraversal(node = this.root, result = []) {
    if (node !== null) {
      this.inOrderTraversal(node.left, result);
      result.push(node.data);
      this.inOrderTraversal(node.right, result);
    }

    return result;
  }
}

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
