"use client";

import React from "react";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { BiInjection } from "react-icons/bi";

const items = [
  {
    id: 1,
    title: "Data de aptidão",
    date: "2020-08-04",
    period: "292d ",
    color: "#2ECC71",
    vaccine: 2,
  },
  {
    id: 2,
    title: "Primeiro parto",
    date: "2021-06-13",
    period: "404d",
    color: "#E74C3C",
    vaccine: "4",
  },
  {
    id: 3,
    title: "Segundo parto",
    date: "2022-07-22",
    period: "583d",
    color: "#9B59B6",
    vaccine: "8",
  },
  {
    id: 4,
    title: "Terceiro parto",
    date: "2024-03-05",
    period: "",
    color: "#E67E22",
    vaccine: "",
  },
];

export default function AnimalTimeline() {
  return (
    <div>
      <Timeline>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          return (
            <TimelineItem key={item.id}>
              {isLastItem ? (
                ""
              ) : (
                <TimelineConnector
                  style={{ backgroundColor: item.color }}
                  text={item.period}
                />
              )}
              <TimelineHeader>
                <TimelineTime>{item.date}</TimelineTime>
                <TimelineIcon style={{ backgroundColor: item.color }} />
                <TimelineTitle>{item.title}</TimelineTitle>
              </TimelineHeader>
              {isLastItem ? (
                ""
              ) : (
                <TimelineContent>
                  <TimelineDescription className="flex items-center gap-1">
                    <BiInjection size={20} />
                    {item.vaccine}
                  </TimelineDescription>
                </TimelineContent>
              )}
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}
