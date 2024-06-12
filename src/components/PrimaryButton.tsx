import React from "react"

type ButtonProps = React.ComponentPropsWithoutRef<"div">

const PrimaryButton = ({ className, children }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-lg bg-red-600 px-5 pb-2 pt-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-0 ${className ?? ""}`.trimEnd()}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
