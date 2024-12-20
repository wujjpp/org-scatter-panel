/*
 * Created by Wu Jian Ping on - 2024/12/17.
 */

import * as echarts from 'echarts';

import { EChartsParams, ScatterPanelOptions } from 'types';

import { PanelDataErrorView } from '@grafana/runtime';
import { PanelProps } from '@grafana/data';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import _ from 'lodash';

interface Props extends PanelProps<ScatterPanelOptions> {}


export const colors = {
  red: 'rgb(242, 73, 92)',
  green: 'rgb(115, 191, 105)',
  yellow: 'rgb(255, 152, 48)',
  white: '#fff',
  blue: 'rgb(110, 159, 255)',
  lightYellow: 'rgb(250, 222, 42)',
  purple: '#d877d9',
  gray: '#888',
  border: 'rgba(204, 204, 220, 0.12)',
  borderActive: 'rgba(204, 204, 220, 0.2)',
  redArea: 'rgba(242, 73, 92, 0.3)',
  greenArea: 'rgb(115, 191, 105, 0.3)',
  text: 'rgb(204, 204, 220)',
  pureRed: '#ff0000',
  pureGreen: '#00ff00',
}


const getCell = (labelWidth: number, label: string, value: string, color = ""): string => {
  if(color) {
    return `
      <div style="display:flex;flex-direction:row;">
        <div style="min-width:${labelWidth}px;text-align:right;">${label}</div>
        <div style="flex:1; text-align:right;color:${color}">${value}</div>
      </div>`
  }
  return `
    <div style="display:flex;flex-direction:row;">
        <div style="min-width:${labelWidth}px;text-align:right;">${label}</div>
        <div style="flex:1; text-align:right;color:${colors.white}">${value}</div>
    </div>`
}


export const ScatterPanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {  
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

  const _getCell = _.partial(getCell, options.tooltipLabelWidth || 160)

  const items: any[][] = []

  for(let i = 0; i < data.series[0].length; ++i) {
    items.push([
      xAxisField.values[i],
      yAxisField.values[i],
      sizeField.values[i],
      labelField.values[i]
    ])
  }
  const option = {
    backgroundColor: 'transparent',
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
      },
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {margin: 16},
      scale: true
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {margin: 16},
      scale: true
    },
    tooltip: {
      show: true,
      trigger: 'item',
      borderWidth: 1,
      borderColor: colors.border,
      padding: 4,
      backgroundColor: 'rgba(24, 27, 31, 0.9)',
      borderRadius: 0,
      textStyle: {
        color: colors.text
      },
      formatter: (param: EChartsParams): string => {
        let s = `<div style="width: ${options.tooltipWidth}px">`
        for(const name of options.addtionFieldsForTooltip) {
          const field = _.find(data.series[0].fields, f => f.name === name)
          if(field) {
            s += _getCell(name, field.values[param.dataIndex])
          }
        }
        s += '</div>'
        return s
      }
    },
    series: [
      {
        data: items,
        type: 'scatter',
        symbolSize: (d: any[]) => {
          return d[2] * options.sizeFactor
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetY: 5,
          color: (params: any) => {
            const p = params.data[2]
            if(p >= 70) {
              return new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 166, 176)'
                },
                {
                  offset: 1,
                  color: 'rgb(242, 73, 92)'
                }
              ])
            } else {
              return new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: 'rgb(200, 242, 194)'
                },
                {
                  offset: 1,
                  color: 'rgb(115, 191, 105)'
                }
              ])
            }
          }
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
