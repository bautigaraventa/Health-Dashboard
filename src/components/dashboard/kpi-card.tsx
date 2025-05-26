"use client";

import { ReactNode } from "react";
import CountUp from "react-countup";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

interface KpiCardProps {
  title: string;
  value: number;
  suffix?: string;
  description: string;
  tooltip: string;
  icon?: ReactNode;
}

export function KpiCard({
  title,
  value,
  suffix,
  description,
  tooltip,
  icon,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label={`Info about ${title}`}
                  className="bg-transparent border-0 p-0 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px]">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            <CountUp end={value} duration={1.2} suffix={suffix || ""} />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
