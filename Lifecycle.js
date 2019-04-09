import React, { Component } from 'react';


/**
 *  react 生命周期函数
 * 
 * 组件加载之前，组件加载完成，以及组件更新数据，组件销毁
 * 
 * 触发的一系列的 方法，这就是组件的生命周期函数
 * 
 * 
 * 组件加载的时候触发的函数
 * 
 * constructor 、componentWillMount  render componentDidMount
 * 
 * 组件数据更新的时候触发的生命周期函数
 * 
 * shouldComponentUpdate  componentWillUpdate render componentDidUpdate
 * 
 * 你在父组件里面改变props传值的时候触发的：
 * componentWillReaceiveProps 
 * 
 * 
 * 组件销毁的时候触发
 * 
 * componentWillUnmount
 */
class Lifecycle extends Component {
    //第1执行
    constructor(props) {
        console.log('01构造函数');
        super(props);
        this.state = { 
            msg:'生命周期函数组件msg'
         };
    }

    //第2、组件将要挂载的时候触发生命周期函数
    componentWillMount(){
        console.log('02 组件将要挂载');
    }


   // 第4、组件挂载完成的时候触发生命周期函数  只能加载完才可以执行dom操作
    componentDidMount(){
        //dom 操作放在这个里面 请求数据也放在这个里面
        console.log('04 组件完成挂载');
        // this.getData();
    }
    //是否要更新数据 如果返回true 才会执行更新数据
    shouldComponentUpdate(nextProps,nextState){
        console.log('01组件是否要更新数据');

        console.log(nextProps);

        console.log(nextState);
        return true;
    }

    //将要更新的数据的时候触发
    componentWillUpdate(){
        console.log('02 组件将要更新');
    }
    //组件更新完成
    componentDidUpdate(){
        console.log('04 组件更新完成');
    }

    //组件销毁的时候触发的生命周期函数  用在组件销毁的时候执行操作
    componentWillUnmount(){
        console.log('组件销毁了');
    }

    //你在父组件里面改变props传值的时候触发的：
   componentWillReceiveProps(){
        console.log('我是父组件传值，父组件里面改变了props的值触发的方法')
   }

    setMsg=()=>{
        this.setState({
            msg:'我是改变之后的msg值'
        })
    }
    //第3 执行reder函数
    render() {
        
        console.log('03 数据渲染render');
        return (
            <div>
                生命周期函数演示 ====={this.state.msg}

                <br />
                <br />

                <button onClick={this.setMsg}>更新msg的数据</button>
            </div>
        );
    }
}

export default Lifecycle;