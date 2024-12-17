/*
 * Created by Wu Jian Ping on - 2024/12/17.
 */

export interface ScatterPanelOptions {
  xAxisFieldName: string;
  yAxisFieldName: string;
  sizeFieldName: string;
  labelFieldName: string;
  sizeFactor: number;


  left: string;
  right: string;
  top: string;
  bottom: string;

  tooltipWidth: number;
  tooltipLabelWidth: number;
  addtionFieldsForTooltip: string[];
}


export interface EChartsParams {
  componentType: 'series',
  // 系列类型
  seriesType: string,
  // 系列在传入的 option.series 中的 index
  seriesIndex: number,
  // 系列名称
  seriesName: string,
  // 数据名，类目名
  name: string,
  // 数据在传入的 data 数组中的 index
  dataIndex: number,
  // 传入的原始数据项
  data: any,
  // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
  value: number | any[] | Object,
  // 坐标轴 encode 映射信息，
  // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
  // value 必然为数组，不会为 null/undefined，表示 dimension index 。
  // 其内容如：
  // {
  //     x: [2] // dimension index 为 2 的数据映射到 x 轴
  //     y: [0] // dimension index 为 0 的数据映射到 y 轴
  // }
  encode: Object,
  // 维度名列表
  dimensionNames: string[],
  // 数据的维度 index，如 0 或 1 或 2 ...
  // 仅在雷达图中使用。
  dimensionIndex: number,
  // 数据图形的颜色
  color: string,
  // 饼图/漏斗图的百分比
  percent: number,
  // 旭日图中当前节点的祖先节点（包括自身）
  treePathInfo: any[],
  // 树图/矩形树图中当前节点的祖先节点（包括自身）
  treeAncestors: any[]
}
