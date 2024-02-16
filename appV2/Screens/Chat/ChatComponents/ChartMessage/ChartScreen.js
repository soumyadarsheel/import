import React from 'react';
import { View, Image, Text as ReactText, Dimensions } from 'react-native';
import Svg, { Circle, G, Text, Polyline, Line, Rect } from 'react-native-svg';
import styles from './styles';
import GlobalColors from '../../../../config/styles';
import _ from 'lodash';
import Icons from '../../../../config/icons';
import { chartTypes } from './config';
import ColorPalette from 'nice-color-palettes';
import ZoomableSVG from './ZoomableSVG';
import { PieChart } from 'react-native-svg-charts';
import AppFonts from '../../../../config/fontConfig';
const { width, height } = Dimensions.get('window');

export default class ChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.colorPalette = [].concat.apply([], ColorPalette);
        this.state = {
            minYValue: 0,
            maxYValue: 0,
            minXValue: 0,
            maxXValue: 0,
            xDelta: 0,
            yDelta: 0,
            xLabels: [],
            yLabels: [],
            colorLabels: [],
            loading: true,
            constrain: true,
            constraints: {
                combine: 'dynamic',
                scaleExtent: [width / height, 5],
                translateExtent: [
                    [0, 0],
                    [100, 100]
                ]
            },
            chartOptions: this.props.chartOptions,
            chartData: this.props.chartData
        };
    }

    componentDidMount() {
        this.plotChart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.plotChart();
        }
    }

    plotChart() {
        let minYValue;
        let maxYValue;
        let minXValue;
        let maxXValue;
        let yDelta;
        let xDelta;
        let xLabels;
        let yLabels;
        let colorLabels;

        // STACK
        if (this.props.chartOptions.chartType === chartTypes.STACK_BAR) {
            minYValue = 0;
            maxYValue = Math.max(
                ...this.props.chartData.map((stack) => {
                    return _.sumBy(stack, 'y');
                })
            );
            yDelta = (maxYValue - minYValue) / 8;
            maxYValue += yDelta;
            yLabels = [];
            for (let key = 0; key <= 10; key++) {
                yLabels.push(
                    Math.round((minYValue + key * yDelta) * 100) / 100
                );
            }

            xLabels = this.props.chartOptions.stackLabels.slice(
                0,
                this.props.chartData.length
            );

            colorLabels = _.union(
                ...this.props.chartData.map((stack) => {
                    return stack.map((bar) => {
                        return bar.x;
                    });
                })
            );
            colorLabels = colorLabels.map((label, index) => {
                return {
                    label: label,
                    color: this.colorPalette[index]
                };
            });

            //LINE
        } else if (this.props.chartOptions.chartType === chartTypes.LINE) {
            minYValue = _.minBy(this.props.chartData, 'y').y;
            maxYValue = _.maxBy(this.props.chartData, 'y').y;
            yDelta = (maxYValue - minYValue) / 8;
            minYValue -= yDelta;
            maxYValue += yDelta;
            yLabels = [];
            for (let key = 0; key <= 10; key++) {
                yLabels.push(
                    Math.round((minYValue + key * yDelta) * 100) / 100
                );
            }

            xLabels = this.props.chartData.map((dot) => {
                return dot.x;
            });

            //BUBBLE
        } else if (this.props.chartOptions.chartType === chartTypes.BUBBLE) {
            minYValue = _.minBy(this.props.chartData, 'y').y;
            maxYValue = _.maxBy(this.props.chartData, 'y').y;
            yDelta = (maxYValue - minYValue) / 8;
            minYValue -= yDelta;
            maxYValue += yDelta;
            yLabels = [];
            for (let key = 0; key <= 10; key++) {
                yLabels.push(
                    Math.round((minYValue + key * yDelta) * 100) / 100
                );
            }

            minXValue = _.minBy(this.props.chartData, 'x').x;
            maxXValue = _.maxBy(this.props.chartData, 'x').x;
            xDelta = (maxXValue - minXValue) / 8;
            minXValue -= xDelta;
            maxXValue += xDelta;
            xLabels = [];
            for (let key = 0; key <= 10; key++) {
                xLabels.push(
                    Math.round((minXValue + key * xDelta) * 100) / 100
                );
            }

            colorLabels = this.props.chartOptions.bubbleLabels.slice(
                0,
                this.props.chartData.length
            );
            colorLabels = colorLabels.map((label, index) => {
                return {
                    label: label,
                    color: this.colorPalette[index]
                };
            });

            //PIE CHART
        } else if (this.props.chartOptions.chartType === chartTypes.PIE) {
            colorLabels = this.props.chartData.map((slice) => {
                return slice.label;
            });
            colorLabels = colorLabels.map((label, index) => {
                return {
                    label: label,
                    color: this.colorPalette[index]
                };
            });
        }

        this.setState({
            minYValue,
            maxYValue,
            minXValue,
            maxXValue,
            yDelta,
            xDelta,
            xLabels,
            yLabels,
            colorLabels,
            loading: false,
            chartOptions: this.props.chartOptions,
            chartData: this.props.chartData
        });
    }

    renderHorizontalGrid() {
        return this.state.yLabels.map((value, index) => {
            return (
                <G y={100 - (index * 100) / (this.state.yLabels.length - 1)}>
                    <Text
                        fill={GlobalColors.textBlack}
                        fontSize="3"
                        fontWeight={AppFonts.THIN}
                        x="-5"
                        y="0"
                        textAnchor="middle"
                    >
                        {value}
                    </Text>
                    <Line
                        id="valueHorizontalLine"
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke={GlobalColors.disabledGray}
                        strokeWidth="0.2"
                    />
                </G>
            );
        });
    }

    renderVerticalGrid() {
        const xLabelsLength =
            this.state.chartOptions.chartType === chartTypes.STACK_BAR
                ? this.state.xLabels.length
                : this.state.xLabels.length - 1;
        return this.state.xLabels.map((value, index) => {
            return (
                <G x={(index * 100) / xLabelsLength}>
                    <Text
                        fill={GlobalColors.textBlack}
                        fontSize="3"
                        fontWeight={AppFonts.THIN}
                        x="0"
                        y="105"
                        textAnchor="middle"
                    >
                        {value}
                    </Text>
                    {this.state.chartOptions.chartType === chartTypes.LINE ||
                    this.state.chartOptions.chartType ===
                        chartTypes.STACK_BAR ? null : (
                        <Line
                            id="valueHorizontalLine"
                            x1="0"
                            y1="0"
                            x2=""
                            y2="100"
                            stroke={GlobalColors.disabledGray}
                            strokeWidth="0.2"
                        />
                    )}
                </G>
            );
        });
    }

    renderLineChart() {
        let polylineVertices = [];
        const dots = this.state.chartData.map((dot, index) => {
            yPosition =
                100 -
                ((dot.y - this.state.minYValue) * 100) /
                    (this.state.yLabels[this.state.yLabels.length - 1] -
                        this.state.minYValue);
            xPosition = (index * 100) / (this.state.xLabels.length - 1);
            polylineVertices.push(xPosition);
            polylineVertices.push(yPosition);
            return (
                <Circle
                    cx={xPosition}
                    cy={yPosition}
                    r="1"
                    fill={GlobalColors.white}
                    strokeWidth="0.4"
                    stroke={GlobalColors.red}
                    opacity={0.7}
                />
            );
        });
        return (
            <G>
                <Polyline
                    points={polylineVertices}
                    fill="none"
                    stroke={GlobalColors.red}
                    strokeWidth="0.5"
                    opacity={0.7}
                />
                {dots}
            </G>
        );
    }

    renderStackedBarChart() {
        return _.flatten(
            this.state.chartData.map((stack, xValue) => {
                let yPosition = 100;
                const xPosition = (xValue * 100) / this.state.chartData.length;
                return stack.map((bar) => {
                    const barWidth = 80 / this.state.chartData.length;
                    const barHeight =
                        ((bar.y - this.state.minYValue) * 100) /
                        (this.state.yLabels[this.state.yLabels.length - 1] -
                            this.state.minYValue);
                    const color = this.state.colorLabels.find((label) => {
                        return label.label === bar.x;
                    }).color;
                    yPosition -= barHeight;
                    return (
                        <Rect
                            x={xPosition}
                            y={yPosition}
                            width={barWidth}
                            height={barHeight}
                            fill={color}
                            strokeWidth="0"
                            opacity={0.7}
                        />
                    );
                });
            })
        );
    }

    renderBubbleChart() {
        let maxBubbleSize = _.maxBy(this.state.chartData, 'value').value;
        return this.state.chartData.map((bubble, index) => {
            let yPosition =
                ((bubble.y - this.state.minYValue) * 100) /
                (this.state.yLabels[this.state.yLabels.length - 1] -
                    this.state.minYValue);
            let xPosition =
                ((bubble.x - this.state.minXValue) * 100) /
                (this.state.xLabels[this.state.xLabels.length - 1] -
                    this.state.minXValue);
            return (
                <Circle
                    cx={xPosition}
                    cy={100 - yPosition}
                    r={(bubble.value * 17) / maxBubbleSize}
                    fill={this.colorPalette[index]}
                    opacity={0.7}
                />
            );
        });
    }

    renderPieChart() {
        let filteredData = this.state.chartData
            .filter((slice) => {
                return slice.value > 0;
            })
            .map((slice, index) => {
                return {
                    value: slice.value,
                    svg: {
                        fill: this.colorPalette[index]
                    }
                };
            });
        return (
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <PieChart
                    style={{ height: '80%' }}
                    data={filteredData}
                    innerRadius="0%"
                    padAngle={0}
                />
            </View>
        );
    }

    renderDataLabels() {
        if (this.state.chartOptions.chartType !== chartTypes.LINE) {
            return this.state.colorLabels.map((label) => {
                return (
                    <View style={styles.keyContainer}>
                        {Icons.square({ color: label.color })}
                        <ReactText
                            style={[styles.description, { marginLeft: 5 }]}
                        >
                            {label.label}
                        </ReactText>
                    </View>
                );
            });
        } else {
            return (
                <View style={styles.keyContainer}>
                    {Icons.lineChart()}
                    <ReactText style={[styles.description, { marginLeft: 5 }]}>
                        {this.state.chartOptions.yLabel}
                    </ReactText>
                </View>
            );
        }
    }

    renderChart({ transform }) {
        return (
            <Svg height={height} width={width}>
                <G scale="0.88" x="8" y="3" transform={transform}>
                    {this.state.chartOptions.chartType === chartTypes.PIE
                        ? null
                        : this.renderHorizontalGrid()}
                    {this.state.chartOptions.chartType === chartTypes.PIE
                        ? null
                        : this.renderVerticalGrid()}
                    {this.state.chartOptions.chartType === chartTypes.LINE
                        ? this.renderLineChart()
                        : null}
                    {this.state.chartOptions.chartType === chartTypes.STACK_BAR
                        ? this.renderStackedBarChart()
                        : null}
                    {this.state.chartOptions.chartType === chartTypes.BUBBLE
                        ? this.renderBubbleChart()
                        : null}
                </G>
            </Svg>
        );
    }

    render() {
        const { constrain, constraints } = this.state;
        return (
            <View style={styles.chartScreenContainer}>
                <View style={styles.topBarContainer}>
                    <View style={styles.topBarTextContainer}>
                        <ReactText
                            style={styles.title}
                            numberOfLines={1}
                            lineBreakMode="tail"
                        >
                            {this.state.chartOptions.title || 'Chart'}
                        </ReactText>
                        <ReactText
                            style={styles.description}
                            numberOfLines={1}
                            lineBreakMode="tail"
                        >
                            {this.state.chartOptions.description || ''}
                        </ReactText>
                    </View>
                    <Image />
                </View>
                <View style={[styles.chartContainer, { width: '100%' }]}>
                    {this.state.loading ? null : this.state.chartOptions
                          .chartType === chartTypes.PIE ? (
                        this.renderPieChart()
                    ) : (
                        <ZoomableSVG
                            align="mid"
                            vbWidth={110}
                            vbHeight={110}
                            width={width}
                            height={width}
                            meetOrSlice="slice"
                            svgRoot={this.renderChart.bind(this)}
                            initialTop={10}
                            initialLeft={35}
                            constrain={constrain ? constraints : null}
                        />
                    )}
                </View>
                <View style={styles.bottomBarContiner}>
                    {this.state.loading ? null : this.renderDataLabels()}
                </View>
            </View>
        );
    }
}