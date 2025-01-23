import React from 'react'
import { useState, useEffect } from 'react';
import BookCard from "../Books/BookCard.jsx";
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Mousewheel,Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi.js';

const categories=["All","Business","Fiction","Horror","Adventure"]
function TopSellers() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    // const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     fetch("books.json").then((res)=>res.json()).then((data)=>setBooks(data))
    // },[])
// const arr=[{vale:1}];
// console.log(arr)
    const {data:books=[]}=useFetchAllBooksQuery();
    console.log(books)
    // console.log(Array.isArray(books));
    const filteredBooks = books.filter((book)=>selectedCategory === "All" || book.category === selectedCategory.toLowerCase())
    // console.log(filteredBooks)
  return (
   <div className='py-10 m-4'>
    <h2 className='text-3xl font-semibold mb-6'>
        Top Sellers 
    </h2>
    <div className='mb-8 flex items-center '>
        <select className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none " name='categories' id="categories " onChange={(e)=>(setSelectedCategory(e.target.value))}>
        {
            categories.map((category)=>(
                <option key={category} value={category}>
                    {category}
                </option>
            ))
        }
        </select>
    </div>
   
    <div className=''>
    <Swiper
        slidesPerView={1}
        spaceBetween={20}
        mousewheel={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
        
          800: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1180:{
            slidesPerView: 3,
            spaceBetween: 20,
          }
        }}
        modules={[Pagination,Mousewheel,Navigation]}
        className="mySwiper"
        >
          {
              filteredBooks.map((book,index)=>(
                <SwiperSlide key={index}>
                  {/* {console.log(book)} */}
                     <Link key={index} to={`/books/${book._id}`}>
                    <BookCard key={index} book={book}/>
                  </Link>
                </SwiperSlide>  
                
              ))
          }
      
      </Swiper>
    </div>
   </div>
    
  )
}

export default TopSellers