import { API_URL } from './utils';

export const createBlog =async (blog) => {
    const url = `${API_URL}/blog`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    };
    try {
        const result =await fetch(url, options);
        const data =await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

export const getBlogs = async () =>{
    const url = `${API_URL}/blog`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

export const DeleteBlogsById = async (id) =>{
    const url = `${API_URL}/blog/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

export const UpdateBlogById = async (id, reqBody) =>{
    const url = `${API_URL}/blog/${id}`;
    const options = {
        method: "PUT",
        headers: {
             'Content-Type' : 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url,options);
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}