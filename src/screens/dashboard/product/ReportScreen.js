import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BarChart from '../../../components/BarChart';
import Toolbar from '../../../components/common/Toolbar';
import InfoText from '../../../components/InfoText';
import LineChart from '../../../components/LineChart';
import styles from './ReportScreen.style';
import {
  getReport,
  getProductSprint,
  getSprintReport,
  resetReportData,
} from '../../../redux/actions/ReportAction';
import {ReportUtil, Strings, Theme, Utils} from '../../../utils';
import QECMultiDropDown from '../../../components/QECMultiDropDown';

const ReportScreen = ({
  route,
  navigation,
  getReport,
  getProductSprint,
  getSprintReport,
  resetReportData,
  productReport,
  productSprint,
  dashboardData,
}) => {
  const product = dashboardData.find(item => {
    return item.productId === route.params.id;
  });

  const [sprintNames, setSprintNames] = useState([]);
  const [selectedValues, setSelectedValues] = useState('');

  useEffect(() => {
    callReportApi();
    getProductSprint(product.productId, product.projectId);
    return () => {
      resetReportData();
    };
  }, []);

  const callReportApi = () => {
    getReport(product.productId, product.projectId);
  };

  const callSprintReportApi = values => {
    getSprintReport(product.productId, product.projectId, values);
  };

  const defectsInjected = ReportUtil.getDefectsInjected(
    product.productAttributes,
  );

  const defectsFixed = ReportUtil.getDefectsFixed(product.productAttributes);

  const defectsTrends = ReportUtil.getDefectsTrends(product.productAttributes);

  const committedStoryPoints = ReportUtil.getCommittedStoryPoints(
    product.productAttributes,
  );

  const completedStoryPoints = ReportUtil.getCompletedStoryPoints(
    product.productAttributes,
  );

  const effortRate = ReportUtil.getEffortRate(product.productAttributes);

  const sprints = productSprint?.map(item => {
    return {
      label: `${item.name}(${Utils.getMonthFromDate(
        item.startDate,
      )} - ${Utils.getMonthFromDate(item.endDate)})|${Utils.getYearFromDate(
        item.endDate,
      )}`,
      value: item.name,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar
        title={Strings.names.report_dashboard}
        showBack={true}
        onBackPressed={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{width: '100%'}}>
        <View style={{flex: 1, paddingBottom: 20}}>
          {showInfoTexts(
            defectsInjected,
            defectsFixed,
            defectsTrends,
            committedStoryPoints,
            completedStoryPoints,
            effortRate,
          )}

          <QECMultiDropDown
            placeholder={Strings.placeholder.sprint_dropdown}
            values={sprintNames}
            onChange={setSprintNames}
            setSelectedValues={value => {
              setSelectedValues(value);
              if (value.length == 0) {
                callReportApi();
              } else {
                callSprintReportApi(value);
              }
            }}
            listItems={sprints}
            showClockIcon={true}
          />
          {productReport ? showCharts(productReport) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const showInfoTexts = (
  defectsInjected,
  defectsFixed,
  defectsTrends,
  committedStoryPoints,
  completedStoryPoints,
  effortRate,
) => {
  return (
    <View>
      <InfoText
        text={Strings.names.defects_injected}
        count={defectsInjected != null ? defectsInjected.lastSprintCount : '-'}
        countVariation={
          defectsInjected != null ? defectsInjected.difference : 0
        }
        isPositive={defectsInjected != null ? defectsInjected.isPositive : null}
        tooltipText={
          defectsInjected != null
            ? defectsInjected.difference != 0
              ? defectsInjected.isPositive
                ? `Defects(s) Injected decreased by ${Math.abs(
                    defectsInjected.difference,
                  )}`
                : `Defects(s) Injected increased by ${Math.abs(
                    defectsInjected.difference,
                  )}`
              : 'Defects(s) Injected increased by 0'
            : ''
        }
        tooltipData={defectsInjected?.lastSprintIssuesPriority ?? null}
        showGreenArrowUp={false}
        showRedArrowDown={false}
      />

      <InfoText
        text={Strings.names.defects_fixed}
        count={defectsFixed != null ? defectsFixed?.lastSprintCount : '0'}
        countVariation={defectsFixed != null ? defectsFixed.difference : 0}
        isPositive={defectsFixed != null ? defectsFixed.isPositive : null}
        tooltipText={
          defectsFixed != null
            ? `${defectsFixed.lastSprintCount} Defect(s) Fixed in last sprint`
            : ''
        }
        tooltipData={defectsFixed?.lastSprintIssuesPriority ?? null}
        showGreenArrowUp={false}
        showRedArrowDown={false}
      />

      <InfoText
        text={Strings.names.defects_open}
        count={defectsTrends != null ? defectsTrends.lastSprintCount : '0'}
        countVariation={defectsTrends != null ? defectsTrends.difference : 0}
        isPositive={defectsTrends != null ? defectsTrends.isPositive : null}
        tooltipText={
          defectsTrends != null
            ? defectsTrends.difference != 0
              ? defectsTrends.isPositive
                ? `Total active Defect(s) are decreased by ${Math.abs(
                    defectsTrends.difference,
                  )}`
                : `Total active Defect(s) are increased by ${Math.abs(
                    defectsTrends.difference,
                  )}`
              : `Total active Defect(s) are ${Math.abs(
                  defectsTrends.lastSprintCount,
                )} as per last sprint`
            : ''
        }
        tooltipData={defectsTrends?.lastSprintIssuesPriority ?? null}
        showGreenArrowUp={false}
        showRedArrowDown={false}
      />

      <InfoText
        text={Strings.names.committed}
        optionalText={`(${Strings.names.story_points})`}
        count={
          committedStoryPoints != null
            ? committedStoryPoints.lastSprintCount
            : '0'
        }
        countVariation={
          committedStoryPoints != null ? committedStoryPoints.difference : 0
        }
        isPositive={
          committedStoryPoints != null ? committedStoryPoints.isPositive : null
        }
        tooltipText={
          committedStoryPoints != null
            ? committedStoryPoints.difference != 0
              ? committedStoryPoints.isPositive
                ? `Committed Story Point(s) increased by ${Math.abs(
                    committedStoryPoints.difference,
                  )}`
                : `Committed Story Point(s) decreased by ${Math.abs(
                    committedStoryPoints.difference,
                  )}`
              : `Committed Story Point(s) are same as in previous sprint`
            : ''
        }
        tooltipData={committedStoryPoints?.lastSprintIssuesPriority ?? null}
      />

      <InfoText
        text={Strings.names.velocity}
        optionalText={`(${Strings.names.story_points})`}
        count={
          completedStoryPoints != null
            ? completedStoryPoints.lastSprintCount
            : '0'
        }
        countVariation={
          completedStoryPoints != null ? completedStoryPoints.difference : 0
        }
        isPositive={
          completedStoryPoints != null ? completedStoryPoints.isPositive : null
        }
        tooltipText={
          completedStoryPoints != null
            ? completedStoryPoints.difference != 0
              ? completedStoryPoints.isPositive
                ? `Completed Story Point(s) increased by ${Math.abs(
                    completedStoryPoints.difference,
                  )}`
                : `Completed Story Point(s) decreased by ${Math.abs(
                    completedStoryPoints.difference,
                  )}`
              : `Completed Story Point(s) are same as in previous sprint`
            : ''
        }
        tooltipData={completedStoryPoints?.lastSprintIssuesPriority ?? null}
      />

      <InfoText
        text={Strings.names.effort_variance}
        optionalText={`(${Strings.names.hours})`}
        count={effortRate != null ? effortRate.lastSprintCount : '-'}
        countVariation={effortRate != null ? effortRate.difference : 0}
        isPositive={effortRate != null ? effortRate.isPositive : null}
        tooltipText={
          effortRate != null
            ? effortRate.difference != 0
              ? effortRate.isPositive
                ? `Difference between Actual Effort and Estimated Effort decreased by ${Math.abs(
                    effortRate.difference,
                  )}`
                : `Difference between Actual Effort and Estimated Effort increased by ${Math.abs(
                    effortRate.difference,
                  )}`
              : `Difference between Actual Effort and Estimated Effort are same as in previous sprint`
            : ''
        }
        tooltipData={effortRate?.lastSprintIssuesPriority ?? null}
        showGreenArrowUp={false}
        showRedArrowDown={false}
      />
    </View>
  );
};

const showCharts = productReport => {
  return (
    <View>
      {hasChartData(
        productReport.storyPointsEstimates,
        'storyPointsDetails',
      ) ? (
        <BarChart
          chartName={`${Strings.names.committed} vs ${Strings.names.completed}`}
          report={productReport.storyPointsEstimates[0]}
          legends={[
            {name: Strings.names.committed, color: Theme.colors.borderColor},
            {name: Strings.names.completed, color: Theme.colors.logoutColor},
          ]}
          sprintNames={getSprintNames(
            productReport.storyPointsEstimates[0].storyPointsDetails,
          )}
          yAxisName={Strings.names.story_points}
          values={getChartValues(
            productReport.storyPointsEstimates[0].storyPointsDetails,
            ['comittedStoryPoints', 'completedStoryPoints'],
          )}
        />
      ) : null}
      {hasChartData(productReport.effortVariance, 'estimatesDetails') ? (
        <BarChart
          chartName={Strings.names.effort_variance}
          report={productReport.effortVariance[0]}
          legends={[
            {name: Strings.names.estimated, color: Theme.colors.borderColor},
            {name: Strings.names.actual, color: Theme.colors.logoutColor},
          ]}
          sprintNames={getSprintNames(
            productReport.effortVariance[0].estimatesDetails,
          )}
          yAxisName={Strings.names.hours}
          values={getChartValues(
            productReport.effortVariance[0].estimatesDetails,
            ['estimatedEffort', 'actualEffort'],
          )}
        />
      ) : null}

      {hasChartData(
        productReport.defectInjectionRate,
        'defectInjectionRates',
      ) ? (
        <LineChart
          chartName={Strings.names.defects_injection_rate}
          report={productReport.defectInjectionRate[0]}
          legends={[
            {name: Strings.names.defect_count, color: Theme.colors.logoutColor},
          ]}
          sprintNames={getSprintNames(
            productReport.defectInjectionRate[0].defectInjectionRates,
          )}
          yAxisName={Strings.names.number_of_defects}
          values={getChartValues(
            productReport.defectInjectionRate[0].defectInjectionRates,
            ['defectsCount'],
          )}
          data={getLineChartData(
            productReport.defectInjectionRate[0].defectInjectionRates,
          )}
        />
      ) : null}

      {hasChartData(productReport.timeSpentAnalysis, 'timeSpentFactors') ? (
        <BarChart
          chartName={Strings.names.time_bugs_chart_name}
          report={productReport.timeSpentAnalysis[0]}
          legends={[
            {name: Strings.names.bugs, color: Theme.colors.borderColor},
            {name: Strings.names.stories, color: Theme.colors.logoutColor},
          ]}
          sprintNames={getSprintNames(
            productReport.timeSpentAnalysis[0].timeSpentFactors,
          )}
          yAxisName={Strings.names.hours}
          values={getChartValues(
            productReport.timeSpentAnalysis[0].timeSpentFactors,
            ['timeSpentOnBugs', 'timeSpentOnStories'],
          )}
        />
      ) : null}
      {hasChartData(productReport.defectsTrends, 'defectTrends') ? (
        <BarChart
          chartName={Strings.names.defects_trend}
          report={productReport.defectsTrends[0]}
          legends={[
            {
              name: Strings.names.total_defects,
              color: Theme.colors.borderColor,
            },
            {
              name: Strings.names.defects_injected_sprint,
              color: Theme.colors.logoutColor,
            },
            {
              name: Strings.names.story_defects_injected,
              color: Theme.colors.orange,
            },
          ]}
          sprintNames={getSprintNames(
            productReport.defectsTrends[0].defectTrends,
          )}
          yAxisName={Strings.names.defects_count}
          values={getChartValues(productReport.defectsTrends[0].defectTrends, [
            'totalDefectsAcrossProduct',
            'independentDefectsInjectedInCurrentSprint',
            'storyDefectsInjectedInCurrentSprint',
          ])}
        />
      ) : null}
      {hasChartData(productReport.sprintTrends, 'trends') ? (
        <BarChart
          chartName={Strings.names.trend_across_sprints}
          report={productReport.sprintTrends[0]}
          legends={[
            {name: Strings.names.completed, color: Theme.colors.green},
            {
              name: Strings.names.completed_outside_sprint,
              color: Theme.colors.blue,
            },
            {name: Strings.names.not_completed, color: Theme.colors.red},
            {name: Strings.names.punted, color: Theme.colors.skyblue},
          ]}
          sprintNames={getSprintNames(productReport.sprintTrends[0].trends)}
          yAxisName={Strings.names.tickets_count}
          values={getChartValues(productReport.sprintTrends[0].trends, [
            'completedIssuesCount',
            'issuesCompletedOutsideSprintCount',
            'issuesNotCompletedCount',
            'puntedIssuesCount',
          ])}
        />
      ) : null}
    </View>
  );
};

const hasChartData = data => {
  return data != undefined && data.length > 0;
};

const getSprintNames = data => {
  if (data.length === 0) {
    return ['0', '1', '2', '4', '5'];
  }
  return data.map(item => item.sprintName);
};

const getChartValues = (data, keys) => {
  if (data.length === 0) {
    return [
      [0, 0],
      [0, 0],
    ];
  }
  const val = keys.map(key => {
    return data.map(item => item[key]);
  });

  return val;
};

const mapStateToProps = state => {
  return {
    productReport: state.ReportReducer.productReport,
    productSprint: state.ReportReducer.productSprint,
    dashboardData: state.ProductReducer.dashboardData,
    error: state.ReportReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getReport,
      getProductSprint,
      getSprintReport,
      resetReportData,
    },
    dispatch,
  );
};

const getLineChartData = values => {
  const data = values.map((item, index) => {
    const x = index + 1;
    const obj = {x: x, y: item.defectsCount};
    return obj;
  });

  return data;
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
