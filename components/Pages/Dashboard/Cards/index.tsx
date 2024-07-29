import { useEffect, useState } from "react";
import DoubleCard from "./DoubleCard";
import SimpleCard from "./SimpleCard";
import {
  Milk,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  BriefcaseMedical,
  IterationCw,
  List,
  DollarSignIcon,
} from "lucide-react";
import axios from "axios";
import { CardType, useFilterContext } from "@/providers/FilterContext";
import styles from "./styles.module.css";
import { formatISO } from "date-fns";

interface ICard {
  title: string;
  value: number;
  title2?: string;
  value2?: number;
  cardType: "simple" | "double";
  key: CardType;
}

const defaultData = [{}, {}, {}, {}, {}, {}, {}, {}];

export default function Cards() {
  const [data, setData] = useState<ICard[]>(defaultData as ICard[]);

  const { selectedBatch, setSelectedCard, date } = useFilterContext();

  const handleCardClick = (cardKey: CardType) => {
    setSelectedCard(cardKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          batch: selectedBatch,
          startDate: date && date.from ? formatISO(date?.from) : "",
          endDate: date && date.to ? formatISO(date?.to) : "",
        });

        const response = await axios.get(`/api/cards?${params.toString()}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch, date]);

  return (
    <div className="mt-4 grid grid-cols-4 gap-4">
      {data.map((card: ICard, index) => {
        const { icon, color } = getIconAndColor(index);

        if (card.cardType === "double" && card.title2) {
          return (
            <button
              className={`${styles.buttonWrapper}`}
              onClick={() => {
                handleCardClick(card.key);
              }}
              key={`${card.key}-${index}`}
            >
              <DoubleCard
                title={card.title}
                value={card.value}
                title2={card.title2}
                value2={card.value2 || 0}
                icon={icon}
                color={color}
              />
            </button>
          );
        }

        return (
          <button
            className={`${styles.buttonWrapper}`}
            onClick={() => {
              handleCardClick(card.key);
            }}
            key={`${card.key}-${index}`}
          >
            <SimpleCard
              title={card.title}
              value={card.value}
              icon={icon}
              color={color}
            />
          </button>
        );
      })}
    </div>
  );
}

const getIconAndColor = (index: number) => {
  switch (index) {
    case 0:
      return {
        icon: <DollarSign color="#8280ff" size={36} />,
        color: "#e4e4ff",
      };
    case 1:
      return {
        icon: <ShoppingCart color="#fec53d" size={36} />,
        color: "#fef2d6",
      };
    case 2:
      return {
        icon: <TrendingUp color="#4ad991" size={36} />,
        color: "#d9f7e7",
      };
    case 3:
      return {
        icon: <DollarSignIcon color="#ff9871" size={36} />,
        color: "#ffded2",
      };
    case 4:
      return {
        icon: <Milk color="#8280ff" size={36} />,
        color: "#e4e4ff",
      };
    case 5:
      return {
        icon: <List color="#fec53d" size={36} />,
        color: "#fef2d6",
      };
    case 6:
      return {
        icon: <Activity color="#4ad991" size={36} />,
        color: "#d9f7e7",
      };
    case 7:
      return {
        icon: <BriefcaseMedical color="#ff9871" size={36} />,
        color: "#ffded2",
      };

    default:
      return {
        icon: <IterationCw color="#ff9871" size={36} />,
        color: "#ffded2",
      };
  }
};
