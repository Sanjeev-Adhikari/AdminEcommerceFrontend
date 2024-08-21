import Widget from 'components/widget/Widget'
import api from 'http/ApiService';
import React, { useEffect, useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
const Dashboard = () => {
const [datas, setDatas] = useState({})

  useEffect(()=>{
    (
      async ()=>{
        const result = await api.getDatas('admin/misc/datas')
        console.log(result)
        setDatas(result)
      }
    )()
  },[])

  //doing this we are immediately invoking the function
  // (
  //   async ()=>{
  //     const result = await api.getDatas('admin/misc/datas')
  //   }
  // )()








  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
    <Widget
      icon={<MdBarChart className="h-7 w-7" />}
      title={"Orders"}
      subtitle={datas.orders}
    />
    <Widget
      icon={<IoDocuments className="h-6 w-6" />}
      title={"Products"}
      subtitle={datas.products}
    />
    <Widget
      icon={<MdBarChart className="h-7 w-7" />}
      title={"Users"}
      subtitle={datas.users}
    />
 
  </div>
  )
}

export default Dashboard