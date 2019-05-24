

import React, { Component } from 'react';

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import 'echarts/lib/component/legend';

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: props.data.height, //获取柱状图高度
            data: props.data,     //获取柱状图数据
            
        };

        console.log(this.state.data);
    }

    getOption = () => {

        const data = this.state.data;

        const option =
        {
            color: data.color,
            title: {

            },
            tooltip: {},
            legend: {
                data: data.legend
            },
            xAxis: {
                data: data.x_data
            },
            yAxis: {},
            series: data.series_data
        }


        return option;
    }

    render() {
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
				lazyUpdate={true}
                style={{ height: this.state.data.height }}
            />
        );
    }
}

export default Bar;