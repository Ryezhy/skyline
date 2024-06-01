import {ElNotification as notify} from "element-plus/es/components/notification/index";
import axios from "axios";
// @ts-ignore
import SparkMD5 from "spark-md5";
import {genFileId, UploadProps, UploadRawFile} from "element-plus";

export function useUpload(chuckSize:any, uploadPath:any, uploadStart:any, uploadEnd:any,
                          uploadOther:any, file:any, md5Hash:any, isLoading:any, sUploadRef:any) {
    const getChuckInfo = (blobSize:any) => { //计算分片信息
        uploadStart = 0;
        if (blobSize <= 1024 * 1024 * 100) {
            chuckSize = 1024 * 1024 * 10 * 0.5 //5M分片
        } else if (blobSize <= 1024 * 1024 * 500) {// 500M
            chuckSize = 1024 * 1024 * 10  //10M分片
        } else if (blobSize <= 1024 * 1024 * 1024) {// 1Gb
            chuckSize = 1024 * 1024 * 10 * 2  //20M
        } else if (blobSize <= 1024 * 1024 * 1024 * 2) { //2GB
            chuckSize = 1024 * 1024 * 10 * 4 //40M
        } else {
            chuckSize = 1024 * 1024 * 10 * 8 // 80M
        }
        uploadEnd = blobSize / chuckSize;
        //去除浮点数
        uploadEnd = Math.floor(uploadEnd);
        uploadOther = blobSize % chuckSize;
        if (uploadOther > 0) {
            uploadEnd = uploadEnd + 1;//补上一个小分片
        }
    }

    const submitUpload = async () => {

        const fileToUpload = file.value.raw; // 获取到文件对象
        getChuckInfo(fileToUpload.size)//计算分片信息
        // 使用lastIndexOf方法找到最后一个'.'的位置
        let lastIndex = file.value.name.lastIndexOf('.');
        let extensionOrPart = lastIndex > -1 ? file.value.name.slice(lastIndex + 1) : '';
        // 获取文件名
        let fileName = file.value.name.slice(0, lastIndex);
        console.log(md5Hash)
        const uploadChunk = async (index:any) => {
            let file1 = {
                file_UUid: '',
                file_name: fileName,
                file_type: extensionOrPart,
                upload_time: '2024-04-02T10:54:14.963',
                file_path: uploadPath.value,
                file_size: file.value.raw.size,
                file_hash: md5Hash.value
            };
            console.log("选择要上传的文件名为：" + file.value.name)
            let fileInfo = {
                file_UUid: 'string',
                start: uploadStart, // 开始字节
                length: uploadEnd, // 结束长度字节
                state: uploadOther // 剩余字节
            };

            const requestData = {
                user: {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password')
                },
                file: file1,
                fileInfo: fileInfo
            };
            const jsonStr = JSON.stringify(requestData);
            if (index >= uploadEnd) {
                // 所有分片都上传完毕
                notify("上传完成");
                return;
            }
            //console.log("开始上传从分片"+(uploadStart+1)+",分片大小：" + chuckSize / (1024 * 1024) + "Mb,总共:" + uploadEnd + "个分片,余" + uploadOther + "比特")
            const start = index * chuckSize;
            const end = Math.min((index + 1) * chuckSize, fileToUpload.size);
            const chunk = fileToUpload.slice(start, end);
            try {
                const formData = new FormData();
                formData.append('uploadFile', chunk);
                formData.append('jsonStr', jsonStr);
                const response = await axios.post('http://localhost:8080/upload', formData, {});
                // 处理成功响应
                console.log('分片上传成功', response);
                uploadStart = uploadStart + 1;
                // 递归调用以继续上传下一个分片
                await uploadChunk(index + 1);
            } catch (error) {
                // 处理错误
                notify("上传失败");
                console.log('上传失败', error);
                // 在这里你可以决定是否重试或其他逻辑
            }
        };
        // 开始上传第一个分片
        await uploadChunk(0);
    };

    const changeFile = (param:any) => {
        console.log("新的文件名为："+param.name)
        file.value = param;
        let fileRaw = param.raw;
        isLoading.value = true;
        if (fileRaw .size < 1024 * 1024 * 500) {
            notify("开始计算文件的MD5");
        } else if (fileRaw .size <= 1024 * 1024 * 1024) {
            notify("开始计算文件的MD5,文件大小超过500Mb，请稍微耐心等待");
        } else {
            notify("开始计算文件的MD5,文件大小超过1Gb,需要占用必要的内存和CPU性能,请耐心等待,切勿关闭界面");
        }

        getMD5(fileRaw ).then(md5 => {
            isLoading.value = false;
            md5Hash.value = md5;
            console.log("文件"+param.name+"的md5:" + md5Hash.value);
        });
    };

    const getMD5 = (item:any) => {
        return new Promise((resolve, reject) => {
            const md5 = new SparkMD5();
            const fileReader = new FileReader();
            const sliceLength = 10;
            const chunkSize = Math.ceil(item.size / sliceLength);
            let index = 0;

            const loadFile = () => {
                const slice = item.slice(index, index + chunkSize);
                fileReader.readAsBinaryString(slice);
            };

            fileReader.onload = (e) => {
                // @ts-ignore
                md5.appendBinary(e.target.result);
                if (index < item.size) {
                    index += chunkSize;
                    loadFile();
                } else {
                    resolve(md5.end());
                }
            };

            fileReader.onerror = (e) => {
                reject(e);
            };

            loadFile();
        });
    };

    const handleExceed: UploadProps['onExceed'] = (uploadFiles) => {
        isLoading.value = true
        sUploadRef.value!.clearFiles()
        const uploadFile = uploadFiles[0] as UploadRawFile
        uploadFile.uid = genFileId()
        sUploadRef.value!.handleStart(uploadFile)
        isLoading.value = true

    }

    return {
        submitUpload, getChuckInfo,changeFile, handleExceed,
    }
}