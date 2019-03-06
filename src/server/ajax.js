import axios from './axios.config';
import storage from '../utils/storage';

const ajax = function(options){
    // 结构参数
    let {url,params="",type="GET",loading=true,sendToken=true} = options;

    // loading句柄
    let load=null;
    // 是否遮罩显示loading
    if(loading){
        load = this.$loading({
            lock:true,
            text:'Loading',
            background:'rgba(0,0,0,0.7)'
        });
    }

    return new Promise((resolve,reject)=>{
        // 请求参数
        let requestOptions ={
                method:type,
                url:url,
                data:params,
                headers:{}
        };
        // 是否携带token
        if(sendToken){
            requestOptions.headers['Authorization'] = `Bearer ${storage.get('token')}`;
        }
        axios(requestOptions)
        .then(res=>{
            if(load){
                load.close();
            }
            if(res.status===200){
                resolve(res.data);
            }else{
                reject(res.data);
            }
        },err=>{
            if(load){
                load.close();
            }
            if(err.status===401){
                this.$message({
                    message:'你还没有登录或者登录已过期',
                    type:'error',
                    duration:1500
                });
                this.$router.push({
                    name:'Login'
                });
            }else{
                this.$message({
                    message:err.data,
                    type:'warning',
                    duration:1500
                });
            }
            reject(err.data);
        })
    })
}

export default ajax;