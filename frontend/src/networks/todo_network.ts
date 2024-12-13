import { get_todo, server_url,create_todo,delete_todo,update_todo, signup_url, login_url } from "@/constants";
import axios from "axios";

export async function fetchTodos(){
const id =localStorage.getItem("user_id")
const response=await axios.get(`${server_url}${get_todo}?user_id=${id}`)
return response.data
}
export async function createTodo(body:any){
    const response=await axios.post(`${server_url}${create_todo}`,body) 
    return response.data
}
export async function deletetodo(params:any){
    const response=await axios.post(`${server_url}${delete_todo}?todo_id=${params.todo_id}`)
    return response.data;
}
export async function updateTodo(params:any){
    const response=await axios.post(`${server_url}${update_todo}?todo_id=${params.todo_id}`,params.body);
    return response.data;
}
export async function edittodos(params:any){
    const response=await axios.post(`${server_url}${update_todo}?todo_id=${params.todo_id}`,params.body);
    return response.data;
}
export async function Signup(body:any){
    const response = await axios.post(`${server_url}${signup_url}`,body);
    return response.data;
}

export async function Login(body:any){
    const response = await axios.post(`${server_url}${login_url}`,body)
    return response.data;
}
