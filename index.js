import React from "react";
import styles from "./index.less";

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import 'echarts/lib/component/legend';
import 'echarts-liquidfill';


class FormHall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    Test=(param)=>{
        return (
            // <div>
            //     <span>${param.value * 100 + '%'}</span>
            //     <span>${param.name}</span>
            // </div>
            param.value * 100 + '%'+'\n'+'\n'+param.name
        
            // (<div className={styles.test}>
            //      <span className={styles.test_s1}>${param.value * 100 + '%'}</span>
            //      <span>${param.name}</span>
            // </div>);
        )
    }

    getOption = () => {

        const data = this.state.data;

        const option =
        {

            series: [{
                type: 'liquidFill',
                // radius: '40%',
                // shape: 'diamond',
                // center: ['25%', '25%'],
                data: [{
                    name: '完成度',
                    value: 0.75,
                    // direction: 'left',
                    itemStyle: {
                        color: '#59B3F8',
                        fontSize: 14
                    }
                },
                {
                    // name: "数据名称",
                    value: 0.5,
                    direction: 'left',
                    itemStyle: {
                        color: '#70BFFA'
                    }
                }
                ],
                outline: {
                    show: false
                },
                backgroundStyle: {
                    // borderWidth: 5,
                    // borderColor: 'red',
                    color: '#42A4F6'
                },
                label: {
                    position: ['50%', '50%'],
                    // formatter: function(param) {
                    //    return <div>${param.name}</div>
                    // },
                    formatter: param=>this.Test(param),
                    fontSize: 30,
                    color: '#DFEBFF'
                },
               
            }]
        }


        return option;
    }

    render() {
        return (
            <div className={styles.box}>
                <ReactEchartsCore
                    echarts={echarts}
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ height: 500, width: 500 }}
                />
                );
            </div>
        );
    }
}

export default FormHall;