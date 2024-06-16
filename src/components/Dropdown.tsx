import { Dispatch, SetStateAction, useEffect } from "react"

type DropdownProps = React.ComponentPropsWithoutRef<"div"> & {
  toggle: boolean
  selected: string
  handleToggle: Dispatch<SetStateAction<boolean>>
}

const Dropdown = ({
  id,
  children,
  toggle,
  selected,
  handleToggle
}: DropdownProps) => {
  useEffect(() => {
    const dropdown = document.getElementById(id!)

    const closeDropdown = (e: MouseEvent) => {
      // @ts-ignore
      if (toggle && !dropdown?.contains(e.target)) {
        handleDropdown()
      }
    }

    window.addEventListener("click", closeDropdown)

    return () => {
      window.removeEventListener("click", closeDropdown)
    }
  }, [toggle])

  function handleDropdown() {
    handleToggle((prevState) => (prevState = !prevState))
  }

  return (
    <div id={id} className="relative">
      <button
        onClick={handleDropdown}
        className="border-secondary bg-primary inline-flex w-32 cursor-default items-center justify-between gap-x-4 rounded-lg border px-3 pb-2 pt-2.5 text-sm font-medium text-white focus:outline-none focus:ring-0"
      >
        {selected}

        <svg
          fill="none"
          aria-hidden="true"
          viewBox="0 0 10 6"
          className="h-2.5 w-2.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`border-secondary bg-primary absolute z-10 border ${toggle ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Dropdown
