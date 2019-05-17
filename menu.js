import asyncComponent from "utils/asyncComponent"; //按需加载组件
import formAudit from "../layout/personal/FormAudit/formAudit";

// 表单大厅
const FormHall = asyncComponent({
    loader: () => import("../layout/form/index"),
    models: () => [import("../layout/form/model")]
});

// 个人中心
const PersonalCenter = asyncComponent({
    loader: () => import("../layout/personal/index"),
    models: () => [import("../layout/personal/model")]
});

// 采集管理
const CollectionManagement = asyncComponent({
    loader: () => import("../layout/collection/index")
});

// 报表管理
const ReportManagement = asyncComponent({
    loader: () => import("../layout/report/index"),
    models: () => [import("../layout/report/model")]
});

//表样审核
const FormReviewAll = asyncComponent({
    loader: () => import("../layout/personal/FormAudit/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//表样审核
const FormReviewList = asyncComponent({
    loader: () => import("../layout/personal/FormAudit/FormReview/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//填表审核
const fillinForm = asyncComponent({
    loader: () => import("../layout/personal/FormAudit/fillinForm/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//表样审核页
const FormAudit = asyncComponent({
    loader: () => import("../layout/personal/FormAudit/formAudit/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//填表审核页
const fillAudit = asyncComponent({
    loader: () =>
        import("../layout/personal/FormAudit/fillinForm/fillAudit/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//个人中心普通用户
const PersonalCenterCommonUsers = asyncComponent({
    loader: () => import("../layout/personal/commonusers/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//个人中心普通用户
const MyForm = asyncComponent({
    loader: () => import("../layout/personal/commonusers/myForm/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

//任务审核列表
const taskExamine = asyncComponent({
    loader: () => import("../layout/personal/taskExamine/index")
    // models: () => [import("../layout/personal/formReview/model")]
});

const Form = asyncComponent({
    loader:() =>import("../layout/personal/FormAudit/index")
})


// 主菜单
const menuData = [
    {
        name: "表单大厅",
        path: "index",
        component: FormHall
    },
    {
        name: "个人中心",
        path: "personal",
		component: PersonalCenter,
		// authority: ['admin'],
        hidechild: true,
        children: [
      
             {
                name: "表样审核",
                path: "form",
                component: Form,
                children: [
                    {
                        name:'表样审核',
                        path: "formReview",
                        component: FormReviewList,
                    },
                    {
                        name:'填表审核',
                        path: "fillinForm",
                        component: fillinForm,
                    }
                ]
            },

            // {
            //     name: "表样审核",
            //     path: "form/formReview",
            //     component: FormReviewList,
            //     children: [
            //         {
            //             name: "表样审核审核页",
            //             path: "list",
            //             component: FormAudit
            //         }
            //     ]
            // },
            // {
            //     name: "填表审核",
            //     path: "form/fillinForm",
            //     component: fillinForm,
            //     children: [
            //         {
            //             name: "填表审核查看",
            //             path: "list",
            //             component: fillAudit
            //         }
            //     ]
            // },
            // {
            //     name: "我的填表",
            //     path: "myForm",
            //     component: MyForm
            // },
            // {
            //     name: "填表任务",
            //     path: "taskExamine",
            //     component: taskExamine,
            //     children: [

            //     ]
            // },            
        ]
    },
    {
        name: "个人中心",
		path: "personalCenterCommonUsers",
		authority: ['teacher'],
        component: PersonalCenterCommonUsers
    },
    {
        name: "采集管理",
        path: "collection",
        exact: false,
        component: CollectionManagement
    },
    { name: "报表管理", path: "report", component: ReportManagement }
];

//采集管理--普通采集
const Ordinary = asyncComponent({
    loader: () => import("../layout/collection/pages/ordinary/index"),
    models: () => [import("../layout/collection/pages/ordinary/model")]
});

// 采集管理二级菜单
const collectionMenu = [
    {
        name: "采集任务",
        path: "collection/task",
        children: [
            {
                name: "普通采集",
                path: "ordinary",
                component: Ordinary
            },
            {
                name: "循环采集",
                path: "loop"
            },
            {
                name: "过期采集",
                path: "expire"
            }
        ]
    },
    {
        name: "采集监控",
        path: "collection/monitor"
    },
    {
        name: "采集报告",
        path: "collection/report"
    }
];

// 个人中心二级菜单
//个人中心二级路由
const formMenu = [
    {
        name: "个人中心",
        path: "personal/form",
        children: [
            {
                name:'表样审核',
                path: "formReview",
                component: FormReviewList,
            },
            {
                name:'填表审核',
                path: "fillinForm",
                component: fillinForm,
            }
        ]
    },
]




function formatter(data, parentPath = "/", parentAuthority) {
    return data.map(item => {
        let { path } = item;
        const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
        if (!reg.test(path)) {
            path = parentPath + item.path;
        }
        const result = {
            key: path,
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
export const getCollectionMenu = () => formatter(collectionMenu);
