/*
 * Created by Wu Jian Ping on - 2024/12/17.
 */

import { PanelPlugin } from '@grafana/data';
import { ScatterPanel } from './components/ScatterPanel';
import { ScatterPanelOptions } from './types';

export const plugin = new PanelPlugin<ScatterPanelOptions>(ScatterPanel).setPanelOptions((builder) => {
  return builder
    .addFieldNamePicker({
      path: 'xAxisFieldName',
      name: 'X axis field name',
      category: ["Scatter"],
    })
    .addFieldNamePicker({
      path: 'yAxisFieldName',
      name: 'Y axis field name',
      category: ["Scatter"],
    })
    .addFieldNamePicker({
      path: 'sizeFieldName',
      name: 'Size field name',
      category: ["Scatter"],
    })
    .addFieldNamePicker({
      path: 'labelFieldName',
      name: 'Label field name',
      category: ["Scatter"],
    })
    .addTextInput({
      path: 'left',
      name: 'Left',
      defaultValue: '8%',
      category: ["Layout"]
    })
    .addTextInput({
      path: 'right',
      name: 'Right',
      defaultValue: '8%',
      category: ["Layout"]
    })
    .addTextInput({
      path: 'top',
      name: 'Top',
      defaultValue: '8%',
      category: ["Layout"]
    })
    .addTextInput({
      path: 'bottom',
      name: 'Bottom',
      defaultValue: '8%',
      category: ["Layout"]
    })
});
