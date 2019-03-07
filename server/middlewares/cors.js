let cors = async (ctx,next)=>{
    ctx.response.headers["Access-Control-Allow-Origin"]= "*";  
    ctx.response.headers["Access-Control-Allow-Headers"]= "Content-Type,Content-Length, Authorization, x-token , Accept,X-Requested-With";
    ctx.response.headers["Access-Control-Allow-Methods"]="PUT,POST,GET,DELETE,OPTIONS";
    await next();
};

module.exports = ()=>{
    return cors;
}