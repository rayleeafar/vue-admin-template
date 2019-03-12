module.exports = () => {
    return async (ctx, next) => {
        await next();
        let path = ctx.request.path;
        console.log(`
        ${new Date().toLocaleString()}-${ctx.method} ${path}
        body:${JSON.stringify(ctx.request.body)}
        query:${JSON.stringify(ctx.request.query)}
        response:${ctx.response.status}
        ${JSON.stringify(ctx.response.body)}`);
    };
}