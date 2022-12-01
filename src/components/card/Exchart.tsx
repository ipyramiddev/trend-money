import React, { useMemo, useCallback } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { curveMonotoneX, curveNatural } from "@visx/curve";
import { GridRows, GridColumns } from "@visx/grid";
import { scaleTime, scaleLinear } from "@visx/scale";
import { Text } from "@visx/text";
import { Axis } from "@visx/axis";
import { MarkerCircle } from "@visx/marker";
import { LinePath } from "@visx/shape";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { max, extent, bisector } from "d3-array";
import { timeFormat } from "d3-time-format";

type TooltipData = AppleStock;

const stock = [
  { date: "2007-09-14T07:00:00.000Z", close: 0 },
  { date: "2007-10-14T07:00:00.000Z", close: 10 },
  { date: "2007-11-14T07:00:00.000Z", close: 30 },
  { date: "2007-12-14T07:00:00.000Z", close: 5 },
  { date: "2007-13-14T07:00:00.000Z", close: 16 },
  { date: "2007-14-14T07:00:00.000Z", close: 23 },
  { date: "2007-15-14T07:00:00.000Z", close: 48 },
  { date: "2007-16-14T07:00:00.000Z", close: 43 },
  { date: "2007-17-14T07:00:00.000Z", close: 38 },
  { date: "2007-18-14T07:00:00.000Z", close: 0 },
];

export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid white",
  color: "white",
};

// util
const formatDate = timeFormat("%b %d, '%y");

const colors = {
  white: "#FFFFFF",
  black: "#1B1B1B",
  gray: "#98A7C0",
  darkGray: "#2A2A2A",
  accent: "#40FEAE",
  darkAccent: "#256769",
};

const graph_data = [
  [1, 0],
  [2, 10],
  [3, 30],
  [4, 5],
  [5, 16],
  [6, 23],
  [7, 48],
  [8, 43],
  [9, 38],
  [10, 0],
];

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>(
  (d: any) => new Date(d.date)
).left;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 55, right: 55, bottom: 55, left: 55 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear({
      domain: [1, 10],
      range: [0 + margin.top, width - margin.top],
    });

    const yScale = scaleLinear({
      domain: [0, 50],
      range: [height - margin.top, margin.top * 2],
    });

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(stock, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left]
    );
    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight]
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(stock, x0, 1);
        const d0 = stock[index - 1];
        const d1 = stock[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        });
      },
      [showTooltip, stockValueScale, dateScale]
    );

    return (
      <div className="rounded-div">
        <svg width={width} height={height} className="divv">
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={colors.black}
            rx={5}
          />
          {/* Title */}
          <Text
            className="lg:text-2xl md:text-2xl xl:text-2xl sm:text-xl"
            style={{
              fill: colors.white,
              fontWeight: 600,
            }}
            x={margin.top / 2}
            y={margin.top}
          >
            SEAM - 3Y Leveraged Weave
          </Text>

          {/* X Axis */}
          <Axis
            scale={xScale}
            top={height - margin.top}
            orientation="bottom"
            stroke={colors.darkGray}
            strokeWidth={1.5}
            tickStroke={colors.darkGray}
            tickLabelProps={() => ({
              fill: colors.gray,
              textAnchor: "middle",
              verticalAnchor: "middle",
            })}
          />

          {/* Y Axis */}
          <Axis
            hideZero
            scale={yScale}
            numTicks={5}
            left={margin.top}
            orientation="left"
            stroke={colors.darkGray}
            strokeWidth={1.5}
            tickStroke={colors.darkGray}
            tickLabelProps={() => ({
              fill: colors.gray,
              textAnchor: "end",
              verticalAnchor: "middle",
            })}
            tickFormat={(value: any) => `${value}`}
          />

          {/* Gradient for actual line */}
          <LinearGradient
            id="line-gradient"
            from={colors.accent}
            to={colors.darkAccent}
          />
          <MarkerCircle
            id="marker-circle"
            fill={colors.gray}
            size={1.5}
            refX={2}
          />

          {/* Background effect */}
          <LinearGradient
            id="background-gradient"
            from={colors.darkAccent}
            to={colors.black}
          />
          <LinePath
            data={graph_data}
            x={(d: any) => xScale(d[0])}
            y={(d: any) => yScale(d[1])}
            fill="url('#background-gradient')"
            curve={curveNatural}
          />

          <LinePath
            data={graph_data}
            x={(d: any) => xScale(d[0])}
            y={(d: any) => yScale(d[1])}
            stroke="url('#line-gradient')"
            strokeWidth={3}
            curve={curveNatural}
            markerEnd="url(#marker-circle)"
          />

          {/* <LinearGradient
            id="area-background-gradient"
            from={background}
            to={background2}
          />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            to={accentColor}
            toOpacity={0.1}
          /> */}
          <GridRows
            left={margin.left}
            scale={stockValueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={dateScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          {/* <AreaClosed<AppleStock>
            data={graph_data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          /> */}
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`$${getStockValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
);
