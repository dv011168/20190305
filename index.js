import React,{Component} from 'react'; 
import { connect } from "react-redux";
import { query, post, postForm } from '../../../utils/AxiosUtil';
import qs from 'qs';
import axios from "axios";
import { Table, Divider, Tag ,Modal,Icon,Button,Radio,Input} from 'antd';
import { green } from '_ansi-colors@3.2.4@ansi-colors';
import styles from "./index.less";
import Highlighter from 'react-highlight-words';

// import {base} from '../../../utils/api'
//XX数据中心平台 

let base = '/restcloud/rest';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const Search = Input.Search;

@connect(state => {
	let { getdata } = state;
    return { getdata };
})
class GetOracleData extends Component {

    

     constructor(props) {
         super(props);
         console.log("构造函数");
         this.state = { 
             visible:false,
             sex:'男',
             inputValue:'',
             params:{"name":'你好'},
             columns:[
                 
             ],  //表头
             data:[],  //数据
             disabled:false,
             title:'',
             type:'',
             stuid:'',
             current:1,
             pageSize:5,
             total:0,
             searchText:'',
             searchValue:''
             
          };
     }

     //删除
     deleteById = (stuid) => {
        // console.log("函数deleteById:"+stuid);
        let data = {"stuid" : stuid};
        this.setState({
          type:'delete'
        })
        axios.post(`${base}/t-stu/deleteById`,qs.stringify(data)
            
        ).then((res)=>{

            if(res.data.flag){
                // console.log("删除成功！！");
                this.success();  //删除成功提示
                this.req();  //重新访问数据
            }

        }).catch((error)=>{

        })
    }

