import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const API_KEY = "https://fakestoreapi.com/products";
console.log(API_KEY);
const Home = () => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const arr = [];

  async function fetchItems() {
    setLoading(true);

    try {

      const res = await fetch(API_KEY);
      const data = await res.json();
      console.log(data);
      setItems(data);

    }

    catch (err) {
      console.log("Something went wrong");
      setItems([])
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems()
  }, []);

  if (items.length > 0) {
    arr.push(items[0].image);
    arr.push(items[1].image);
    arr.push(items[2].image);
    arr.push(items[3].image);
    arr.push(items[4].image);
    arr.push(items[14].image);
    arr.push(items[15].image);
    arr.push(items[16].image);
    arr.push(items[17].image);
    arr.push(items[18].image);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },

    ]
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  // First item (comes from top-left)
  const firstItemVariants = {
    hidden: { opacity: 0, x: -100, y: -100 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Last item (comes from top-right)
  const lastItemVariants = {
    hidden: { opacity: 0, x: 100, y: -100 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Second and third items (come from top)
  const topItemVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Normal item animation (comes from below)
  const normalItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className='max-w-6xl mx-auto py-10'>
      <div>
        {
          loading ?
            (<div>
              <Spinner />
            </div>)
            :
            (

              <div>

                {/* crouser */}
                <div>
                  {
                    arr.length > 0 && (
                      <div>
                        <Slider  {...settings}>
                          {
                            arr.map((item, i) => {
                              console.log("item of crousel: ", item);
                              return (
                                <div className='w-48' key={i}>
                                  <img src={item} alt='' loading='lazy' className='w-48' />
                                </div>
                              )
                            })
                          }
                        </Slider>
                      </div>
                    )
                  }
                </div>

                <motion.div
                  className='w-full h-full mx-auto'
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}>
                  {
                    items.length > 0 ?
                      (
                        <div className='w-full h-full py-8 pt-24 mx-auto grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-14'>
                          {
                            items.map((item, index) => {
                              return (
                                <motion.div key={item.id}
                                  variants={
                                    index % 4 === 0
                                      ? firstItemVariants // First product of each row (comes from top-left)
                                      : (index + 1) % 4 === 0
                                        ? lastItemVariants // Last product of each row (comes from top-right)
                                        : index === 1 || index === 2
                                          ? topItemVariants // Second and third product of first row (comes from top)
                                          : normalItemVariants // Remaining products (comes from below)
                                  }
                                >
                                  <Product item={item} />
                                </motion.div>
                              )
                            })
                          }



                        </div>
                      ) :
                      (
                        <div>
                          <p>Not Available!!!</p>
                        </div>)
                  }
                </motion.div>
              </div>
            )
        }
      </div>
    </div>
  )
}
export default Home;
