const FileTreeNode = ({filename, nodes, onSelect, path})=>{
    const isDir = !!nodes;
    return (
        <div onClick = {(e)=>{
            e.stopPropagation();
            if(isDir) return;
            onSelect(path);

        }} style = {{marginLeft: 10}}>
            <p className={isDir?"":"file-node"}>{filename}</p>
            {/* {console.log(nodes)} */}
            {nodes && <ul>
                {Object.keys(nodes).map(child => (
                    <li key = {child}>
                        <FileTreeNode filename={child} path={path + "/" + child} nodes = {nodes[child]} onSelect={onSelect}/>
                    </li>
                ))}
                </ul>}
        </div>
    )
}

const FileTree = ({tree, onSelect}) => {
    return (
        <div>
            <FileTreeNode filename="/" path = "" nodes={tree} onSelect={onSelect}/>
        </div>
    )
}

export default FileTree
