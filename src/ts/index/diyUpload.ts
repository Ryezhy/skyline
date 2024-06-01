import {ElMessage} from "element-plus";
import {ElNotification as notify} from "element-plus/es/components/notification/index";
import axios from "axios";

export function useDiyUpload( diyDialogVisible:any,uploadPath:any,diyPathList:any,diyTableData:any,diyDialogTitle:any) {
    let pathTemp = ""
    const diySelectFolder = (path:string) => { //选择文件夹
        if (path === "") {
            ElMessage.error('未选择地址');
        } else {
            pathTemp = path
        }
        if (pathTemp === "") {
            notify("未选择地址");
        }
        uploadPath.value = pathTemp
        diyDialogVisible.value = false
    }

    const diyToRoot = () => {
        diyPathList.value = [localStorage.getItem('username')]
        let file = {
            file_UUid: '',
            file_name: '',
            file_type: '',
            upload_time: '',
            file_path: '/' + localStorage.getItem('username'),
            file_size: '',
            file_hash: '',
        };
        diyGetFolder(file)
    }
    const diyUploadPath = (val: number) => {//打开对话框的初始化逻辑
        if (val === 1) {
            if (uploadPath.value.length === 0) {
                ElMessage.error('未选择地址');
            }
            diyDialogVisible.value = true//打开自定义文件路径对话框
            //开始获取初始文件夹列表
            let file = {
                file_UUid: '',
                file_name: '',
                file_type: '',
                upload_time: '',
                file_path: '',
                file_size: '',
                file_hash: '',
            };
            if (diyPathList.value.length === 1) {
                file.file_path = '/' + localStorage.getItem('username')
            } else {
                file.file_name = diyPathList.value.pop()
                file.file_path = '/' + diyPathList.value.join("/")
            }
            diyGetFolder(file)

        } else {
            if (uploadPath.value.length === 0) {
                ElMessage.error('未选择地址');
            }
        }
    }

    const toLastDivPath = () => {//返回上一级文件夹
        let file = {
            file_UUid: '',
            file_name: '',
            file_type: '',
            upload_time: '',
            file_path: '',
            file_size: '',
            file_hash: '',
        }
        if (diyPathList.value.length === 2) {//返回根目录的路径
            file.file_path = '/' + localStorage.getItem('username')
            diyPathList.value.pop()
            diyGetFolder(file)
        } else if (diyPathList.value.length > 2) { //返回非根目录
            diyPathList.value.pop() //弹出一级
            file.file_name = diyPathList.value.pop() //取出访问的文件夹名
            file.file_path = '/' + diyPathList.value.join('/') //访问的文件夹的父路径
            diyGetFolder(file)//访问该文件夹下的所有文件夹
        }
    }
    const diyGetFolder = (file:any) => {//获取文件夹列表
        let user = {
            id: -1,
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        };
        axios.post('http://localhost:8080/folders', {user, file})
            .then(response => {
                // isLoading.value = false;
                // 检查HTTP状态码
                if (response.status === 200) {
                    diyTableData.value = response.data;
                    if (file.file_name === "") {
                        diyDialogTitle.value = '/' + user.username; //根目录
                    } else {
                        diyPathList.value.push(file.file_name)
                        diyDialogTitle.value = '/' + diyPathList.value.join('/'); //非根目录
                    }
                } else {
                    // 其他未知错误
                    notify("发生未知错误，请重试");
                    console.log('发生未知错误，请重试');
                }
            })
            .catch(error => {
                notify("服务器返回错误状态码：" + error);
                console.log('服务器返回错误状态码：', error);
            });

    }
    const divDialogHandleClose = () => { //关闭对话框处理
        diyDialogVisible.value = false
    }


    return {
        diySelectFolder,
        diyToRoot,
        diyUploadPath,
        toLastDivPath,
        diyGetFolder,
        divDialogHandleClose,

    }
}
