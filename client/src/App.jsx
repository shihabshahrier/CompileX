import { useState, useEffect } from 'react';
import './App.css'
import Terminal from './components/terminal'
import FileTree from './components/fileTree';


function App() {

  const [files, setFiles] = useState({});

  const getFileTree = async () => {
    const response = await fetch('http://localhost:9000/files');
    const result = await response.json();
    console.log(result)
    setFiles(result);
  };

  useEffect(() => {
    getFileTree();
  }, []);


  return (
    <>
    <div className='playground-container'>

      <div className='editor-container'>

        <div className='files-container'>
          {/* {console.log(files)} */}
          <FileTree tree = {files} />
        </div>

        <div className='editor-container'>
        </div>

      </div>

      <div className='terminal-container'>
        <Terminal />
      </div>
    </div>
    </>
  )
}

export default App
