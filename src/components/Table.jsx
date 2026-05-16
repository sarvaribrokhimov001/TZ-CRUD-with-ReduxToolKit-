import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransport } from '../features/TransportSlice';

const Table = () => {
 const {transports} = useSelector((state) => state?.transports);
 const dispatch = useDispatch();

 useEffect(() => {
    dispatch(getTransport());   
 } , [])

 console.log(transports);

  return (
    <div>
        <table className='w-full border-collapse text-left text-sm text-gray-300'>
            <thead className='bg-gray-800/50 text-xs uppercase tracking-wider text-gray-400'>
                <tr className='transition-colors hover:bg-gray-800/30'>
                    <th className='px-6 py-4 font-semibold text-center'> T/r </th>
                    <th className='px-6 py-4 font-semibold text-center'> Image </th>
                    <th className='px-6 py-4 font-semibold text-center'> Name </th>
                    <th className='px-6 py-4 font-semibold text-center'> Price </th>
                    <th className='px-6 py-4 font-semibold text-center'> Speed </th>
                    <th className='px-6 py-4 font-semibold text-center'> Type </th>
                    <th className='px-6 py-4 font-semibold text-center'> Brand </th>
                    <th className='px-6 py-4 font-semibold text-center'> Color </th>
                    <th className='px-6 py-4 font-semibold text-center'> Year </th>
                    <th className='px-6 py-4 font-semibold text-center'> Actions </th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-800'>
              {transports.map(({ id , name , image , price , speed , type , brand , color , year }) => (
                <tr className="transition-colors hover:bg-gray-800/30" key={id}>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300 text-red-600 font-bold text-[20px]"> {id} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> 
                        <img className='rounded-[40px]' width={'150px'} height={'100px'}  src={image} alt={name} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold"> {name} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold"> {type} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold"> {brand} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold"> {price} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold"> {color} </td>
                    <td className='whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold'> {speed} </td>
                    <td className='whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold'> {year} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-900 text-[20px] font-bold">
                        <button className="w-[120px] h-[45px] rounded-[20px] bg-black text-green-600 font-bold border-[5px] text-[17px] border-green-600
                         hover:bg-green-600 hover:text-white hover: border-[5px] hover:border-white"> View </button>
                        <button className="w-[120px] h-[45px] rounded-[20px] bg-black text-yellow-400 font-bold border-[5px] text-[17px] border-yellow-400
                         hover:bg-yellow-400 hover:text-white hover:border-[5px] hover:border-white"> Edit </button>
                        <button className="w-[120px] h-[45px] rounded-[20px] bg-black text-red-600 font-bold border-[5px] text-[17px] border-red-600
                         hover:bg-red-600 hover:text-white hover:border-[5px] hover:border-white"> Delete </button>
                    </td>
                </tr>
        ))}
            </tbody>
        </table>
    </div>
  )
}
export default Table