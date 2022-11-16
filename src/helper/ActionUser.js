import { checkToken } from './ActionLogin'

export const getListUser = (data) => { 
    if(!checkToken()) return {
        code: 404
    }
    let { page, limit, Users } = data;
    let fakeuser = [...Users];
    let TotalUsers = fakeuser.length;
    let newusers = [];
    let totalPage = Math.floor(TotalUsers / limit) + 1;
    let newAction;
     
    if (TotalUsers <= limit) {
        let i = 0;
        for (i; i < TotalUsers; i++) {
            newusers.push(fakeuser[i]);
        }
    } else {
        if (page === totalPage) {
            let i = (page - 1) * limit;
            for (i; i < TotalUsers; i++) {
                newusers.push(fakeuser[i]);
            }

        } else {
            if (page === 1) {
                let i = 0;
                for (i; i < limit; i++) {
                    newusers.push(fakeuser[i]);
                }
            } else {
                let i = (page - 1) * limit;
                for (i; i < (page - 1) * limit + limit; i++) {
                    newusers.push(fakeuser[i]);
                }
            }
        }
    }

   newAction = {
        page: page,
        limit: limit,
        total: totalPage,
        dataShow: [...newusers],
        totalUsers: TotalUsers,
    };

    return {
        code: 1,
        data: newAction
    }
}


export const deleteUser = (data) =>{
    if(!checkToken()) return {
        code: 404
    }
    const { user, listData} = data; 
    const newUsers = listData.filter((u) => u?.userId !== user?.userId);

    return {
        code: 1,
        data: newUsers
    }
}


export const addUser = (data) =>{ 
    if(!checkToken()) return {
        code: 404
    }
    const { user, listData } = data;
    let newList = [...listData];
    newList.unshift({...user, userId: Math.random() * 100 + 20}); 
    return {
        code: 1,
        data: newList
    }
}

export const editUser = (data) =>{ 
    if(!checkToken()) return {
        code: 404
    }
    const { user, listData } = data;
    let newList = [...listData];
    let objindex = newList.findIndex((obj) => obj.userId === user.userId);
    newList[objindex] = user;
    return {
        code: 1,
        data: newList
    }
}
