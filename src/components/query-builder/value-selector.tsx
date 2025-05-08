"use client"

import type {
  FullOption,
  FullOptionList,
  ValueSelectorProps,
} from "react-querybuilder"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { MultiSelect } from "@/components/ui/multi-select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/utils/cn"
import { search } from "deepsearchjs"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  isOptionGroupArray,
  uniqOptList,
  useSelectElementChangeHandler,
  useValueSelector,
} from "react-querybuilder"

export const optionListToComboboxData = (list: FullOptionList<FullOption>) => {
  const uniqList = uniqOptList(list)
  return isOptionGroupArray(uniqList)
    ? uniqList.map((og) => ({ ...og, group: og.label, items: og.options }))
    : uniqList.map((opt) => ({
        name: opt.name,
        value: opt.name,
        label: opt.label,
      }))
}

export const ValueSelector = <Opt extends FullOption = FullOption>({
  handleOnChange,
  options,
  value,
  multiple,
  listsAsArrays,
  className,
}: ValueSelectorProps<Opt>) => {
  const [open, setOpen] = React.useState(false)
  //const [value, setValue] = React.useState("");
  const { onChange, val } = useValueSelector({
    handleOnChange,
    listsAsArrays,
    multiple,
    value,
  })

  return multiple ? (
    <MultiSelect
      className={className}
      options={optionListToComboboxData(options)}
      selected={value ? (value as unknown as string[]) : []}
      onChange={(currentValue) => {
        onChange(currentValue as string[])
      }}
    />
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between sm:max-w-[186px]", className)}
        >
          {value
            ? options.find((ele) =>
                "options" in ele
                  ? (ele.options as FullOption[]).find(
                      (sub) => sub.value === value,
                    )
                  : ele.value === value,
              )?.label
            : "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {optionListToComboboxData(options)?.map((option, index) => {
                if ("options" in option) {
                  {
                    option.options?.map((option, index) => {
                      if ("options" in option) {
                      }
                      return (
                        <CommandItem
                          key={index}
                          value={option.value}
                          onSelect={(currentValue) => {
                            onChange(currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === option.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      )
                    })
                  }
                } else {
                  return (
                    <CommandItem
                      key={index}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  )
                }
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
ValueSelector.displayName = "ValueSelector"
