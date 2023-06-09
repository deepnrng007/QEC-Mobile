import {VictoryChart, VictoryLabel, VictoryTheme} from 'victory-native';
import React from 'react';
import {VictoryLine, VictoryScatter, VictoryAxis} from 'victory-native';
import {View, Text} from 'react-native';
import BarchartStyles from './BarChart.style';
import LegendComponent from './LegendComponent';
import {Dimension, Font, ReportUtil, Theme} from '../utils';

const LineChart = ({
  chartName,
  report,
  legends,
  sprintNames,
  yAxisName,
  values = [],
  data,
}) => {
  return (
    <View>
      <Text style={BarchartStyles.headerStyle}>{chartName}</Text>
      <View style={BarchartStyles.parentViewStyle}>
        <VictoryChart
          width={Dimension.screenWidth - 32}
          theme={VictoryTheme.material}
          domain={{y: [0, ReportUtil.getMaxValue(values) + 2]}}
          categories={{
            x: sprintNames,
          }}
        >
          <Text
            style={{
              paddingTop: 10,
              fontFamily: Font.notoSemiBold,
              color: Theme.colors.black,
            }}>
            {report.productName}
            <Text
              style={{color: Theme.colors.gray2, fontFamily: Font.notoMedium}}>
              {' '}
              {report.projectName}
            </Text>
          </Text>
          <VictoryAxis
            tickLabelComponent={
              <VictoryLabel
                style={{fontSize: '8px'}}
                angle={-60}
                textAnchor={'end'}
                verticalAnchor={'middle'}
                labelPlacement="vertical"
              />
            }
            style={{
              axis: {stroke: Theme.colors.gray},
              grid: {
                stroke: Theme.colors.transparent,
              },
            }}
            fixLabelOverlap={true}
          />
          <VictoryAxis
            dependentAxis
            label={`---${yAxisName}---`}
            style={BarchartStyles.sharedAxisStyle}
            tickCount={6}
            offsetX={45}
          />

          <VictoryLine
            data={data}
            style={{
              data: {
                stroke: Theme.colors.logoutColor,
                strokeWidth: Dimension.dynamicSize(2),
              },
            }}
          />
          <VictoryScatter
            data={data}
            size={6}
            style={{data: {fill: Theme.colors.logoutColor}}}
          />
        </VictoryChart>
        {legends ? <LegendComponent data={legends} /> : null}
      </View>
    </View>
  );
};

export default LineChart;
