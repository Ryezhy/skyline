
export function useFormat(uploadPath:any) {//响应式的请放在根函数
    const formatRouter = () => { //路由格式化
        if (uploadPath.value.length === 0) {
            return "未选择地址"
        }
        else {
            return '选择的上传路径：' + uploadPath.value;
        }
    }
    const formatSpeed = (speed: number) => { //网速格式化
        if (speed < 1024) {
            return speed.toFixed(2) + "kb/s"
        }
        if (speed < 1024 * 1024) {
            return (speed / 1024).toFixed(2) + "Mb/s"
        }
    }

    const formatSize = (size: number) => {//处理文件大小显示
        if (size > 1024 * 1024 * 1024) {
            return (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        } else if (size > (1024 * 1024)) {
            return (size / (1024 * 1024)).toFixed(2) + "MB";
        } else if (size > 1024) {
            return (size / 1024).toFixed(2) + "KB";
        } else {
            return size + "B";
        }
    }
    return {
        formatRouter,
        formatSpeed,
        formatSize
    }
}

