import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from 'store/userSlice'
import { fetchUser } from 'store/userSlice'


const Users = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const {users} = useSelector((state)=>state.users)
const [searchTerm,setSearchTerm] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 4
const[date,setDate] = useState('')

useEffect(()=>{
    dispatch(fetchUser())
},[])

//const filterusers =  users?.filter((user)=>selectedItem === 'all' ||user.userstatus === selectedItem)

const filterusers = users?.filter((user)=>
    user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userPhoneNumber.toString().includes(searchTerm) ||
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) 
     
)
.filter((user)=> date === '' || new Date(user.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())
  
const indexOfLastuser = currentPage * itemsPerPage
const indexOfFirstuser = indexOfLastuser -itemsPerPage
const currentusers = filterusers && filterusers.length > 0
? filterusers.slice(indexOfFirstuser, indexOfLastuser)
: [];

const totalPages = Math.ceil(filterusers?.length / itemsPerPage)

const handleNextPage = ()=>{
    if(currentPage < totalPages) {
        setCurrentPage(currentPage +1)
    }
}

const handlePrevPage = ()=>{
    if(currentPage > 1){
        setCurrentPage(currentPage - 1)
    }
}

const deleteUser = (userId)=>{
    dispatch(removeUser(userId))
}

return (
    <>
     <div className="container mx-auto px-4 sm:px-8 pt-24">
        <div className="py-8">
            <div>
                <h2 className="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search" value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none buser buser-gray-400 buser-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="block relative">
                   
                    <input placeholder="Date" type = 'date' value={date}
                    onChange={(e)=>setDate(e.target.value)}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none buser buser-gray-400 buser-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Id
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                              <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                   Phone Number
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Email
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                   Registered On
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                   Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           
                           {
                            currentusers && currentusers.length > 0 && currentusers.map((user)=>{
                                return (
                                    <>
                                     <tr key={user._id}>
                                {/* <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <img className="w-full h-full rounded-full"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                               
                                            {product.productName}
                                            </p>
                                        </div>
                                    </div>
                                </td> */}

                                <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <p onClick={()=>navigate(`/myusers/${user._id}`)} className="text-blue-900 whitespace-no-wrap" style={{textDecoration: 'underline', cursor: 'pointer'}}>{user._id}</p>
                                </td>
                                <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.userName}
                                    </p>
                                </td>
                                <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.userPhoneNumber}
                                    </p>
                                </td>
                                <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{user.userEmail}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                    <button onClick={()=>deleteUser(user._id)} className="text-gray-900  bg-red-500  py-1 px-2  rounded-md ">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                                    </>
                                )
                            })
                           }
                         
                        </tbody>
                    </table>
                    <div
                        className="px-5 py-5 bg-white buser-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing {indexOfFirstuser + 1} to {Math.min(indexOfLastuser, filterusers?.length)}
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                            onClick={handlePrevPage}
                            disabled = {currentPage === 1}
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                            onClick={handleNextPage}
                            disabled = {currentPage === totalPages}
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Users








