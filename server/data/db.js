const users = require('./user');
const menus = require('./menu');
const admins = require('./admin');
const tokens = require('./token');

let tables = {
    'users': users,
    'menus': menus,
    'admins': admins,
    'tokens': tokens
};

// 模拟的数据表操作类
class TableAccessor {
    // 构造器传入表名
    constructor(tbl) {
        this.table = tables[tbl];
    }
    // 通过id获取记录
    getById(id) {
        return this.table.filter(x => x.id == id)[0];
    }
    // 搜索等值匹配的数据集合
    search(cond) {
        return this.table.filter(x => {
            let match = false;
            for (let key in cond) {
                match = x[key] == cond[key];
                if (!match) {
                    break;
                }
            }
            return match;
        })
    }
    // 查询第一条等值匹配的数据
    searchOne(cond) {
        let data = this.search(cond);
        if (data && data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    }
    // 获取所有数据集合
    getList() {
        return this.table.filter(x => true);
    }
    // 获取分页数据集合
    getPageList(pageIndex, pageSize, keyword = null) {

        // 开始索引
        let start = (pageIndex - 1) * pageSize;
        // 结束索引
        let end = start + pageSize;

        // 符合条件的记录总数
        let rows = this.table
            .filter(x => keyword ? (x.keyword).indexOf(keyword) != -1 : true);

        // 需要返回的数据集
        let data = rows.slice(start, end > this.table.length ? this.table.length : end);

        // 分页返回模型
        return {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
            totalCount: rows.length,
            data: data
        };
    }
    // 根据id删除记录
    remove(id) {
        return this.table = this.table.filter(x => x.id != id);
    }
    // 添加一条新的记录
    add(obj) {
        obj.id = this.table.length;
        this.table.push(obj);
    }
    // 更新一个记录
    update(id, obj) {
        let data = this.getById(id);
        if (data == null)
            throw new Error(`未找到id为${id}的记录`);
        for (let entity of this.table) {
            if (entity.id == id) {
                for (let key in obj) {
                    if (key != 'id') {
                        entity[key] = obj[key];
                    }
                }
            }
        }
    }
}

// 模拟数据库操作
module.exports = {
    users: new TableAccessor('users'),
    menus: new TableAccessor('menus'),
    admins: new TableAccessor('admins'),
    tokens: new TableAccessor('tokens')
};