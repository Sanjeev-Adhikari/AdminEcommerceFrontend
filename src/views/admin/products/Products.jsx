import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeProduct } from 'store/productSlice'
import { fetchProducts } from 'store/productSlice'



const Products = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const {products} = useSelector((state)=>state.products)
const [searchTerm,setSearchTerm] = useState('')
const [selectedItem, setSelectedItem] = useState('all')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 4
const[date,setDate] = useState('')

useEffect(()=>{
    dispatch(fetchProducts())
},[])

const handledeleteProduct = (productId)=>{
    dispatch(removeProduct(productId))
}


const filterproducts =  products?.filter((product)=>selectedItem === 'all' ||product.productStatus === selectedItem)

.filter((product)=>
    product._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productStockQty.toString().includes(searchTerm) ||
    product.productPrice.toString().includes(searchTerm) 
     
)
.filter((product)=> date === '' || new Date(product.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())
  
const indexOfLastproduct = currentPage * itemsPerPage
const indexOfFirstproduct = indexOfLastproduct -itemsPerPage
const currentproducts = filterproducts && filterproducts.length > 0
? filterproducts.slice(indexOfFirstproduct, indexOfLastproduct)
: [];

const totalPages = Math.ceil(filterproducts?.length / itemsPerPage)

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


return (
    <>
     <div className="container mx-auto px-4 sm:px-8 pt-24">
        <div className="py-8">
            <div>
                <h2 className="text-2xl font-semibold leading-tight">products</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                 
                 <div className="relative">
                     <select onChange={(e)=>setSelectedItem(e.target.value)}
                         className=" appearance-none pl-3  h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                          <option value='all'>all</option>
                         <option value='available'>available</option>
                         <option value='unavailable'>unavailable</option>
                        
                     </select>
                     <div
                         className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                         </svg>
                     </div>
                 </div>
             </div>
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
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none bproduct bproduct-gray-400 bproduct-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="block relative">
                   
                    <input placeholder="Date" type = 'date' value={date}
                    onChange={(e)=>setDate(e.target.value)}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none bproduct bproduct-gray-400 bproduct-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Id
                                </th>
                                <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Product Name
                                </th>
                              <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                   status
                                </th>
                                <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Price
                                </th>
                                <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Stock Qty
                                </th>
                                <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                   Registered On
                                </th>
                                <th
                                    className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           
                           {
                            currentproducts && currentproducts.length > 0 && currentproducts.map((product)=>{
                                return (
                                    <>
                                     <tr key={product._id}>
                                {/* <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
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

                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                    <p onClick={()=>navigate(`/admin/products/${product._id}`)} className="text-blue-900 whitespace-no-wrap" style={{textDecoration: 'underline', cursor: 'pointer'}}>{product._id}</p>
                                </td>
                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {product.productName}
                                    </p>
                                </td>
                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {product.productStatus}
                                    </p>
                                </td>
                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{product.productPrice}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{product.productStockQty}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                    <button onClick={()=>handledeleteProduct(product._id)} className="text-gray-900  bg-red-500  py-1 px-2  rounded-md ">
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
                        className="px-5 py-5 bg-white bproduct-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing {indexOfFirstproduct + 1} to {Math.min(indexOfLastproduct, filterproducts?.length)}
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

export default Products