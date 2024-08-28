"use client";

import * as React from "react";
import { format, isAfter, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilterContext } from "@/providers/FilterContext";

export function DatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate } = useFilterContext();
  const [tempDate, setTempDate] = React.useState(date);

  const handleApply = () => {
    setDate(tempDate);
  };

  const disableFutureDates = (date: Date) => {
    return isToday(date) || isAfter(date, new Date());
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-48 justify-start bg-slate-50 text-left font-normal text-gray-400",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.to, "dd/MM/yy")} -{" "}
                  {format(date.from, "dd/MM/yy")}
                </>
              ) : (
                format(date.from, "dd/MM/yy")
              )
            ) : (
              format(new Date(), "dd/MM/yy")
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={setTempDate}
            numberOfMonths={1}
            disabled={disableFutureDates}
          />
          <div className="flex w-full px-2 pb-2">
            <Button onClick={handleApply} className="w-full">
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
