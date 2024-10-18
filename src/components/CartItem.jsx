import React from 'react'
import { toast } from "react-hot-toast";
import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/cartSlice"
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

const CartItem = ({ item, itemIndex }) => {

  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  return (
    <div className='md:w-[60%] sm:w-[75%] w-full border-b-2 pb-20 border-gray-700'>
      <div className='w-full flex flex-col justify-evenly gap-5 items-center'>


        <motion.div
          initial={{ opacity: 0, x: '-10%', y: '-20%' }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='w-[150px]'>
          <img src={item.image} alt='' loading='lazy' />
        </motion.div>
        <div className='lg:w-[60%] md:w-[70%] flex flex-col gap-2 justify-center '>
          <p className='text-xl tracking-wide font-medium text-gray-700'>{item.title}</p>
          <p className='text-sm text-gray-400 tracking-wider '>{item.description}</p>

          <div className='flex justify-between items-center mx-2'>
            <p className='text-green-600 font-bold'>${item.price}</p>

            <div onClick={removeFromCart}
              className='mr-6 bg-red-700 rounded-full p-1 text-white'
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
};

export default CartItem;

