import ProductsGrid from "@/components/ProductsGrid";
import SafeScreen from "@/components/SafeScreen";
import useProducts from "@/hooks/useProducts";

import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";

const CATEGORIES = [
  { name: "All", icon: "grid-outline" as const },
  { name: "Electronics", icon: "phone-portrait-outline" as const },
  { name: "Fashion", icon: "shirt-outline" as const },
  { name: "Sports", icon: "football-outline" as const },
  { name: "Books", icon: "book-outline" as const },
];


const ShopScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: products, isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    // filtering by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // filtering by searh query
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View className="px-6 pb-4 pt-8">
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-primary text-4xl font-black tracking-tighter">LUXE.</Text>
              <Text className="text-text-secondary text-sm font-semibold tracking-wider uppercase mt-1">Premium Shop</Text>
            </View>

            <TouchableOpacity className="bg-surface p-4 rounded-full shadow-sm" activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color={"#4F46E5"} />
            </TouchableOpacity>
          </View>


          {/* SEARCH BAR */}
          <View className="bg-surface flex-row items-center px-5 py-4 rounded-2xl">
            <Ionicons color={"#666"} size={22} name="search" />
            <TextInput
              placeholder="Search for products"
              placeholderTextColor={"#666"}
              className="flex-1 ml-3 text-base text-text-primary"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* CATEGORY FILTER */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <View key={category.name} className="items-center mr-6">
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(category.name)}
                    className={`rounded-2xl size-16 items-center justify-center shadow-sm ${isSelected ? "bg-primary" : "bg-white border border-gray-100"
                      }`}
                  >
                    <Ionicons
                      name={category.icon}
                      size={28}
                      color={isSelected ? "#FFF" : "#4F46E5"}
                    />
                  </TouchableOpacity>
                  <Text
                    className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${isSelected ? "text-primary" : "text-text-tertiary"
                      }`}
                  >
                    {category.name}
                  </Text>
                </View>
              );
            })}

          </ScrollView>
        </View>

        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-primary text-lg font-bold">Products</Text>
            <Text className="text-text-secondary text-sm">{filteredProducts.length} items</Text>
          </View>

          {/* PRODUCTS GRID */}
          <ProductsGrid products={filteredProducts} isLoading={isLoading} isError={isError} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default ShopScreen;
