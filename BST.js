class node {
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST 
{
    constructor ()
    {
        this.root = null;
    }

    insert(data)
    {
        var newNode = new node(data);
        
        if(this.root == null)
        {
            this.root = newNode;
        }
        else{
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode)
    {
        if(newNode.data < node.data)
        {
            if(node.left != null)
            {
                this.insertNode(node.left, newNode);
            }
            else
            {
                node.left = newNode;
            }
        }
        else{
            if(node.right != null)
            {
                this.insertNode(node.right, newNode);
            }
            else{
                node.right = newNode;
            }
        }
    }

    search(root, data)
    {
        if(root == null)
        {
            return null;
        }

        if(root.data == data)
        {
            return data;
        }
        else if(data < root.data)
        {
            this.search(root.left, data);
        }
        else if( data > root.data)
        {
            this.search(root.right, data);
        }
    }
}