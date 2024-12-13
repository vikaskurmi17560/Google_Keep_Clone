"use client";
import {
  createTodo,
  deletetodo,
  fetchTodos,
  updateTodo,
} from "@/networks/todo_network";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosCheckboxOutline } from "react-icons/io";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { DotLoader } from "react-spinners";
import { FaPen } from 'react-icons/fa'
import { TbArrowsMaximize } from "react-icons/tb";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import toast from "react-hot-toast";

function page() {
  // State variables for managing todos and UI interactions
  const [allTodos, setAllTodos] = useState([]); // Store all todos
  const [clickInput, setClickInput] = useState<boolean>(false); // Track if input for new todo is active
  const [title, setTitle] = useState<string>(""); // Store title for the new todo
  const [content, setContent] = useState<string>(""); // Store content for the new todo
  const [hovered, setHovered] = useState<number>(-1); // Track hovered todo for UI effects
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [showDropDown, setDropDown] = useState<number>(-1); // Control dropdown visibility for each todo
  const [showLabel, setshowLabel] = useState<number>(-1); // Control label input visibility for each todo
  const [labelName, setLabelName] = useState<string>(""); // Store label name for adding to todo
  const [showCross, setShowCross] = useState<string>(""); // Track which label's remove button to show
  const [editTodo, setEditTodo] = useState<string>(""); //handle edit functionality
  const [editTitle, setEditTitle] = useState<string>(""); //handle edit title
  const [editContent, setEditContent] = useState<string>("");//handle Edit content
  const [zoomid, setZoomId] = useState<string>("");
  const [sidebar,setSidebar] = useState<boolean>(false);

  useEffect(() => {
    getTodos(); // Fetch todos on component mount
  }, []);

  
  const id=localStorage.getItem("user_id");
  
 async function getTodos() {
    setLoading(true); // Start loading
    try{
      const response = await fetchTodos(); // Fetch todos
      if (response.success) {
        setAllTodos(response.data); // Set todos in state if fetch is successful
      }
    }
    catch(error) {
      console.error("error in fetching todos."); // Log error
    }
    setLoading(false); // Stop loading
  }

  async function handleAddTodo() {
    const body = {
      title,
      content,
      user_id: id, // Placeholder user ID (consider changing to dynamic)
    };
    setLoading(true); // Start loading
   try{
    const res = await createTodo(body); // Create a new todo
  
    if (res.success) {
      toast.success("todo added successfully"); // Log success
      setTitle(""); // Clear title input
      setContent(""); // Clear content input
      getTodos(); // Refresh todos
    }
   }
    catch(error) {
      toast.error("All Field Are Required or Else....");// Log error
    }
    setLoading(false); // Stop loading
  }

  async function handleDeleteTodo(id: string) {
  try{
    const res = await deletetodo({ todo_id: id }); // Delete todo by ID
    if (res.success) {
      getTodos(); // Refresh todos if deletion is successful
      toast.success("Todo Deleted")
    }
  }
  catch(error){
    console.error("something is Wrong")
  }
  }

  async function handleUpdateTodo(todo_id: string) {
    const params = {
      todo_id,
      body: {
        labels: labelName, // Label to add
      },
    };
   try{
    const response = await updateTodo(params); // Update todo with new label
    setshowLabel(-1); // Hide label input after adding
    if (response.success) {
      getTodos(); // Refresh todos if update is successful
    }
   }
   catch(error){
    console.error("something is Wrong")
   }
  }

  async function removeLabels(todo_id: string, label: string) {
    const params = {
      todo_id,
      body: {
        removelabel: label, // Label to remove
      },
    };
   try{
    const response = await updateTodo(params); // Update todo to remove label

    if (response.success) {
      getTodos(); // Refresh todos if update is successful
    }
   }
   catch(error){
    console.error("something is Wrong")
   }
  }


  async function handleEditTodo(todo_id: string) {
    const params = {
      todo_id,
      body: {
        title: editTitle, // Use edited title
        content: editContent, // Use edited content
      },
    };
  try{
    const response = await updateTodo(params); // Update todo with new title and content
    if (response.success) {
      getTodos(); // Refresh todos if update is successful
    }
  }catch(error){
    console.error("something is Wrong")
  }
    setEditTodo(""); // Exit editing mode
  }

  return (
    <div className="flex flex-col w-screen h-auto  bg-gray-900">
      <Navbar />
     
      <div className="flex flex-row w-[100%] gap-2 h-auto">
      <p onClick={()=>setSidebar(!sidebar)} className="w-[2%] h-auto"><BsLayoutSidebarInset  className="text-xl text-white"/></p>
        {
          sidebar === true && (
            <div className="flex flex-1 w-[20%]"><Sidebar /></div>
          )
        }
        
        <div className="flex flex-col bg-gray-900 flex-1 w-full min-h-screen" >
          <div className="flex bg-gray-900 w-[100%] justify-center h-fit p-4">
            <div className="flex bg-gray-900 justify-center items-center  border w-[60%] rounded-lg border-white px-2 gap-5 ">
              {!clickInput ? (
                <input
                  className="text-white flex-1 w-[50%] p-5 rounded-md bg-gray-900 outline-none"
                  placeholder="Take a note..."
                  onClick={() => setClickInput(true)} // Enable input on click
                />
              ) : (
                <div className="flex flex-col text-white w-full py-2 ">
                  <input
                    className="bg-transparent text-white w-full px-5 py-3 outline-none"
                    placeholder="Enter title"
                    onChange={(e) => setTitle(e.target.value)} // Update title on input change
                    value={title}
                  />
                  <input
                    className="bg-transparent text-white w-full px-5 py-4 outline-none"
                    placeholder="Take a note..."
                    onChange={(e) => setContent(e.target.value)} // Update content on input change
                    value={content}
                  />
                  <div className="flex gap-3 self-end"
                   >
                    <button
                      onClick={() => setClickInput(false)} // Close input on button click
                      className="text-white p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleAddTodo} // Add todo on button click
                      className="text-white p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
              <IoIosCheckboxOutline className="text-2xl text-white" />
              <HiOutlinePaintBrush className="text-white text-2xl" />
              <MdOutlinePhotoSizeSelectActual className="text-white text-2xl" />
            </div>
          </div>

          {loading && (
            <div className="h-auto w-[15%] flex justify-center  ">
              <DotLoader size={50} color="#FFFFFF"  /> {/* Loading spinner */}
            </div>
          )}

          <div className="text-white  flex p-4 will-change-auto gap-3 flex-wrap  h-auto">
            {!loading &&
              allTodos &&
              allTodos.map((todo: any) => {
                return (

                  <div
                    onMouseOver={() => setHovered(todo._id)} // Set hovered todo on mouse over
                    className={`flex flex-col flex-wrap gap-5 border-2 h-auto ${zoomid === todo._id ? 'w-[350px]' : 'w-[280px]'} border-white p-2 break-inside-avoid rounded-lg`}
                  >



                    {editTodo === todo._id && (
                      <div className="flex flex-col gap-1 flex-wrap  border-2 h-auto w-[300px] text-white bg-gray-600 rounded-md top-0 left-0  border-white">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)} // Update edited title
                          className=" p-2 text-xl font-bold text-white bg-gray-600 rounded-md border-1 border-white"
                          placeholder="Edit title..."
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)} // Update edited content
                          className="w-auto h-[120px] p-2 text-white text-md bg-gray-600 rounded-md border-1 border-white"
                          placeholder="Edit content..."
                          hight-20px
                          width-20px
                        />
                        <button
                          onClick={() => {
                            handleEditTodo(todo._id)
                          }}// Save edits
                          className="bg-blue-500 text-white p-2 h-10 rounded-md text-md border-1 border-white"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditTodo("")
                          }
                          } // Cancel editing
                          className="bg-red-500 text-white p-2 h-10 rounded-md text-md border-1 border-white pb-1"
                        >
                          Cancel
                        </button>
                      </div>
                    )}




                    <div className="flex flex-row justify-between">
                      <h1 className="text-xl font-bold">{todo.title}</h1>
                      <button className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center" >
                        <FaPen
                          onClick={() => {
                            setEditTodo(todo._id); // Enable editing mode
                            setEditTitle(todo.title); // Set current title in edit mode
                            setEditContent(todo.content); // Set current content in edit mode
                          }}
                        />
                      </button>

                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {todo.labels.map((label: any, index: number) => (
                        <p
                          className="p-1 rounded-md border-blue-400 border-2 bg-blue-100 bg-opacity-30 "
                          onMouseOver={() => setShowCross(`${todo._id}${index}`)} // Show remove button on hover
                          onMouseOut={() => setShowCross("")}
                        >
                          {label}
                          {showCross === `${todo._id}${index}` && (
                            <button
                              onClick={() => removeLabels(todo._id, label)} // Remove label on button click
                              className="bg-red-500 text-black m-2 text-xs rounded-md"
                            >
                              X
                            </button>
                          )}
                        </p>
                      ))}
                    </div>
                    <p className={`${zoomid === todo._id ? 'line-clamp-none' : 'line-clamp-4'}`}>{todo.content}</p>

                    {hovered === todo._id && (
                      <div className="flex items-center justify-end gap-3 text-2xl">
                        <button  // maximize  menu on button click
                          onClick={() => setZoomId(todo._id)}
                          className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center">
                          {zoomid === todo._id ? '' : < TbArrowsMaximize />}
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setDropDown(todo._id)} // Toggle dropdown menu on button click
                            className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center"
                          >
                            <BsThreeDotsVertical />
                          </button>
                          {showDropDown === todo._id && (
                            <ul className="p-3 h-32 bg-gray-600 rounded-md text-sm absolute top-[100%] right-0 flex flex-col justify-center gap-4 items-center">
                              <li
                                onClick={() => handleDeleteTodo(todo._id)} // Delete todo on menu item click
                                className="whitespace-nowrap cursor-pointer"
                              >
                                delete
                              </li>
                              <li
                                onClick={() => {
                                  setshowLabel(todo._id); // Show label input on menu item click
                                  setDropDown(-1); // Hide dropdown
                                }}
                                className="whitespace-nowrap cursor-pointer"
                              >
                                Add label
                              </li>
                            </ul>
                          )}

                          {showLabel === todo._id && (
                            <ul className="p-3 h-32 bg-gray-600 rounded-md text-sm absolute top-[100%] right-0 flex flex-col justify-center gap-4 items-center">
                              <input
                                onChange={(e) => setLabelName(e.target.value)} // Update label name on input change
                                value={labelName}
                                className="p-4 m-4 bg-transparent text-white"
                                placeholder="add label...."
                              />
                              <button
                                onClick={() => {
                                  handleUpdateTodo(todo._id); // Add label on button click
                                }}
                                className="whitespace-nowrap cursor-pointer"
                              >
                                Add label
                              </button>
                            </ul>
                          )}

                        </div>
                      </div>
                    )}

                    {zoomid === todo._id && (
                      <div className="flex justify-start flex-wrap h-auto w-[340px] rounded-md text-white bg-gray-900 border-white border-2">
                        <button
                          onClick={() => setZoomId("")}
                          className="h-[50px] w-[340px] bg-blue-500 rounded-b-md"
                        >
                          Close
                        </button>
                      </div>

                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;