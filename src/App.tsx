import { useEffect, useRef, useState } from "react"
import { editor } from "monaco-editor"

import { languageList } from "./languages"

import Dropdown from "./components/Dropdown"
import CodeEditor from "./components/CodeEditor"

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)
  const [languageDropdown, setLanguageDropdown] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0])
  const [sourceCode, setSourceCode] = useState<string | undefined>(
    languageList[0].content
  )
  const [editorHeight, setEditorHeight] = useState(window.innerHeight - 43 - 64)
  const [codeOutput, setCodeOutput] = useState<string[]>([])
  const [btnLoader, setBtnLoader] = useState(false)
  const [codeError, setCodeError] = useState(false)

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsSmallScreen(window.innerWidth < 768)
      setEditorHeight(window.innerHeight - 43 - 64)
    })
  }, [])

  function handleLanguage(language: string) {
    const idx = languageList.findIndex((lang) => lang.language === language)

    setLanguageDropdown(false)
    setSelectedLanguage(languageList[idx])
    setSourceCode(languageList[idx].content)
  }

  function executeCode() {
    const content = editorRef.current?.getValue()

    if (!content) return

    const language = languageList.find(
      ({ language }) =>
        language === editorRef.current?.getModel()?.getLanguageId()
    )

    setBtnLoader(true)

    setSelectedLanguage(language!)

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: language?.alias,
        version: language?.version,
        files: [
          {
            content
          }
        ]
      })
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.run.stderr) {
          setCodeError(true)
          setCodeOutput(data.run.stderr.split("\n"))
        } else {
          setCodeError(false)
          setCodeOutput(data.run.output.split("\n"))
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setBtnLoader(false)
      })
  }

  return (
    <>
      {isSmallScreen ? (
        <div className="grid min-h-screen place-items-center text-white">
          <div className="w-3/4 text-center">
            <div>
              🙁 <br />
              The Code Playground is not available for this window size.
            </div>

            <div className="mt-2">
              You need to access this site from your laptop or desktop computer
              to use it.
            </div>

            <div className="mt-4 font-semibold">Thank you! 😊</div>
          </div>
        </div>
      ) : (
        <div>
          <div
            id="github-section"
            className="border-secondary bg-primary flex justify-center border-b pb-2.5 pt-3"
          >
            <a
              target="_blank"
              href="https://github.com/pratikpokharel3/code-playground"
              className="text-sm font-medium text-gray-400 underline"
            >
              GitHub Code
            </a>
          </div>

          <div className="grid grid-cols-12 gap-x-2">
            <div className="md:col-span-7 lg:col-span-6">
              <div className="border-secondary mr-[13px] flex items-center justify-between border-r py-3 pl-7 pr-4 text-white">
                <div className="col-span-12 text-center text-xl font-semibold">
                  Codiify
                </div>

                <div className="col-span-12 flex items-center justify-center gap-x-5">
                  <Dropdown
                    id="language-dropdown"
                    toggle={languageDropdown}
                    selected={
                      selectedLanguage.alias[0].toUpperCase() +
                      selectedLanguage.alias.slice(1)
                    }
                    handleToggle={setLanguageDropdown}
                  >
                    <div className="flex w-[126px] flex-col overflow-auto py-1">
                      {languageList.map(({ alias, language }) => (
                        <div
                          className={`cursor-default px-5 py-1 text-sm hover:bg-gray-700 ${language === selectedLanguage.language ? "bg-gray-600" : ""}`.trimEnd()}
                          key={language}
                          onClick={() => handleLanguage(language)}
                        >
                          {alias[0].toUpperCase() + alias.slice(1)}
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  <button
                    type="button"
                    className="flex w-24 justify-center rounded-lg bg-green-600 pb-2 pt-2.5 text-sm text-white hover:bg-green-700"
                    onClick={() => executeCode()}
                  >
                    {btnLoader ? (
                      <div role="status">
                        <svg
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 100 101"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 animate-spin fill-white text-green-700"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Run Code"
                    )}
                  </button>
                </div>
              </div>

              <CodeEditor
                code={sourceCode}
                language={selectedLanguage.language}
                editorHeight={editorHeight}
                setCode={setSourceCode}
                executeCode={executeCode}
                editorRef={editorRef}
              />
            </div>

            <div
              style={{ height: window.innerHeight - 43 }}
              className={`border-secondary overflow-auto border-l px-4 py-6 text-sm md:col-span-5 lg:col-span-6 ${codeError ? "text-red-500" : "text-white"}`}
            >
              {codeOutput.length === 0 && (
                <div className="text-gray-400">
                  Click "Run Code" to see the output here.
                </div>
              )}

              {codeOutput.map((line, idx) => (
                <div key={`line-${idx}`}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
