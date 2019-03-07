class Response {
   constructor(){
        this.data=null;
        this.err='';
        this.code=0;
        this.succ=true;
   }

    success(data=null){
        this.data = data;
        this.code =0;
        this.err='';
        this.succ=true;
        return this;
    }
    failure(err='未知错误'){
        this.code=-1;
        this.err =err;
        this.data=null;
        this.succ=false;
        return this;
    }
}

module.exports = new Response();