export const ruyjs = {
    title: "入托一件事",
    column: [{
        addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
        icon: "/static/image/icon1.png",
        icontype: "ruyjs",
        title: "宝宝档案"
    }, {
        addurl: 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/rytj/',
        icon: "/static/image/icon2.png",
        icontype: "ruyjs",
        title: "入园体检"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/checkOnschool?url=nursery/checkOnschool',
        icon: "/static/image/icon3.png",
        icontype: "ruyjs",
        title: "体检信息"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/nurseryInstitution2?url=nursery/nurseryInstitution2&page=1&pageSize=20&hospitalid=41',
        icon: "/static/image/icon4.png",
        icontype: "ruyjs",
        title: "托育机构"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/mynurseryCourse?url=nursery/mynurseryCourse&page=1&pageSize=10',
        icon: "/static/image/icon5.png",
        icontype: "ruyjs",
        title: "我的课程"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/mynurseryPoints?url=nursery/mynurseryPoints',
        icon: "/static/image/icon6.png",
        icontype: "ruyjs",
        title: "学习档案"
    }]
}
export const zayjs = {
    title: "在托一件事",
    column: [{
        url: '/pages/childOrder/index',
        icon: "/static/image/icon21.png",
        icontype: "zayjs",
        title: "体检提醒"
    }, {
        url: '/pages/evaluation/index',
        icon: "/static/image/icon22.png",
        icontype: "zayjs",
        title: "社会评价"
    }, {
        addurl: 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/kidsorginfo/',
        icon: "/static/image/icon23.png",
        icontype: "zayjs",
        title: "考勤上报"
    }, {
        addurl: 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/kidsteacher/',
        icon: "/static/image/icon24.png",
        icontype: "zayjs",
        title: "教师服务"
    }]
}
export const jgyjs = {
    title: "监管一件事",
    column: [{
        addurl: 'http://wx.fybj365.com/weixin/nurseryInstitution2?url=nursery/nurseryInstitution2&page=1&pageSize=10&hospitalid=41',
        icon: "/static/image/icon4.png",
        icontype: "jgyjs",
        title: "托育机构"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/jianKangGuanLi?url=nursery/jianKangGuanLi&page=1&pageSize=10&hospitalid=41',
        icon: "/static/image/icon32.png",
        icontype: "jgyjs",
        title: "健康管理"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/nurseryCheckPlan?url=nursery/nurseryCheckPlan&page=1&pageSize=10',
        icon: "/static/image/icon33.png",
        icontype: "jgyjs",
        title: "监督一件事"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/kaoqinguanli?url=nursery/kaoqinguanli&page=1&pageSize=10&hospitalid=41',
        icon: "/static/image/icon34.png",
        icontype: "jgyjs",
        title: "考勤监督"
    }]
}
export const mzjkNavIcons = [{
    title: "母子健康",
    images: "/static/icons/icon_home_zzjk.png",
    url: "/pages/healthyBoth/index",
    text: "mzjk"
}, {
    title: "医生助手",
    images: "/static/icons/icon_home_yszs.png",
    url: "/pages/DoctorAss/index",
    text: "yszs"
}, {
    title: "母婴学堂",
    images: "/static/icons/icon_home_mykt.png",
    url: "https://appuv0dgrco8427.h5.xiaoeknow.com/homepage/10",
    text: "myxt"
}, {
    title: "孕育百科",
    images: "/static/icons/icon_home_yybk.png",
    url: "",
    text: "yybk"
}]
export function getQueryString(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
export function getAge(birthday) {
    //    根据生日获取当前年龄：岁+月+天
    var date0 = new Date()
    var year = getYear(date0) - getYear(birthday)
    var month = getMonth(date0) - getMonth(birthday)
    var day = getDay(date0) - getDay(birthday)
    if (day < 0) {
        day = 30 + day
        month -= 1
    }
    if (month < 0) {
        month = 12 + month
        year -= 1
    }
    var sui = year + '岁' + month + '月' + day + '天'
    return sui
}
function getYear(date) {
    return new Date(date).getFullYear()
}
function getMonth(date) {
    return new Date(date).getMonth()
}
function getDay(date) {
    return new Date(date).getDate()
}


export function navigateToRegist() {
    setTimeout(() => {
        window.location.href = "http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/kidsteacher/";
    }, 2000);
}
//验证手机号码
export function validatePhone(number) {
    return /^(\d3,4|\d{3,4}-|\s)?\d{7,14}$/.test(number);
}
//验证身份证
export function validateId(number) {
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(number);
}
//判断验证是否符合要求，合法性校验
export function validate(key) {
    let bool = true;
    if (!this.rules[key].rule.test(this[key])) {
        //提示信息
        uni.showToast({
            title: this.rules[key].msg,
        })
        //取反
        bool = false;
        return false;
    }
    return bool;
}