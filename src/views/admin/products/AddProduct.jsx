import { STATUSES } from 'components/misc/statuses'
import react from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from 'store/productSlice'

const AddProduct = ()=>{
    const {status} = useSelector((state)=>state.products)
    const {register, handleSubmit, formState } = useForm()
    const dispatch = useDispatch()
  

    const handleProduct = (data)=>{
      data =  {...data,productImage : data.productImage[0]  }
        dispatch(addProduct(data))
      if(status == STATUSES.SUCCESS){
        alert('Product Added successfully')
         window.location.href = '/admin/products'
      }
    
    }
    
    return (
        <div>
            <>
          
<form onSubmit={handleSubmit((data)=>{
    handleProduct(data)
 })} noValidate>
  <div className="bg-indigo-50 min-h-screen  md:px-20 pt-6">
    <div className=" bg-white rounded-md h-full px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-Balck-600 mb-10">Add Product</h1>
      <div className="space-y-4">
        <div>
         
        <input type="text" placeholder="ProductName" id="title" className=" w-full
         focus:border-indigo-500 outline-none py-1 px-2 text-md border-2 rounded-md" {...register('productName', {required : "Product Name is required"})} />
          <p>{formState.errors.productName && (<span style={{color: 'red'}}>{formState.errors.productName.message}</span>)}</p>
        </div>
        <div className="flex items-center space-x-4">
  
  <textarea
 
    id="description"
    placeholder="Product Description here.."
    className="w-full font-serif p-4 text-black-600 bg-indigo-50 outline-none rounded-md focus:border-indigo-500"
    {...register('productDescription', {required : "Product Description is required"})}
    
  />
   
</div>
<p>{formState.errors.productDescription && (<span style={{color: 'red'}}>{formState.errors.productDescription.message}</span>)}</p>
        <div className='flex justify-between'>
        <div >
        
          <input type="number" placeholder="Product Price" id="name" className=" focus:border-indigo-500 outline-none
           py-1 px-2 text-md border-2 rounded-md" {...register('productPrice', {required : "Product Price is required"})}/>
            <p>{formState.errors.productPrice && (<span style={{color: 'red'}}>{formState.errors.productPrice.message}</span>)}</p>
        </div>
        <div>
        
          <input type="number" placeholder="Product Stock"  id="email" className="ml-2 focus:border-indigo-500 outline-none
           py-1 px-2 text-md border-2 rounded-md"  {...register('productStockQty', {required : "Product StockQty is required"})}/>
            <p>{formState.errors.productStockQty && (<span style={{color: 'red'}}>{formState.errors.productStockQty.message}</span>)}</p>
        </div>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md">
  <div className="flex justify-between items-start mb-6">
    <div className="flex flex-row mb-1 sm:mb-0 w-1/2">
      <div className="flex flex-col w-full relative">
        <label htmlFor="statusDropdown" className="text-lx font-serif mb-2">
          Product Status
        </label>
        <div className="relative w-full">
          <select
            id="statusDropdown"
            className="appearance-none pl-3 border border-black-400 rounded-md w-full bg-white text-black-700 py-2 pr-8 leading-tight focus:outline-none focus:border-indigo-500"
            {...register('productStatus', {required : "Product Status is required"})}
          >
                <p>{formState.errors.productStatus && (<span style={{color: 'red'}}>{formState.errors.productStatus.message}</span>)}</p>
            <option value="available" style={{ color: 'green' }}>Available</option>
            <option value="unavailable" style={{ color: 'red' }}>Unavailable</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className="ml-6 w-1/2">
      <label htmlFor="productImage" className="text-lx font-serif mb-2">
        Product Image
      </label>
      <input
        type="file"
        id="productImage"
        className="block w-full text-md py-2 px-3 border-2 border-black rounded-md outline-none focus:border-indigo-500"
        {...register('productImage', {required : "Product Image is required"})}
      />
    <p>{formState.errors.productImage && (<span style={{color: 'red'}}>{formState.errors.productImage.message}</span>)}</p>
    </div>
  </div>
  <button className="w-full mt-6 px-4 py-2 rounded-md text-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700">
    Add Product
  </button>
</div>

      </div>
    </div>
  </div>
</form>
            </>
        </div>
    )
}

export default AddProduct