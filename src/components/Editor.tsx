'use client'
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import {Extension, EditorState} from "@codemirror/state"
import {
  EditorView, keymap, highlightSpecialChars, drawSelection,
  highlightActiveLine, dropCursor, rectangularSelection,
  crosshairCursor, lineNumbers, highlightActiveLineGutter
} from "@codemirror/view"
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput,
  bracketMatching, foldGutter, foldKeymap
} from "@codemirror/language"
import {
  defaultKeymap, history, historyKeymap
} from "@codemirror/commands"
import {
  searchKeymap, highlightSelectionMatches
} from "@codemirror/search"
import {
  autocompletion, completionKeymap, closeBrackets,
  closeBracketsKeymap
} from "@codemirror/autocomplete"
import {lintKeymap} from "@codemirror/lint"
import { javascript } from "@codemirror/lang-javascript";


type Props = {
    doc: string
}

export default forwardRef(function Editor(props: Props, ref) {
    const {doc} = props;
    const containerRef = useRef<HTMLDivElement>(null);
    let editor: EditorView;
    useEffect(() => {
        editor = new EditorView({
            doc,
            parent: containerRef.current,
            extensions: [
                javascript(),
                // A line number gutter
                lineNumbers(),
                // A gutter with code folding markers
                foldGutter(),
                // Replace non-printable characters with placeholders
                highlightSpecialChars(),
                // The undo history
                history(),
                // Replace native cursor/selection with our own
                drawSelection(),
                // Show a drop cursor when dragging over the editor
                dropCursor(),
                // Allow multiple cursors/selections
                EditorState.allowMultipleSelections.of(true),
                // Re-indent lines when typing specific input
                indentOnInput(),
                // Highlight syntax with a default style
                syntaxHighlighting(defaultHighlightStyle),
                // Highlight matching brackets near cursor
                bracketMatching(),
                // Automatically close brackets
                closeBrackets(),
                // Load the autocompletion system
                autocompletion(),
                // Allow alt-drag to select rectangular regions
                rectangularSelection(),
                // Change the cursor to a crosshair when holding alt
                crosshairCursor(),
                // Style the current line specially
                highlightActiveLine(),
                // Style the gutter for current line specially
                highlightActiveLineGutter(),
                // Highlight text that matches the selected text
                highlightSelectionMatches(),
                keymap.of([
                // Closed-brackets aware backspace
                ...closeBracketsKeymap,
                // A large set of basic bindings
                ...defaultKeymap,
                // Search-related keys
                ...searchKeymap,
                // Redo/undo keys
                ...historyKeymap,
                // Code folding bindings
                ...foldKeymap,
                // Autocompletion keys
                ...completionKeymap,
                // Keys related to the linter system
                ...lintKeymap
                ])
            ]
        })
        return () => {
            editor.destroy()
        }
    }, [])
    useImperativeHandle(ref, () => ({
        getCode(){
            if(!editor) return
            return editor.state.doc.toString()
        }
    }))
    return (
        <div ref={containerRef}>
        </div>
    )
})
