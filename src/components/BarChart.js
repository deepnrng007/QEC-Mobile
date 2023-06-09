import {VictoryGroup, VictoryChart, VictoryLabel} from 'victory-native';
import React from 'react';
import {VictoryTheme, VictoryBar, VictoryAxis} from 'victory-native';
import {View, Text} from 'react-native';
import BarchartStyles from './BarChart.style';
import LegendComponent from './LegendComponent';
import {Dimension, Font, ReportUtil, Theme} from '../utils';

const BarChart = ({
  chartName,
  report,
  legends,
  sprintNames,
  yAxisName,
  values = [],
}) => {
  return (
    <View>
      <Text style={BarchartStyles.headerStyle}>{chartName}</Text>
      <View style={BarchartStyles.parentViewStyle}>
        <VictoryChart
          width={Dimension.screenWidth - 32}
          theme={VictoryTheme.material}
          domain={{y: [0, ReportUtil.getMaxValue(values) + 5]}}
          padding={60}
          categories={{
            x: sprintNames,
          }}>
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
            tickCount={5}
            offsetX={45}
          />
          <VictoryGroup
            offset={10}
            style={{
              data: {width: 4},
              labels: {padding: Dimension.dynamicSize(-20)},
            }}
            colorScale={legends.map(item => item.color)}>
            {values.map(value => createBars(value))}
          </VictoryGroup>
        </VictoryChart>

        {legends ? <LegendComponent data={legends} /> : null}
      </View>
    </View>
  );
};

const createBars = value => {
  const data = value.map((item, index) => {
    const x = index + 1;
    const obj = {x: x, y: item};
    return obj;
  });
  return <VictoryBar data={data} />;
};

export default BarChart;
