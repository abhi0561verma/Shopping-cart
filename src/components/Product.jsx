
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/cartSlice"
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Product = ({ item }) => {

  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  function removeFromCart() {
    dispatch(remove(item.id));
    toast.error("Items removed");
  }

  function addToCart() {
    dispatch(add(item));
    toast.success("Items Added");
  }

  // console.log(item);

  /* const title = item.title.substring(0,15)+"...";
  console.log(title); */



  return (
    <div className='productCard'>

      <div className=' mx-auto h-[310px] relative w-[110%] rounded-xl py-3 hover:scale-110 transition-all duration-200 ease-in shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
        <div className='flex flex-col gap-5 items-center justify-center ' >
          <div className='w-[70%] flex flex-col gap-4'>
            <h1 className='text-center text-gray-700 font-semibold text-lg'>{item.title.substring(0, 15) + "...."}</h1>
            <p className='text-center text-gray-400 text-xs'>{item.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
          </div>
          <div className='w-20 relative'>
            <img src={item.image} alt='' loading='lazy' className='w-20' />
            <Link to={`/${item.id}`} className='arrow absolute bottom-1/2 -right-16 font-medium'>
              <MdOutlineKeyboardArrowRight className='arrow text-[#374152] text-2xl' />
            </Link>
          </div>

          <div className='w-full flex justify-evenly items-center absolute bottom-5'>
            <p className='text-green-600 font-bold'>${item.price}</p>
            <div>
              {
                cart.some((i) => (i.id === item.id)) ?
                  (
                    <button onClick={removeFromCart}
                      className='text-gray-700 font-semibold text-sm border-2 border-gray-700 rounded-full px-3 py-[2px] hover:bg-gray-700 hover:text-slate-100 transition-all duration-300 ease-in-out'
                    >Remove Item</button>
                  )
                  :
                  (
                    <button onClick={addToCart}
                      className='text-gray-700 font-semibold text-sm border-2 border-gray-700 rounded-full px-3 py-[2px] hover:bg-gray-700 hover:text-slate-100 transition-all duration-300 ease-in-out'
                    >Add to Cart</button>
                  )
              }
            </div>
          </div>



        </div>

      </div>

    </div>
  )
}

export default Product;