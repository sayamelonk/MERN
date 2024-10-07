import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Hero = () => {
  const products = useLoaderData();
  // console.log(products);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat Data di KyyShop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Dimana kalian bisa mencari baju, sepatu, kemeja dll dari berbagai
            brand ternama ini bukan official store ini hanya untuk web
            development saja
          </p>
          <div className="mt-10">
            <Link to={"/products"} className="btn btn-primary">
              Product Kami
            </Link>
          </div>
        </div>
        <div className=" hidden lg:carousel carousel-center bg-neutral rounded-box space-x-4 p-4">
          {products.map((item) => (
            <div className="carousel-item" key={item._id}>
              <img src={item.image} className="rounded-box h-48" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
