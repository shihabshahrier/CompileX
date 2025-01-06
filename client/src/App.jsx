import { useState, useEffect, useCallback } from 'react';
import './App.css'
import Terminal from './components/terminal'
import FileTree from './components/fileTree';
import socket from './socket';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { use } from 'react';



function App() {

  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const saved = selectedFileContent === editorContent;

  const getFileTree = async () => {
    const response = await fetch('http://localhost:9000/files');
    const result = await response.json();
    console.log(result)
    setFiles(result);
  };

  useEffect(() => {
    getFileTree();
  }, []);

  useEffect(() => {
      socket.on('file:change', getFileTree);
      return () => {
          socket.off('file:change', getFileTree);
      }
   }, []);

   useEffect(() => {
    if (editorContent && !saved) {
      const timer = setTimeout(() => {
        socket.emit('file:change', {path: selectedFile, content: editorContent});
      }, 5000);
      return () => clearTimeout(timer);
    };
  }, [editorContent, selectedFile, saved]);

  const getFileContent = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(`http://localhost:9000/file/content/?path=${selectedFile}`);
    const result = await response.json();
    setSelectedFileContent(result.content);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile){
      getFileContent();
    }
  }, [selectedFile, getFileContent]);

  useEffect(() => {
    if(selectedFileContent && selectedFile){
      setEditorContent(selectedFileContent);
    }
  }, [selectedFileContent, selectedFile]);

  useEffect(() => {
    setEditorContent("");
  }, [selectedFile]);




  return (
    <>
    <div className='playground-container'>

      <div className='editor-container'>

        <div className='files'>
          <FileTree onSelect = {(path)=>setSelectedFile(path)} tree = {files} />
        </div>

        <div className='editor'>
          { selectedFile && <p>
            {selectedFile.replaceAll('/', " > ")}
            {saved ? " (saved)" : " (unsaved)"}
            </p>}
          <AceEditor 
            value= {editorContent}
            onChange = {(value) => setEditorContent(value)}
          />,
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
