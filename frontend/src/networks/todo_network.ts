import { get_todo, server_uri,create_todo,delete_todo,update_todo } from "@/constants";
import axios from "axios";

export async function fetchTodos(params:any){
const response=await axios.get(`${server_uri}${get_todo}?userId=6708dec58612c5993cfd51f0`)
return response.data
}
export async function createTodo(body:any){
    const response=await axios.post(`${server_uri}${create_todo}`,body) 
    return response.data
}
export async function deletetodo(params:any){
    const response=await axios.post(`${server_uri}${delete_todo}?todo_id=${params.todo_id}`)
    return response.data;
}
export async function updateTodo(params:any){
    const response=await axios.post(`${server_uri}${update_todo}?todo_id=${params.todo_id}`,params.body);
    return response.data;
}
export async function edittodos(params:any){
    const response=await axios.post(`${server_uri}${update_todo}?todo_id=${params.todo_id}`,params.body);
    return response.data;
}
