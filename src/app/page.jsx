'use client'

import { useRef } from 'react';

import Editor from '@/components/Editor'
import transform from './deconfuse';
import Link from 'next/link';


export default function Page() {
    const sourceRef = useRef(null);
    const resultRef = useRef(null);
    const handleClick = () => {
        // console.log('click transform')
        var code = sourceRef.current.getCode();
        const result = transform(code)
        resultRef.current.updateCode(result)
    }
    
    const splitpaneMovedown = (event) => {
        console.log('movedown')
        var vertical = false;
        // This is needed to prevent text selection in Safari
        event.preventDefault();

        const offset = event.currentTarget.offsetLeft;
        const size = document.body.offsetWidth;
        // const offset = vertical ? container.current.offsetTop : container.current.offsetLeft;
        // const size = vertical ? container.current.offsetHeight : container.current.offsetWidth;
        // global.document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
        let moveHandler = event => {
            // debugger;
            event.preventDefault();
            const newPosition = event.pageX / size * 100;
            // Using 99% as the max value prevents the divider from disappearing
            // setPosition(Math.min(Math.max(0, newPosition), 99));
            const pp = Math.min(Math.max(0, newPosition), 99);
            var ele = document.querySelector('.splitpane-left');
            if (vertical) {
                // top
                // styleA.minHeight = styleA.maxHeight = position + '%'
            } else {
                // left
                // styleA.minWidth = styleA.maxWidth = position + '%'
                ele.style.minWidth = ele.style.maxWidth = pp + '%';
            }
        };
        let upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            // global.document.body.style.cursor = '';

        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    }
    return <div id="page">
        <div id="container">
            <div id="main">
                <div id="Toolbar">
                    <h1>AST 解混淆</h1>
                    <div>
                        <button onClick={handleClick}>转换</button>
                    </div>
                </div>
                <div className="splitpane-content">
                    <div className="splitpane">
                        <div className="splitpane-left">
                            <Editor ref={sourceRef} doc={'// hello'} />
                        </div>
                        <div className="splitpane-divider horizontal" onMouseDown={splitpaneMovedown}>
                        </div>
                        <div className="splitpane-right">
                            <Editor ref={resultRef} doc={'// result code'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="contribution">
            Built with&nbsp;
            <Link href="https://Nextjs.org/">Nextjs</Link>,&nbsp;
            <Link href="https://reactjs.org/">React</Link>,&nbsp;
            <Link href="https://babeljs.io/">Babel</Link>,&nbsp;
            <Link href="https://codemirror.net/">CodeMirror</Link>,&nbsp;
            <Link href="https://webpack.js.org/">webpack</Link>&nbsp;
            |
            &nbsp;<Link href="https://github.com/zgsla/confusion-resolution">GitHub</Link>
        </div>
    </div>
  }