import Box from "@mui/material/Box";
import type { EChartsOption, LineSeriesOption } from "echarts";
import { ECharts, getInstanceByDom, init } from "echarts";
import { memo, ReactElement, RefObject, useEffect, useRef } from "react";
import { withSize } from "react-sizeme";

type EchartsHighlightParams = any;
type EchartsDataZoomParams = any;
type Opts = any;

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

export interface EchartsProps {
  size?: {
    width: number;
    height: number;
  };
  opts?: Opts;
  option?: EChartsOption;
  handleCbChartRef?: (data: RefObject<HTMLDivElement>) => void;
  handleHighlight?: (
    params: EchartsHighlightParams,
    series: LineSeriesOption[]
  ) => void;
  handleZoom?: (
    params: EchartsDataZoomParams,
    oldOption: EChartsOption
  ) => void;
  handleDisposeChart?: () => void;
}

const Echarts = ({
  size,
  opts,
  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  },
  handleCbChartRef,
  handleHighlight,
  handleZoom,
  handleDisposeChart,
}: EchartsProps): ReactElement => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isFirst = useIsFirstRender();

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null && chartRef.current.clientHeight) {
      chart = init(chartRef.current, undefined, opts);
      handleCbChartRef && handleCbChartRef(chartRef);
    }
    // Return cleanup function
    return () => {
      chart?.dispose();
    };
  }, [handleCbChartRef, opts]);

  useEffect(() => {
    return () => {
      handleDisposeChart && handleDisposeChart();
    };
  }, [handleDisposeChart]);

  useEffect(() => {
    if (isFirst && chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      chart &&
        chart.on("highlight", function (params: unknown) {
          handleHighlight &&
            handleHighlight(
              params as EchartsHighlightParams,
              chart?.getOption()?.series as LineSeriesOption[]
            );
        });
    }
  }, [handleHighlight, isFirst]);

  useEffect(() => {
    if (isFirst && chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      chart &&
        chart.on("datazoom", function (params: unknown) {
          handleZoom &&
            handleZoom(
              params as EchartsDataZoomParams,
              chart?.getOption() as EChartsOption
            );
        });
    }
  }, [handleZoom, isFirst]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.resize();
    }
  }, [size]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      if (!chart) return;
      const old = chart?.getOption() as EChartsOption;
      const settings: {
        notMerge?: boolean;
      } = {};
      if (
        old?.series &&
        option?.series &&
        (old?.series as LineSeriesOption[]).length >
          (option?.series as LineSeriesOption[]).length
      ) {
        settings.notMerge = true;
      }
      option && chart && chart.setOption && chart.setOption(option, settings);
    }
  }, [option, opts]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  return (
    <Box
      ref={chartRef}
      sx={{
        width: "100%",
        minWidth: "100px",
        minHeight: "100px",
        height: "100%",
        borderRadius: "10px",
        flex: 1,
      }}
    />
  );
};

export default memo(
  withSize({ monitorHeight: true, monitorWidth: true, noPlaceholder: true })(
    Echarts
  )
);
