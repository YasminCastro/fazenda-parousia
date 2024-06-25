"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const farms = [
  {
    value: "general",
    label: "Geral",
  },
  {
    value: "loteA",
    label: "Lote A",
  },
];

export function ComboboxHeader() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("general");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-36 justify-between bg-slate-50 text-gray-400"
        >
          {farms.find((farm) => farm.value === value)?.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-0">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>Nenhuma fazenda encontrada.</CommandEmpty>
            <CommandGroup>
              {farms.map((farm) => (
                <CommandItem
                  key={farm.value}
                  value={farm.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === farm.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {farm.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
