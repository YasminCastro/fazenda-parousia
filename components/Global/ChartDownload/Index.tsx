import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";

const ChartDownload = () => {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="ml-auto w-fit p-3"
            onClick={() => router.push("/chart")}
          >
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
