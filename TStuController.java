package com.dv.dvademo.controller;


import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dv.dvademo.entity.TStu;
import com.dv.dvademo.mapper.TStuMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.lang.invoke.MethodType;
import java.lang.reflect.Method;
import java.util.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author dv
 * @since 2019-04-26
 */
@Controller
@RequestMapping("/t-stu")
public class TStuController {

    @Autowired
    private TStuMapper tStuMapper;

    /**
     * 获取所有信息
     * @param request
     * @param response
     * HttpServletRequest request, HttpServletResponse response,
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/getAll",method = RequestMethod.POST)
    public Map<String,Object> getAll(HttpServletRequest request,HttpServletResponse response){

        Map<String,Object> map = new HashMap<String,Object>();
        List<TStu> list = new ArrayList<TStu>();

        String current = request.getParameter("page");
        String pageSize = request.getParameter("pageSize");

        String searchName = request.getParameter("searchValue");
//        IPage<T> page, @Param("ew") Wrapper<T> queryWrapper

//        String current1 = params.get("page").toString();
//        String pageSize1 = params.get("pageSize").toString();
//        String searchName1 = params.get("searchValue").toString();

//        System.out.println(current);
        Page pp= new Page();
        pp.setCurrent(Long.parseLong(current));
        pp.setSize(Long.parseLong(pageSize));
//        pp.setDesc("DESC");
//        pp.setSize(Long.parseLong(pageSize));
//        pageSizepp.setDesc;
//        IPage<TStu>  tt  = new IPAGE

        boolean flag = false;
        IPage<TStu>  tt = null;
        try{
//            list = tStuMapper.getAll();
//            if(StringUtils.isNotEmpty(searchName)){
//                tt = tStuMapper.selectPageByStuName(pp,searchName);
//            }else{
//                tt = tStuMapper.selectPageVo(pp);
//
//            }
              tt = tStuMapper.selectPageByStuName(pp,searchName);
//            IPage<TStu>  t1 = tStuMapper.select

//            System.out.println(tt);
//            list = tt.getRecords();
//            System.out.println(list);
//            list = tStuMapper.selectMapsPage();
            flag = true;
        }catch (Exception e){
            e.printStackTrace();
        }
        map.put("flag",flag);
        map.put("data",tt);

        return map;

    }

    /**
     * 删除
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping(value ="/deleteById")
    public Map<String,Object> deleteById(HttpServletRequest request,HttpServletResponse response){
        Map<String,Object> map = new HashMap<String,Object>();
        boolean flag = false ;
        String stuid = request.getParameter("stuid");
        try{
            int count  =  tStuMapper.deleteById(stuid);
            flag = true ;

        }catch (Exception e ){
            e.printStackTrace();
        }
        map.put("flag",flag);
        return map;
    }

    /**
     * 新增
     *      会报错，oracle id 触发器 序列等
     *      这样配置的话dao接口上会默认返回insert之后返回的id
     *      org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.executor.ExecutorException:
     *      Error getting generated key or setting result to parameter object. Cause: java.lang.NullPointerException
     */
    @ResponseBody
    @RequestMapping(value ="/addData")
    public Map<String,Object> addData(HttpServletRequest request,HttpServletResponse response){
        Map<String,Object> map = new HashMap<String,Object>();
        boolean flag = false ;
        int count = 0;
        String stuName = request.getParameter("stuName");
        String sex = request.getParameter("sex");



        if(StringUtils.isNotEmpty(stuName) && StringUtils.isNotEmpty(sex)){

            TStu tStu = new TStu();
//            long i = 100;
            tStu.setStuid(UUID.randomUUID().toString().replaceAll("-",""));
            tStu.setStuname(stuName);
            tStu.setStusex(sex);
            try{

               count  =  tStuMapper.insert(tStu);


               flag = true ;
            }catch (Exception e ){
                e.printStackTrace();
            }
        }

        map.put("flag",flag);
        map.put("count",count);
        return map;
    }

    /**
     * 修改
     */
    @ResponseBody
    @RequestMapping(value = "/editData")
    public Map<String,Object> editData(HttpServletRequest request,HttpServletResponse response){
        Map<String,Object> map = new HashMap<String,Object>();

        String id = request.getParameter("stuId");
        String stuName = request.getParameter("stuName");
        String sex = request.getParameter("sex");
        int count = 0;

        if(StringUtils.isNotEmpty(id)&&StringUtils.isNotEmpty(stuName)&&StringUtils.isNotEmpty(sex)){
            TStu tStu = new TStu();
            tStu.setStuid(id);
            tStu.setStuname(stuName);
            tStu.setStusex(sex);
            try{
                count = tStuMapper.updateById(tStu);
//              tStuMapper.update(tStu, Wrapper<T> tStu);


            }catch (Exception e){
                e.printStackTrace();
            }

        }
        map.put("count",count);
        return map;
    }

}

