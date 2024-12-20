/*
 * Created by Wu Jian Ping on - 2024/12/17.
 */

import { FieldOverrideContext, PanelPlugin } from '@grafana/data';

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
    .addNumberInput({
      path: 'sizeFactor',
      name: 'Size factor',
      defaultValue: 1,
      category: ["Scatter"]
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

    .addNumberInput({
      path: 'tooltipWidth',
      name: 'Tooltip width',
      defaultValue: 220,
      category: ["Tooltip settings"],
    })
    .addNumberInput({
      path: 'tooltipLabelWidth',
      name: 'Tooltip label width',
      defaultValue: 110,
      category: ["Tooltip settings"],
    })

    .addMultiSelect({
      path: 'addtionFieldsForTooltip',
      name: 'Addtion fields in tooltip',
      description: 'Append addtional fields in tooltip',
      category: ["Tooltip settings"],
      settings: {
        options: [],
        getOptions: (context: FieldOverrideContext) => {
          const items: any[] = []
          if (context.data.length > 0) {
            const fields = context.data[0].fields
            for (const f of fields) {
              items.push({
                label: f.name,
                value: f.name
              })
            }
          }
          return Promise.resolve(items)
        }
      }
    })
});
