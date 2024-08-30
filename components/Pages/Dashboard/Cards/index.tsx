import { useEffect, useState } from "react";

import {
  Milk,
  DollarSign,
  Activity,
  BriefcaseMedical,
  List,
  DollarSignIcon,
  Wheat,
} from "lucide-react";
import axios from "axios";
import { useFilterContext } from "@/providers/FilterContext";
import { format } from "date-fns";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Card from "./Card";
import { IKpiMapping } from "@/constants/kpiMapping";

const cardIcons = [
  { icon: <DollarSign color="#8280ff" size={36} />, color: "#e4e4ff" },
  { icon: <Wheat color="#fec53d" size={36} />, color: "#fef2d6" },
  { icon: <FaMoneyBillTrendUp color="#4ad991" size={32} />, color: "#d9f7e7" },
  { icon: <DollarSignIcon color="#ff9871" size={36} />, color: "#ffded2" },
  { icon: <Milk color="#8280ff" size={36} />, color: "#e4e4ff" },
  { icon: <List color="#fec53d" size={36} />, color: "#fef2d6" },
  { icon: <Activity color="#4ad991" size={36} />, color: "#d9f7e7" },
  { icon: <BriefcaseMedical color="#ff9871" size={36} />, color: "#ffded2" },
];

export default function Cards() {
  const [data, setData] = useState<IKpiMapping[]>([]);
  const [loading, setLoading] = useState(false);
  const [parsedDate, setParsedDate] = useState("");

  const { selectedBatch, setselectedCardIndex, date } = useFilterContext();

  const handleCardClick = (cardKey: number) => {
    setselectedCardIndex(cardKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          batch: selectedBatch,
          date: date && date.from ? format(date?.from, "yyyy-MM-dd") : "",
        });

        const response = await axios.get(`/api/cards?${params.toString()}`);
        setParsedDate(
          date && date.from ? format(date?.from, "dd/MM/yyyy") : "",
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedBatch, date]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {cardIcons.map((cardData, index) => {
        return (
          <TooltipProvider key={`cardId-${index}`}>
            <Tooltip>
              <TooltipTrigger
                className="m-0 w-full border-none bg-none p-0 text-left"
                onClick={() => {
                  handleCardClick(index);
                }}
              >
                <Card
                  data={data[index]}
                  loading={loading}
                  icon={cardData.icon}
                  outsideColor={cardData.color}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{parsedDate}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
