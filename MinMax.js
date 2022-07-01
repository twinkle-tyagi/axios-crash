function min(root)
{
    if(root == null)
    {
        return null;
    }

    while(root.left !== null)
    {
        root = root.left;
    }
    return root.data;
}

function max(root)
{
    if(root == null)
    {
        return null;
    }

    while(root.right !== null)
    {
        root = root.right;
    }
    return root.data;
}