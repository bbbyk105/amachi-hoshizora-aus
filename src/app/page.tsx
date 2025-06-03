"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

// データ定義
const heroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "育まれた星空。"],
  subtitle: "純米大吟醸",
  productName: "天地星空 - AMACHIHOSHISORA",
  heroImage: "mt-fuji.webp",
};

const topicsData = [
  {
    id: 1,
    title: "富士の伏流水で醸す純米大吟醸",
    description: "山田錦100%使用の極上の逸品",
    image: "river.webp",
  },
  {
    id: 2,
    title: "「米と水だけで醸した真の日本酒で世界に挑戦したい」",
    description: "蔵元の想い",
    bgColor: "from-gray-800 to-gray-900",
    productColor: "from-blue-200 to-blue-300",
    hasRings: true,
    image: "rice.webp",
  },
  {
    id: 3,
    title: "季節とともに変わる夜空の星々",
    description: "富士の神々の物語",
    bgColor: "from-indigo-50 to-blue-100",
    productColor: "from-indigo-100 to-indigo-200",
    image: "star.webp",
  },
];

const productsData = [
  {
    id: 1,
    name: "天地星空 純米大吟醸 720ml",
    description: "富士の伏流水・山田錦100%使用",
    price: "720ml ¥8,800 (税込)",
    colorClass: "from-blue-800 to-blue-900",
    label: "天地星空",
    image: "720.webp",
  },
  {
    id: 2,
    name: "天地星空 純米大吟醸 500ml",
    description: "富士の伏流水使用",
    price: "500ml ¥6,600 (税込)",
    colorClass: "from-blue-700 to-blue-800",
    label: "天地星空",
    image: "500.webp",
  },
  {
    id: 3,
    name: "富士錦 純米酒",
    description: "伝統の富士錦酒造",
    price: "720ml ¥2,970 (税込)",
    colorClass: "from-indigo-600 to-indigo-700",
    label: "富士錦",
    image: null,
  },
  {
    id: 4,
    name: "富士の酒蔵 特別純米",
    description: "富士山の伏流水使用",
    price: "720ml ¥3,465 (税込)",
    colorClass: "from-blue-600 to-blue-700",
    label: "特別醸造",
    image: null,
  },
];

const TopPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16"
        style={
          heroData.heroImage
            ? {
                backgroundImage: `url(${heroData.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 min-h-screen items-center py-8 lg:py-0">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 leading-tight">
                  {heroData.title.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < heroData.title.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm text-gray-600">
                  {heroData.subtitle}
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-900">
                  {heroData.productName}
                </p>
              </div>
              <Button
                variant="outline"
                className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
              >
                MORE
              </Button>
            </div>

            {/* Right Product Display */}
            <div className="relative h-48 sm:h-64 lg:h-full flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-indigo-100/40 to-purple-100/40 blur-2xl sm:blur-3xl transform rotate-12 scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-4 sm:mb-6 lg:mb-8 border-b border-gray-300 pb-3 sm:pb-4">
            ABOUT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
            {topicsData.map((topic) => (
              <Card
                key={topic.id}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  <div
                    className={`aspect-square ${
                      topic.image ? "" : `bg-gradient-to-br ${topic.bgColor}`
                    } relative overflow-hidden flex items-center justify-center`}
                    style={
                      topic.image
                        ? {
                            backgroundImage: `url(${topic.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {}
                    }
                  >
                    {topic.image && (
                      <div className="absolute inset-0 bg-black/30"></div>
                    )}

                    {!topic.image && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
                    )}

                    {topic.id === 1 && !topic.image && (
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent"></div>
                    )}

                    {!topic.image && (
                      <>
                        {topic.id === 1 && (
                          <div className="w-10 sm:w-12 lg:w-16 h-14 sm:h-18 lg:h-24 bg-blue-900 rounded-lg shadow-lg"></div>
                        )}

                        {topic.id === 2 && (
                          <>
                            <div
                              className={`w-14 sm:w-18 lg:w-24 h-10 sm:h-12 lg:h-16 bg-gradient-to-b ${topic.productColor} rounded-lg shadow-lg flex items-center justify-center`}
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                富士錦
                              </span>
                            </div>
                            <div className="absolute top-4 sm:top-6 lg:top-8 left-1/2 transform -translate-x-1/2">
                              <div className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 border-2 border-white/20 rounded-full"></div>
                              <div className="absolute inset-2 border border-white/10 rounded-full"></div>
                            </div>
                          </>
                        )}

                        {topic.id === 3 && (
                          <>
                            <div
                              className={`w-12 sm:w-16 lg:w-20 h-18 sm:h-24 lg:h-32 bg-gradient-to-b ${topic.productColor} rounded-lg shadow-lg flex items-center justify-center`}
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                天地星空
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-indigo-100/40"></div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6 space-y-1 sm:space-y-2 lg:space-y-3">
                    <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 leading-tight">
                      {topic.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {topic.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="px-6 sm:px-8 lg:px-12 py-2 sm:py-3 text-sm sm:text-base border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-6 sm:mb-8 lg:mb-12 border-b border-gray-300 pb-3 sm:pb-4">
            PRODUCT
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
            {productsData.map((product) => (
              <Card
                key={product.id}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="aspect-square bg-gray-50 rounded-lg mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div
                        className={`w-8 sm:w-10 lg:w-12 xl:w-16 h-${
                          product.id === 2
                            ? "6 sm:h-8 lg:h-10 xl:h-12"
                            : "12 sm:h-14 lg:h-16 xl:h-20"
                        } bg-gradient-to-b ${
                          product.colorClass
                        } rounded-lg shadow-md flex items-center justify-center`}
                      >
                        <span className="text-xs text-white font-medium text-center px-1">
                          {product.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base leading-tight">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                        {product.description}
                      </p>
                    )}
                    {product.price && (
                      <p className="text-xs sm:text-sm text-gray-900 font-medium">
                        {product.price}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopPage;
