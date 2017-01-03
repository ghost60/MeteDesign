//导航栏
import React from 'react';
import ReactHighcharts from 'react-highcharts';
import './LineChart.scss';

var chartconfig={
    title:"title",
    xtitle:"xtitle",
    xname:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ytitle:"ytitle",
    tooltip:"tooltip",

}
var data=[{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }
]

class LineChart extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){

    }
    render() {
        var config= {
            title: {
                text: chartconfig.title,
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: chartconfig.xname
            },
            yAxis: {
                title: {
                    text: chartconfig.title
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: chartconfig.tooltip?null:""
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: data
        };
        return <div><ReactHighcharts config={config} ref="chart"></ReactHighcharts></div>;
    }
};
export default LineChart;
