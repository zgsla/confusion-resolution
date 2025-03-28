'use client'
export default function Page() {
    const handleClick = () => {
        console.log('clicked')
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
            var ele: HTMLDivElement = document.querySelector('.splitpane-left');
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
                            <div className="source"></div>
                        </div>
                        <div className="splitpane-divider horizontal" onMouseDown={splitpaneMovedown}>
                        </div>
                        <div className="splitpane-right">
                            <div className="result"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  }