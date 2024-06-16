import { Editor, OnMount } from "@monaco-editor/react"

type EditorProps = {
  editorRef: any
  language: string
  editorHeight: number
  code: string | undefined
  setCode: (code: string | undefined) => void
  executeCode: () => void
}

const CodeEditor = ({
  code,
  language,
  editorRef,
  editorHeight,
  setCode,
  executeCode
}: EditorProps) => {
  const loader = (
    <div className="mr-[13px] grid h-full w-full place-items-center border-r border-secondary text-sm text-white">
      Loading...
    </div>
  )

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    editor.focus()

    editor.addAction({
      id: "save-file",
      label: "Save File",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: function () {
        executeCode()
      }
    })
  }

  return (
    <Editor
      theme="vs-dark"
      value={code}
      loading={loader}
      language={language}
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
