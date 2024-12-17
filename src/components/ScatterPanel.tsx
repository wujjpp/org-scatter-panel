/*
 * Created by Wu Jian Ping on - 2024/12/17.
 */

import * as echarts from 'echarts';

import { PanelDataErrorView } from '@grafana/runtime';
import { PanelProps } from '@grafana/data';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ScatterPanelOptions } from 'types';
import _ from 'lodash';

interface Props extends PanelProps<ScatterPanelOptions> {}

export const ScatterPanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  

  console.log(data.series[0])
  
  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const xAxisField = _.find(data.series[0].fields, o => o.name === (options.xAxisFieldName || 'x'))
  const yAxisField = _.find(data.series[0].fields, o => o.name === (options.yAxisFieldName || 'y'))
  const sizeField = _.find(data.series[0].fields, o => o.name === (options.sizeFieldName || 'size'))
  const labelField = _.find(data.series[0].fields, o => o.name === (options.labelFieldName || 'label'))

  
  if(_.isUndefined(xAxisField) || _.isUndefined(yAxisField) || _.isUndefined(sizeField) || _.isUndefined(labelField)) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const items: any[][] = []

  for(let i = 0; i < data.series[0].length; ++i) {
    items.push([
      xAxisField.values[i],
      yAxisField.values[i],
      sizeField.values[i],
      labelField.values[i]
    ])
  }

  console.log(items)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      show: true
    },
    grid: {
      left: options.left,
      top: options.top,
      right: options.right,
      bottom: options.bottom
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      scale: true
    },
    series: [
      {
        data: items,
        type: 'scatter',
        symbolSize: (d: any[]) => {
          return d[2]
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: 'rgb(251, 118, 123)'
            },
            {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }
          ])
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      notMerge={false}
      lazyUpdate={true}
      style={{height: `${height}px`, width: `${width}px`}}
      theme={"dark"}
  />)
};
