import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";

const ChartDownload = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="ml-auto w-fit p-3">
            <Download size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Baixar gráfico produção e média diária</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChartDownload;
