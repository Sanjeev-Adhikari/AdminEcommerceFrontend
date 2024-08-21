import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProductStatus } from 'store/productSlice'
import { updatePriceAndStock } from 'store/productSlice'
import { APIAuthenticated } from 'http'


const SingleProduct = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const {id} = useParams()
const {products} = useSelector((state)=>state.products)
const [orders,setOrders] = useState([])
const [newProduct,setNewProduct] = useState([])

const [filteredproduct] = products? products.filter((product)=>product._id === id) : newProduct.filter((product)=>product._id === id)
const [productStatus, setProductStatus] = useState(filteredproduct?.productStatus)


// const [paymentStatus, setPaymentStatus] = useState(filteredproduct?.paymentDetails.status)

const handleProductStatus = (e)=>{
  setProductStatus(e.target.value)
  console.log(e.target.value)
  dispatch(updateProductStatus(id,e.target.value))
}

const handleTspChange = (value, name)=>{
let data = {}
if(name == 'amount'){
  data.productPrice = value
}else {
  data.productStockQty = value
}
dispatch(updatePriceAndStock(id,data))
}


const deleteproduct = async()=>{

 try {
  const response = await APIAuthenticated.delete(`/admin/products/${id}`)
  if(response.status == 200){
    alert('product deleted successfully')
    navigate('/admin/products')
    

  }
 } catch (error) {
  console.log(error)
 }
}

const fetchProductOrders = async()=>{
  const response = await APIAuthenticated.get(`/products/productorders/${id}`)
  if(response.status === 200){
    setOrders(response.data.data)
  }
}

useEffect(()=>{
  fetchProductOrders()
},[])

  return (
   <>

<div className='pl-1 pt-1'>
    
    
    <div className="py-10 px-1 md:px-2 2xl:px-2 2xl:container 2xl:mx-auto">
  <div className="flex justify-start item-start space-y-2 flex-col">
    <h1 className="text-1xl  dark:text-white lg:text-2xl font-semibold  text-gray-800">Product: {id}</h1>
    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Details</p>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
         
        </div>
       

                <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                <div className="w-full md:w-40">
                  <img className="w-full hidden md:block" src="https://i.ibb.co/s6snNx0/Rectangle-17.png" alt="dress" />
                  <img className="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" />
                </div>
                <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{filteredproduct?.productName}</h3>
                   
                  </div>
                  <div className="flex justify-between space-x-6 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6">Rs: {filteredproduct?.productPrice} </p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Qty: {filteredproduct?.productStockQty}</p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6  text-gray-800">Status: {filteredproduct?.productStatus}</p>
                  </div>
                </div>
              </div>
          
      </div>
   
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Orders</p>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
         
        </div>
       

               
               

<div className=" w-full " style = {{ maxHeight: '40vh', overflowY: 'auto' }}>
                 
<table className="min-w-full leading-normal" >
<thead className="bg-gray-100">
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
          Name
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
          Status
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
          Payment Method
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
          Payment Status
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
          Shipping Address
        </th>
      </tr>
    </thead>
   
    
  <tbody >
    {orders.length > 0 && orders.map((order, index) => (
      <tr key={index}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order?.user.userName}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order?.orderStatus}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order?.paymentDetails.method}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order?.paymentDetails.status}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order?.shippingAddress}</p>
        </td>
      </tr>
    ))}
  </tbody>
  
 
</table>
</div>


                 
          
      </div>
    </div>

    
    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col" style={{height :'350px'}}>
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Update</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
          
          </div>

         <div className="flex flex-row mb-1 sm:mb-0">
                 
                 <div className="flex flex-col relative">
                 <label htmlFor="statusDropdown" className="w-48  lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600" >Update Stock
        </label>
        <input type = 'number' name='tsq' id='tsq' min={0} max={100} value={filteredproduct?.productStockQty} onChange= {(e)=>handleTspChange(e.target.value, 'stock')}/>           
        <label htmlFor="statusDropdown" className="w-48 lg:w-full mt-2 dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
            Update Price
        </label>
        <input type = 'number' name='price' id='price' min={200} max={10000} value={filteredproduct?.productPrice} onChange= {(e)=>handleTspChange(e.target.value, 'amount')}/>
                     </div>
               
             </div>

             <div className="flex flex-row mb-1 sm:mb-0">
                 <div className="flex flex-col relative">
                 <label htmlFor="statusDropdown" className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
             product Status
        </label>
        <div className="relative">
                     <select onChange={handleProductStatus}
                         className=" appearance-none pl-3  h-full rounded-r bproduct-t sm:rounded-r-none sm:bproduct-r-0 bproduct-r bproduct-b block  w-full bg-white bproduct-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bproduct-l focus:bproduct-r focus:bg-white focus:bproduct-gray-500">
                         
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
             </div>

        {
          filteredproduct?.productstatus !== 'cancelled' && (
            <div className="flex w-45 mt-5 justify-center items-center md:justify-start md:items-start">
            <button className="mt-4 md:mt-0 dark:bproduct-white w-15    dark:text-white py-4 rounded-full
             bg-red-300 hover:bg-red-400  focus:ring-gray-800 bproduct bproduct-gray-800 
              w-96 2xl:w-full font-medium leading-4 text-gray-800" onClick={deleteproduct}>Delete product</button>
            </div>
          )
        }
         
        </div>
      </div>
    </div>
  </div>
</div>
     </div>
   
   </>
  )
}

export default SingleProduct