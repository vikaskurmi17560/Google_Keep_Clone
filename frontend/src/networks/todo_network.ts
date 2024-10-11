import { get_todo, server_uri,create_todo } from "@/constants";
import axios from "axios";

export async function fetchTodos(params:any){
const response=await axios.get(`${server_uri}${get_todo}?userId=6708dec58612c5993cfd51f0`)
console.log(response);
return response.data

}
export async function createTodo(body:any){
    const response=await axios.post(`${server_uri}${create_todo}`,body) //data ko frontend se is params (body)mai bheja hai
    console.log(response);
    return response.data
}
//these functions request backend using axios and receives response from backend .then returns response.data.