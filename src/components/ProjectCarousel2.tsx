'use client'

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const ACCESS_KEY = "nUXJ7zUiXb2Y6s0ar-9Db6buSzzOA3wTIw-ay2XOJz4";

interface UnsplashImage {
  id: string;
  urls: {
    full: string;
  };
  alt_description: string;
}

interface JW_Backend {
  id: number;
  title: string;
  project_name: string;
}

export default function ProjectCarousel2() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<JW_Backend[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=commercial-interior&orientation=landscape&client_id=${ACCESS_KEY}`,
        );
        setImages(response.data.results);
      } catch (error) {
        console.error("Error fetching images from Unsplash", error);
      }
    };

    fetchImages();
  }, []);

  const API = 'http://127.0.0.1:5000'

  fetch(`${API}/projects`,{
    method : 'GET',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
  })
  .then((res) => res.json())
  .then((data) => {
    setProjects(data)
    })
    .catch((err) => console.log(err))

  
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000); // Change image every 10 seconds
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
<Carousel className="w-full max-w-lg lg:basis-1/3">
  <CarouselContent>
    {projects.length > 0 ? (
      projects.map((project, index) => (
        <CarouselItem key={index}>
          <div className="p-2">
            <Card className="w-full mx-2 sm:w-[350px] sm:mx-4"> {/* Adjusted margin for mobile */}
              <CardContent className="flex items-center justify-center p-4 sm:p-8">
                <Image className="p-4 sm:p-8"
                  src={images[currentImageIndex]?.urls.full || "/images/placeholder.jpg"}
                  alt={images[currentImageIndex]?.alt_description || "Interior Design"}
                  width={300} // Reduced image size for mobile
                  height={300}
                  layout="responsive" // Ensure the image scales properly
                />
              </CardContent>
              <CardContent className="flex items-center justify-center p-4 sm:p-8">
                <h4 className="scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight">
                  {project.title}
                </h4>
              </CardContent>
              <CardContent className="flex items-center justify-center p-4 sm:p-8">
                <span className="text-xl sm:text-2xl font-semibold">{project.project_name}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))
    ) : (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px] sm:w-[250px]" />
          <Skeleton className="h-4 w-[100px] sm:w-[200px]" />
        </div>
      </div>
    )}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

  );
}
