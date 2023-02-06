import React, { useState } from 'react';
import { extent, max } from 'd3-array';
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerArrow, MarkerCross, MarkerX, MarkerCircle, MarkerLine } from '@visx/marker';
import generateDateValue, { DateValue } from '@visx/mock-data/lib/generators/genDateValue';

import { LinearGradient, RadialGradient } from '@visx/gradient';
import { Axis, AxisBottom } from "@visx/axis";
import { Text } from '@visx/text';

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const lineCount = 1;
const series = new Array(lineCount).fill(null).map((_, i) =>
    // vary each series value deterministically
    generateDateValue(25, /* seed= */ i / 72).sort(
        (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime(),
    ),
);
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
    domain: [0, max(allData, getY) as number],
});

export type CurveProps = {
    width: number;
    height: number;
};
// color pallette
const colors = {
    white: "#FFFFFF",
    black: "#1B1B1B",
    gray: "#98A7C0",
    darkGray: "#2A2A2A",
    accent: "#E542AC",
    darkAccent: "#A074FC",
};

export default function Example({ width, height}: CurveProps) {
    const [curveType, setCurveType] = useState<CurveType>('curveNatural');
    const [showPoints, setShowPoints] = useState<boolean>(true);
    const svgHeight = height;
    const lineHeight = svgHeight / lineCount;

    // update scale output ranges
    xScale.range([0, width - 40]);
    yScale.range([lineHeight - 30, 30]);
    // console.log("series", series[0][24]["date"])
    // console.log("series", series[0][24]["value"])
    // const finalX = xScale(getX(series[0][24]["value"]))
    // const finalY = yScale(getY(series[0][24]["value"]))
    return (
        <div className="visx-curves-demo">
            <svg width={width} height={svgHeight}>
                
                {/* <MarkerX
                    id="marker-x"
                    stroke="#333"
                    size={22}
                    strokeWidth={4}
                    markerUnits="userSpaceOnUse"
                /> */}
                {/* <MarkerCross
                    id="marker-cross"
                    stroke="#333"
                    size={22}
                    strokeWidth={4}
                    strokeOpacity={0.6}
                    markerUnits="userSpaceOnUse"
                /> */}
                {/* <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} /> */}
                {/* <MarkerArrow id="marker-arrow-odd" stroke="#333" size={8} strokeWidth={1} /> */}
                {/* <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1} /> */}
                <rect width={width} height={svgHeight} fill={colors.darkGray} rx={14} ry={14} />
                {width > 8 &&
                    series.map((lineData, i) => {
                        const even = i % 2 === 0;
                        let markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
                        if (i === 1) markerStart = 'url(#marker-line)';
                        const markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
                        return (
                            <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
                                {showPoints &&
                                    lineData.map((d, j) => (
                                        <circle
                                            key={i + j}
                                            r={3}
                                            cx={xScale(getX(d))}
                                            cy={yScale(getY(d))}
                                            stroke="rgba(33,33,33,0.5)"
                                            fill="transparent"
                                        />
                                    ))}
                                <Axis
                                    scale={xScale}
                                    top={height*3/5}
                                    orientation="bottom"
                                    axisClassName="dashed"
                                    stroke={colors.white}
                                    strokeWidth={1}
                                    hideTicks
                                    hideZero
                                    tickLabelProps={() => ({
                                        fill: colors.darkGray,
                                        textAnchor: "middle",
                                        verticalAnchor: "middle",
                                    })}
                                    tickComponent={() => null}
                                    strokeDasharray="5,5"
                                />
                                <Axis
                                    scale={yScale}
                                    // numTicks={5}
                                    left={width*3/4}
                                    orientation="left"
                                    stroke={colors.white}
                                    strokeWidth={1}
                                    hideTicks
                                    hideZero
                                    tickLabelProps={() => ({
                                        fill: colors.darkGray,
                                        textAnchor: "middle",
                                        verticalAnchor: "middle",
                                    })}
                                    tickComponent={() => null}
                                    strokeDasharray="5,5"
                                    // tickFormat={(value: any) => `${value}`}
                                />
                                {/* gradient color */}
                                <LinearGradient
                                    id="line-gradient"
                                    from={colors.accent}
                                    to={colors.darkAccent}
                                    rotate={10}
                                />
                                {/* End marker */}
                                <MarkerCircle id="marker-arrow" fill={colors.white} refX={2} size={3} strokeWidth={1} />
                                {/* Text */}
                                <Text
                                    fill={colors.white}
                                    x={width - 60}
                                    y={height - 80}

                                >
                                    +18%
                                </Text>
                                {/* Actual line */}
                                <LinePath<DateValue>
                                    curve={allCurves[curveType]}
                                    data={lineData}
                                    x={(d) => xScale(getX(d)) ?? 0}
                                    y={(d) => yScale(getY(d)) ?? 0}
                                    stroke="url('#line-gradient')"
                                    strokeWidth={even ? 2 : 1}
                                    strokeOpacity={even ? 0.6 : 1}
                                    shapeRendering="geometricPrecision"
                                    markerMid="url(#marker-circle)"
                                    markerStart={markerStart}
                                    markerEnd={markerEnd}
                                />
                            </Group>
                        );
                    })}
            </svg>
        </div>
    );
}