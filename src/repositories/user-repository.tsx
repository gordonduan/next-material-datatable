//repositories/user-repository.ts

import mysql from 'mysql';
import dbConfig from "../config/dbConfig.json";

export interface PageData<T> {
    index?: number;
    pageSize?: number;
    totalCount?: number;
    list?: Array<T>;
}
export interface NextUser {
    id?: number;
    name?: string;
    email?: string;
    mobile?: string;
    city?: string;
    gender?: string;
    departmentId?: number;
    hireDate?: Date;
    isPermanent?: boolean;
    createdAt?: Date;
}

export class UserRepository {

    //Get all pagination users
    getAllUsers = async(index: number, pageSize: number, order: string): Promise<PageData<NextUser>> => {
        try {
            let pageData: PageData<NextUser> = {}
            pageData.index = index;
            pageData.pageSize = pageSize;
            const totalCount = await dbQuery('SELECT count(*) as total_count from next_user');
            pageData.totalCount = totalCount[0].total_count;

            const result = await dbQuery(`select * from next_user order by id ${order} limit ${pageSize} offset ${(pageSize * (index - 1))}; `);

            let nextUsers: NextUser[] = [];
            result.map(user => {
                let nextUser: NextUser = {
                    id: user.id as number,
                    name: user.name as string,
                    email: user.email as string,
                    mobile: user.mobile as string,
                    city: user.city as string,
                    gender: user.gender as string,
                    departmentId: user.department_id as number,
                    hireDate: user.hire_date as Date,
                    isPermanent: user.is_permanent as boolean,
                    createdAt: user.created_at as Date
                };
                nextUsers.push(nextUser);
            });
            pageData.list = nextUsers;
            return pageData;
        } catch (error) {
            console.log(error);
        }
    };

    // Get user by id
    getUser = async(id: number): Promise<NextUser> => {
        try {
            const result = await dbQuery('SELECT * FROM `next_user` WHERE `id` = ?', [id]);
            let nextUser: NextUser = null;
            if(result.length > 0){
                nextUser = {
                    id: result[0].id as number,
                    name: result[0].name as string,
                    email: result[0].email as string,
                    mobile: result[0].mobile as string,
                    city: result[0].city as string,
                    gender: result[0].gender as string,
                    departmentId: result[0].department_id as number,
                    hireDate: result[0].hire_date as Date,
                    isPermanent: result[0].is_permanent as boolean,
                    createdAt: result[0].created_at as Date
                };
            }
            return nextUser;
        } catch (error) {
            console.log(error);
        }
    }

    // Add user
    addUser = async(data: NextUser) => {
        try {
            var user  = {name: data.name, email: data.email, mobile: data.mobile, city: data.city, gender: data.gender,
                department_id: data.departmentId, hire_date: data.hireDate, is_permanent: data.isPermanent, created_at: new Date()};
            const result = await dbQuery('INSERT INTO next_user SET ?', user);
            let nextUser: NextUser = null;
            if(result) {
                nextUser = {
                    id: result.insertId as number,
                    name: user.name as string,
                    email: user.email as string,
                    mobile: user.mobile as string,
                    city: user.city as string,
                    gender: user.gender as string,
                    departmentId: user.department_id as number,
                    hireDate: user.hire_date as Date,
                    isPermanent: user.is_permanent as boolean,
                    createdAt: user.created_at as Date
                };
            }
            return nextUser;
        } catch (error) {
            console.log(error);
        }
    }

    // Update user
    updateUser = async(user: NextUser) => {
        try {
            const result = await dbQuery(
                'UPDATE next_user SET name = ?, email = ?, mobile = ?, city = ?, gender = ?, department_id = ?, hire_date = ?, is_permanent = ? WHERE id = ?',
                [user.name, user.email, user.mobile, user.city, user.gender, user.departmentId, user.hireDate, user.isPermanent, user.id]
            );
        } catch (error) {
            console.log(error);
        }
    }

    // Delete user
    deleteUser = async(id: number) => {
        try {
            const result = await dbQuery( 'delete from next_user where id = ?', [id]);
        } catch (error) {
            console.log(error);
        }
    }
}

// DB query
const dbQuery = async(query, params = {}) => {
    const db = mysql.createConnection(dbConfig);
    db.connect();
    let result = await new Promise((resolve, reject) => {
        db.query(query, params, function(err, res) {
            if (res === undefined) {
                reject(new Error("Error rows is undefined"));
            } else {
                resolve(res);
            }
        })
    })
    db.end();
    return JSON.parse(JSON.stringify(result));
}
