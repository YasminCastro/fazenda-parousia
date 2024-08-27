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
import { useState } from "react";
import { useFilterContext } from "@/providers/FilterContext";

export function ComboboxHeader() {
  const [open, setOpen] = useState(false);

  const { batches, setSelectedBatch, selectedBatch } = useFilterContext();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-28 justify-between bg-slate-50 text-gray-400"
        >
          {batches.find((farm) => farm.value === selectedBatch)?.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-0">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>Nenhuma fazenda encontrada.</CommandEmpty>
            <CommandGroup>
              {batches.map((farm) => (
                <CommandItem
                  key={farm.value}
                  value={farm.value}
                  onSelect={(currentValue) => {
                    setSelectedBatch(
                      currentValue === selectedBatch ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBatch === farm.value
                        ? "opacity-100"
                        : "opacity-0",
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
