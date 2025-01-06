import { Terminal as XTerminal } from '@xterm/xterm'
import { useEffect, useRef } from 'react'
import '@xterm/xterm/css/xterm.css' 
import socket from '../socket'

export default function Terminal() {
    const terminalRef = useRef()
    const isRendered = useRef(false)

    useEffect(() => {
        if (isRendered.current) return
        isRendered.current = true
        const terminal = new XTerminal({row:40});
        terminal.open(terminalRef.current)
        
        terminal.onData(data => {
            socket.emit('console:write', data)
        })

        // socket.on('console:data', data => {
        //     terminal.write(data)
        // })

        function onTerminalData(data){
            terminal.write(data)
        }
        socket.on('console:data', data =>{onTerminalData(data)})

        socket.off('console:data', onTerminalData)

    }
    , [])

    return (

        <div ref={terminalRef} id="terminal"></div>
    )
    }