     deleteAction = (stuid) =>{
        // console.log("需要删除的id===="+idfd);
        confirm({
            title: <span style={{color:'red'}}>警告</span>,
            content: '你确认要删除该条记录吗?',
            onOk:()=> {
            //   console.log(this.state.params);
              this.deleteById(stuid);
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    
     componentWillMount = () =>{
        // let params = this.state.params;
        // console.log(params);
        console.log("willMount函数");
        //调用访问请求 得到数据列表
        this.setState({

        })
        this.req();
     }

     req = () =>{
        // let datas = this.state.params;

        let current = this.state.current;
        let pageSize = this.state.pageSize;
        let searchValue = this.state.searchValue;

        console.log("打印访问请求的时候的page======pageSize----searchValue-----："+current+pageSize+"========="+this.state.searchValue);

        let datas = {
          "page":current,
          "pageSize":pageSize,
          "searchValue":searchValue
        }

        const res= query(`${base}/t-stu/getAll`,datas); //res 是一个 Promise 对象 

        // console.log("分割===========================打印 res");
        console.log("分割===========================打印 res"+'\n',res);
        res.then((result)=>{
          // console.log("成功");
          console.log(result);
          if(result.flag){
            this.setState({
                data:result.data.records,
                total:result.data.total
            })
            }else{
                console.log(<span>请求发生错误！！请检查。</span>);
            }

        })

        // axios.post(`${base}/t-stu/getAll`, qs.stringify(datas))
        // // qs.stringify(datas))
        // .then((res) => {
        //     // console.log(res.data);
        //     if(res.data.flag){
        //         this.setState({
        //             data:res.data.data.records,
        //             total:res.data.data.total
        //         })
        //     }else{
        //         console.log(<span>请求发生错误！！请检查。</span>);
        //     }
            
        // })
        // .catch((err) => {
        //     // reject(err.data);
        // });
     } 

      success = () => {
        let title = '';
        let content = '';
        let ty = this.state.type;
        if(ty==='add'){
          title = '新增成功';
          content = "你已成功添加一条数据！";
        }else if(ty ==='edit'){
          title = '修改成功';
          content = "你已成功修改一条数据！";
        }else{
          title = '删除成功';
          content = "你已成功删除一条数据！";
        }
        Modal.success({
          title: title,
          content: content,
        });
      }

      //新增
      addData = () =>{
        // alert("新增");
        this.setState({
            visible:true,
            title:'新增',
            disabled:false,
            type:'add'
        })
      }

      handleOk = (e) => {
        // console.log(e);
        let ty = this.state.type;
        if(ty==='add'){
          let datas = {
            "stuName":this.state.inputValue,
            "sex":this.state.sex,
          };
          axios.post(`${base}/t-stu/addData`, qs.stringify(datas))
          .then((res)=>{
              if(res.data.flag){
                  // console.log("新增成功！！");
                  this.success();  //新增成功提示
                  this.cleanData(); //清空modal
                  this.req();  //重新访问数据
              }
          })
          .catch((error)=>{

          })
        }else if(ty === 'edit'){
            let datas = {
              "stuName":this.state.inputValue,
              "sex":this.state.sex,
              "stuId":this.state.stuid
            };
          axios.post(`${base}/t-stu/editData`, qs.stringify(datas))
          .then((res)=>{
              if(res.data.count!=0){
                  // console.log("修改成功！！");
                  console.log("=======打印修改后的count===="+res.data.count);
                  this.success();  //修改成功提示
                  this.cleanData(); //清空modal
                  this.req();  //重新访问数据
              }
          })
          .catch((error)=>{

          })
        
        }
        
      }

      newData = () =>{

      }

      //清空数据
      cleanData = () =>{
        this.setState({
            visible: false,
            sex: '男',
            inputValue:'',
            type:'',
            stuid:''
            
        })
      }

      getInputValue = (e) =>{
        // console.log(e.target.value);
        this.setState({
            inputValue:e.target.value,
        })
      }
    
      handleCancel = (e) => {
        // console.log(e);
        this.cleanData();
      }

      radioOnChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          sex: e.target.value,
        });
      }

      //查看
      readAction = (record) => {
        // console.log(record);
        this.setState({
          visible: true,
          disabled:true,
          title:'查看',
          inputValue:record.stuname,
          sex:record.stusex
        });
      }

      //修改
      editAction = (record) =>{
        this.setState({
          visible: true,
          disabled:false,
          title:'修改',
          inputValue:record.stuname,
          sex:record.stusex,
          type:'edit',
          stuid:record.stuid
        });
      }

      //页码改变
      onChangePage = (page, pageSize) =>{

        console.log("===========页码改变后的回调=========="+page, pageSize);
        //setState 同步执行，state 同步更新 
        this.setState({
          current:page,
          // pageSize:pageSize
        },()=>{
          this.req();
        })

        // this.setState({count:1},()=>{
        //   console.log(this.state.count)//输出count=1
        // });
        // setTimeout(()=>{
        //     console.log("页码改变后的page================"+this.state.current);
        //     this.req();
        //   },1 * 0)
        // this.req();
      }

      //pageSize 改变的回调
      onShowSizeChange = (current, size) =>{
         console.log("===========pageSize改变的回调=========="+current, size);
         this.setState({
          pageSize:size
         },()=>{
           this.req();
         })
      }


      showTotald = (total) => {
        // alert()
        return `总共有 ${total} 条记录`;
      }

      // record.stuname.indexOf(value) === 0,

      getSortData = (value,record)=>{

          // console.log(value,record);
          console.log(value);
          let count = 0;
          if(record.stuname.indexOf(value) != -1){
            // count++;
            return record;
          }

          // this.setState({
          //   total:count
          // })
          // console.log(value);
      }

      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }

      getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`请输入搜索 ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              查找
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })


      searchData = (value) =>{
        console.log("打印要搜索的输入的内容：=================="+value);

        this.setState({
          searchValue:value
        },()=>{this.req()})
        // this.req();
      }

      // clear = ()=>{
      //   alert();
      // }

     render() {

        const columns=[
                {
                    title: 'ID',
                    dataIndex: 'stuid',
                    key: 'stuid',
                    align:'center',
                    filterDropdownVisible:'true'
                },
                {
                    title: '名称',
                    dataIndex: 'stuname',
                    key: 'stuname',
                    with:'30%',
                    sorter: (a, b) => a.stuname.length - b.stuname.length,
                    defaultSortOrder: 'descend',
                    filters: [{
                      text: '1',
                      value: '1',
                    }, {
                      text: '是',
                      value: '是',
                    }],
                    onFilter: (value, record) => {return this.getSortData(value,record)},
                    filterIcon:()=>{return <Icon style={{ color:'#1890ff' ,backgroundColor:'#CCCCCC'}} type="caret-down" />} ,         //自定义过滤图标
                    // sortDirections: ['descend'], 支持的排序方式
                    ...this.getColumnSearchProps('stuname'),
                },
                {
                    title: '性别',
                    dataIndex: 'stusex',
                    key: 'stusex',
                    with:'10%'
                },{
                title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                        <a href="javascript:void(0);" style={{color:'green'}}  onClick={()=>this.readAction(record)}><Icon type="eye"></Icon><span style={{padding:'2px'}}>查看</span></a>
                        <Divider type="vertical" />
                        <a href="javascript:void(0);" onClick={()=>this.editAction(record)}><Icon type="edit"></Icon><span style={{padding:'2px'}}>修改</span></a>
                        
                        <Divider type="vertical" />
                        <a href="javascript:void(0);" style={{color:'red'}} onClick={()=>this.deleteAction(record.stuid)}><Icon type="delete"></Icon><span style={{padding:'2px'}}>删除</span></a>
                        </span>
                    ),
                    with:'30%'
        }]

       const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            //用户手动选择回调
            onSelect:(record, selected, selectedRows, nativeEvent) => {
                console.log(selected,selectedRows,record,nativeEvent);
                
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

          let disabled = this.state.disabled;

          //如果data中没有key  table属性中要加入rowkey
         return (
             <div className={styles.bigdiv}>
              <div className={styles.search_d}>
                  <Search
                      placeholder="请输入要查找的内容"
                      enterButton="查询"
                      className={styles.search_g}
                      size="large"
                      allowClear
                      onSearch={value => this.searchData(value)}
                  />
                </div>
             <div>
                文字高亮显示：
                <Highlighter
                      highlightClassName="YourHighlightClass"
                      searchWords={["and", "or", "the"]}
                      autoEscape={true}
                      textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
                />
             </div>
             
            <Modal
                title={this.state.title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okButtonProps={{ disabled: disabled }}
                cancelButtonProps={{ disabled: disabled }}
                >
                <div><span>用户名：</span><Input disabled={disabled} placeholder="请输入名称" onChange={this.getInputValue} value={this.state.inputValue} /></div>
                <div>
                    <span className={styles.spand}>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                    <RadioGroup className={styles.rd} onChange={this.radioOnChange} value={this.state.sex} disabled={disabled}>
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                     </RadioGroup>
                </div>
            </Modal>

                 {/* <div style={{margin:'5px'}}>Hello World！</div> */}
                 <Button type="primary" className={styles.add_btn} onClick={this.addData}>新增</Button>
                 <Table bordered 
                        title={() => 'Header'}
                        footer={() => 'Footer'} 
                        rowSelection={rowSelection} 
                        rowKey={record => record.stuid} 
                        columns={columns} 
                        dataSource={this.state.data}
                        
                        pagination={{
                          // defaultPageSize:this.state.pageSize,
                          // defaultCurrent:this.state.page,
                          pageSize:this.state.pageSize,
                          current:this.state.current,
                          showSizeChanger:true,
                          showQuickJumper:true,
                          total:this.state.total,
                          // showTotal={total => `Total ${total} items`},
                          //  showTotal:(total) => {return ` ${total} items`},
                          showTotal:(total) => {return this.showTotald(total)},      //显示多少条记录
                          onChange:(page, pageSize)=>{this.onChangePage(page, pageSize)},//页码改变的回调，参数是改变后的页码及每页条数
                          onShowSizeChange:(current, size)=>{this.onShowSizeChange(current, size)},//pageSize 变化的回调
                          // total:10
                        }} 
                  />
             </div>
         );
     }
 }
 
 export default GetOracleData;
