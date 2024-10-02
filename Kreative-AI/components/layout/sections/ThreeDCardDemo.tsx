"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:w-[50rem] lg:w-[60rem] h-auto rounded-xl p-10 border">
        <CardItem
          translateZ="50"
          className="text-3xl font-bold text-neutral-600 dark:text-white"
        >
          Stunning Banners Generated Using This App
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-lg max-w-sm mt-2 dark:text-neutral-300"
        >
          Discover the beauty of your creations effortlessly with our powerful banner generation tool.
        </CardItem>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <CardItem translateZ="100" className="w-full flex justify-center items-center">
            <Image
              src="/images/Image.jpeg"
              height={400}
              width={400}
              className="h-64 w-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover/card:scale-105"
              alt="Banner Image 1"
            />
          </CardItem>
          <CardItem translateZ="100" className="w-full flex justify-center items-center">
            <Image
              src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=500&fit=crop"
              height={400}
              width={400}
              className="h-64 w-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover/card:scale-105"
              alt="Banner Image 2"
            />
          </CardItem>
          <CardItem translateZ="100" className="w-full flex justify-center items-center">
            <Image
              src="/Users/manaskumar/Desktop/GenAI/Kreative-AI/components/layout/Screenshot 2024-10-02 at 1.39.52 AM.jpeg"
              height={400}
              width={400}
              className="h-64 w-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover/card:scale-105"
              alt="Banner Image 3"
            />
          </CardItem>
          <CardItem translateZ="100" className="w-full flex justify-center items-center">
            <Image
              src="https://images.unsplash.com/photo-1488272361740-4c7de8036c30?w=500&fit=crop"
              height={400}
              width={400}
              className="h-64 w-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover/card:scale-105"
              alt="Banner Image 4"
            />
          </CardItem>
        </div>

        <CardItem translateZ="50" className="mt-6 text-lg text-neutral-500 dark:text-neutral-300">
          <p>Explore the variety of banners you can create with just a few clicks!</p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
