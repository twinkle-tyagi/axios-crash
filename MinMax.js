function min(root)
{
    while(root.left !== null)
    {
        root = root.left;
    }
    return root;
}

function max(root)
{
    while(root.right !== null)
    {
        root = root.right;
    }
    return root;
}