import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Pie from "./Pie";
import { useFilterContext } from "@/providers/FilterContext";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import Line from "./Line";

interface IProps {
  data: any;
}

export default function PieAndLineChart({ data }: IProps) {
  const { date } = useFilterContext();
  const chartRef = useRef(null);

  const handleDownloadChart = async () => {
    if (chartRef && chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      const fileStartDate =
        date && date.from ? format(date?.from, "dd-MM-yyyy") : "";

      let parsedTitle = data.title
        .replace(/\s*\(.*?\)\s*/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      link.download = `${parsedTitle}_${fileStartDate}.png`;
      link.click();
    }
  };
  return (
    <Card className={`${stylesGraph.cardWrapper}`} ref={chartRef}>
      {data && (
        <>
          <div className={`${stylesGraph.graphHeader}`}>
            <h2 className={`${stylesGraph.graphTitle}`}>{data.title}</h2>
            <div className="space-x-2">
              <Button
                className={`${stylesGraph.changeGraphButton}`}
                onClick={handleDownloadChart}
              >
                <Download />
              </Button>
            </div>
          </div>
          <div
            className={`${stylesGraph.graphWrapper} grid grid-cols-[2fr_1fr]`}
          >
            {data.lineData && <Line data={data.lineData} />}
            {data.pieData && <Pie data={data.pieData} />}
          </div>
        </>
      )}
    </Card>
  );
}
