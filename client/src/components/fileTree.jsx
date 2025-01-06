const FileTreeNode = ({filename, nodes})=>{
    const isDir = !!nodes;
    return (
        <div style = {{marginLeft: 10}}>
            <p className={isDir?"":"file-node"}>{filename}</p>
            {/* {console.log(nodes)} */}
            {nodes && <ul>
                {Object.keys(nodes).map(child => (
                    <li key = {child}>
                        <FileTreeNode filename={child} nodes = {nodes[child]} />
                    </li>
                ))}
                </ul>}
        </div>
    )
}

const FileTree = ({tree}) => {
    return (
        <div>
            <FileTreeNode filename="/" nodes={tree} />
        </div>
    )
}

export default FileTree
