"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"

import { Badge, BadgeProps } from "@/registry/default/ui/badge"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command"

type MultiSelectItem = Record<"value" | "label", string> & {
  readonly?: boolean
}

export function MultiSelect({
  items,
  actions,
  onValueChange,
  onActionSelected,
  defaultValue,
  placeholder,
  variant = "secondary",
}: {
  items: MultiSelectItem[]
  actions?: MultiSelectItem[]
  onValueChange: (value: string[]) => void
  onActionSelected?: (value: string) => void
  defaultValue?: string[]
  placeholder: string
  variant?: BadgeProps["variant"]
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<MultiSelectItem[]>(
    defaultValue
      ? items.filter((item) => defaultValue.includes(item.value))
      : []
  )
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback(
    (item: MultiSelectItem) => {
      updateSelection(selected.filter((s) => s.value !== item.value))
    },
    [selected]
  )

  const updateSelection = React.useCallback((items: MultiSelectItem[]) => {
    setSelected(items)
    onValueChange(items.map((item) => item.value))
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    []
  )

  const selectables = items.filter((item) => !selected.includes(item))

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant={variant}>
                {framework.label}
                {!framework.readonly && (
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(framework)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(framework)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && (selectables.length > 0 || !!actions?.length) ? (
            <div className="absolute top-2 z-50 max-h-[300px] w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                <>
                  {selectables.map((item) => {
                    return (
                      <CommandItem
                        key={item.value}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={() => {
                          setInputValue("")
                          updateSelection([...selected, item])
                        }}
                        className="cursor-pointer"
                      >
                        {item.label}
                      </CommandItem>
                    )
                  })}
                  {!!actions?.length &&
                    actions.map((item) => {
                      return (
                        <CommandItem
                          key={item.value}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          onSelect={() => {
                            onActionSelected?.(item.value)
                          }}
                          className="cursor-pointer bg-blue-500 italic"
                        >
                          {item.label}
                        </CommandItem>
                      )
                    })}
                </>
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}
