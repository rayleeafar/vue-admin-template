const db = require('../data/db');

class UserService {
    constructor() {

    }

    // 获取用户分页列表
    getPageList(options) {
        let { pageIndex = 1, pageSize = 10, keyword = null } = options;
        return db.users.getPageList(pageIndex, pageSize, keyword);
    }

    // 更新用户信息
    update(id, updateFields) {
        if (id < 0)
            throw new Error('id不能小于0');

        if (updateFields.username) {
            for (let item of db.users.search({ username: updateFields.username })) {
                if (item.id != id) {
                    throw new Error('用户名已存在');
                }
            }
        }
        db.users.update(id, updateFields);
    }

    // 删除一个用户
    remove(id) {
        if (id < 0)
            throw new Error('id不能小于0');

        db.users.remove(id);
    }

    // 添加用户
    add(user) {
        if (db.users.searchOne({ username: user.username })!=null) {
            throw new Error('用户名已存在');
        }
        db.users.add(user);
    }
}

module.exports = new UserService();