import { useRef } from "react"
import { Editor, OnMount } from "@monaco-editor/react"

type EditorProps = {
  language: string
  editorHeight: number
  code: string | undefined
  setCode: (code: string | undefined) => void
  executeCode: () => void
}

const CodeEditor = ({
  code,
  language,
  editorHeight,
  setCode,
  // @ts-ignore
  executeCode
}: EditorProps) => {
  const editorRef = useRef(null)

  const loader = (
    <div className="mr-[13px] grid h-full w-full place-items-center border-r border-[#3c3c3c] text-sm text-white">
      Loading...
    </div>
  )

  const onMount: OnMount = (editor, monaco) => {
    // @ts-ignore
    editorRef.current = editor
    editor.focus()

    editor.addAction({
      id: "save-file",
      label: "Save File",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: function () {
        // TOOD: Run code on edit
        // const code = editor.getValue()
        // executeCode()
      }
    })
  }

  return (
    <Editor
      theme="vs-dark"
      value={code}
      loading={loader}
      language={language !== "c++" ? language : "cpp"}
      height={editorHeight}
      onMount={onMount}
      onChange={(value) => setCode(value)}
      options={{
        wordWrap: "on"
      }}
    />
  )
}

export default CodeEditor
