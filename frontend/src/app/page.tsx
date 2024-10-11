"use client";

import { create_todo } from "@/constants";
import { createTodo, fetchTodos } from "@/networks/todo_network";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosCheckboxOutline, IoIosColorPalette } from "react-icons/io";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

function page() {
  const [allTodos, setAllTodos] = useState([]);
  const [clickInput, setClickInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [hovered, setHovered] = useState<number>(-1);
  useEffect(() => {
    getTodos();
  }, []);
const colorRef=useRef<HTMLInputElement>(null)

  async function getTodos() {
    const response = await fetchTodos({});
    console.log("response------->", response);
    if (response.success) {
      setAllTodos(response.data);
    } else {
      console.log("error in fetching todos.");
    }
  }
  async function handleAddTodo() {
    const body = {
      title,
      content,
      user_id: "6708dec58612c5993cfd51f0",
    };
    const res: any = await createTodo(body); //res=response.data
    if (res.success) {
      console.log("todo added successfully");
      setTitle("");
      setContent("");
      getTodos();
    } else {
      console.log("error in adding todo");
    }
  }
  

  return (
    <div className=" flex flex-col  bg-gray-900 flex-1">
      <div className=" flex bg-gray-900 w-full  justify-center h-fit p-4">
        <div className="flex bg-gray-900 justify-center items-center border w-[60%] rounded-lg border-white px-2 gap-5 ">
          {!clickInput ? (
            <input
              className="text-white flex-1  w-[50%] p-5 rounded-md bg-gray-900 outline-none"
              placeholder="Take a note..."
              onClick={() => setClickInput(true)}
            />
          ) : (
            <div className="flex flex-col text-white w-full py-2 ">
              <input
                className="bg-transparent text-white w-full px-5 py-3 outline-none"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <input
                className="bg-transparent text-white w-full px-5 py-4 outline-none"
                placeholder="Take a note..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <div className="flex gap-3 self-end">
                <button
                  onClick={() => setClickInput(false)}
                  className="text-white p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30"
                >
                  Close
                </button>
                <button
                  onClick={handleAddTodo}
                  className="text-white p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30"
                >
                  Add
                </button>
              </div>
            </div>
          )}
          <IoIosCheckboxOutline className='text-2xl text-white' />
          <HiOutlinePaintBrush className='text-white text-2xl' />
          <MdOutlinePhotoSizeSelectActual className='text-white text-2xl' />
        </div>
      </div>
      <div className="text-white p-4 max-w-full gap-3 columns-4">
        {allTodos &&
          allTodos.map((todo: any) => {
            return (
              <div
                onMouseOver={() => setHovered(todo._id)}
          
                className="flex flex-col gap-2 border-2 mb-3 w-full  border-white p-2 break-inside-avoid rounded-lg  "
              >
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <div className="flex gap-2">
                  {todo.labels.map((label: any) => (
                    <p className="p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30">
                      {label}
                    </p>
                  ))}
                </div>
                <p className="break-all">{todo.content}</p>
                {hovered===todo._id && <div className="flex items-center justify-end gap-3 text-2xl">
                  <label>
                    <input ref={colorRef} type="color" className="hidden"/>
                    <button onClick={()=>colorRef.current?.click()}
                    className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center"><IoIosColorPalette /></button>
                    </label>
                
                 <button className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center"> <BsThreeDotsVertical /></button>
                  </div>}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default page;