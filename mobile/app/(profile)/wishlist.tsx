import SafeScreen from "@/components/SafeScreen";
import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

function WishlistScreen() {
  const { wishlist, isLoading, isError, removeFromWishlist, isRemovingFromWishlist } =
    useWishlist();

  const { addToCart, isAddingToCart } = useCart();

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    Alert.alert("Remove from wishlist", `Remove ${productName} from wishlist`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",

        onPress: () => removeFromWishlist(productId),
      },
    ]);
  };

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => Alert.alert("Success", `${productName} added to cart!`),
        onError: (error: any) => {
          Alert.alert("Error", error?.response?.data?.error || "Failed to add to cart");
        },
      }
    );
  };

  if (isLoading) return <LoadingUI />;
  if (isError) return <ErrorUI />;

  return (
    <SafeScreen>
      {/* HEADER */}
      <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white p-2 rounded-xl border border-gray-100 mr-4 shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#4F46E5" />
        </TouchableOpacity>
        <View>
          <Text className="text-primary text-2xl font-black tracking-tighter">LUXE.</Text>
          <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Wishlist</Text>
        </View>
        <View className="ml-auto bg-indigo-50 px-3 py-1 rounded-full">
          <Text className="text-primary font-bold text-xs">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </Text>
        </View>
      </View>

      {wishlist.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">

          <View className="bg-indigo-50 p-10 rounded-full mb-6">
            <Ionicons name="heart-outline" size={80} color="#4F46E5" />
          </View>
          <Text className="text-text-primary font-black text-2xl mt-4">Empty Wishlist</Text>
          <Text className="text-text-secondary text-center mt-2 font-medium px-8 leading-5">
            Start adding products you love to see them here!
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-[2rem] px-10 py-5 mt-8 shadow-xl shadow-primary/30"
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-white font-bold text-lg uppercase tracking-wider">Browse Products</Text>
          </TouchableOpacity>
        </View>

      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-4">
            {wishlist.map((item) => (
              <TouchableOpacity
                key={item._id}
                className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden mb-6 shadow-sm"
                activeOpacity={0.8}
                onPress={() => router.push(`/product/${item._id}`)}
              >
                <View className="flex-row p-5">
                  <Image
                    source={item.images[0]}
                    className="rounded-2xl bg-indigo-50"
                    style={{ width: 100, height: 100 }}
                    transition={200}
                  />

                  <View className="flex-1 ml-5 justify-between py-1">
                    <View>
                      <Text className="text-text-primary font-black text-lg mb-1" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-primary font-black text-2xl">
                        ${item.price.toFixed(2)}
                      </Text>
                    </View>

                    {item.stock > 0 ? (
                      <View className="flex-row items-center bg-green-50 self-start px-2 py-1 rounded-lg">
                        <View className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                        <Text className="text-green-600 text-[10px] font-black uppercase">
                          {item.stock} in stock
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center bg-red-50 self-start px-2 py-1 rounded-lg">
                        <View className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5" />
                        <Text className="text-red-600 text-[10px] font-black uppercase">Out of Stock</Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    className="self-start bg-red-50 p-2.5 rounded-full"
                    activeOpacity={0.7}
                    onPress={() => handleRemoveFromWishlist(item._id, item.name)}
                    disabled={isRemovingFromWishlist}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
                {item.stock > 0 && (
                  <View className="px-5 pb-5">
                    <TouchableOpacity
                      className="bg-primary rounded-2xl py-4 items-center shadow-md shadow-primary/20"
                      activeOpacity={0.8}
                      onPress={() => handleAddToCart(item._id, item.name)}
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Text className="text-white font-black uppercase tracking-wider">Add to Bag</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      )}
    </SafeScreen>
  );
}
export default WishlistScreen;

function LoadingUI() {
  return (
    <SafeScreen>
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="text-text-secondary font-semibold mt-4">Curating your wishlist...</Text>
      </View>
    </SafeScreen>
  );
}

function ErrorUI() {
  return (
    <SafeScreen>
      <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white p-2 rounded-xl border border-gray-100 mr-4 shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#4F46E5" />
        </TouchableOpacity>
        <Text className="text-text-primary text-xl font-black">Error</Text>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-red-50 p-10 rounded-full mb-6">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        </View>
        <Text className="text-text-primary font-black text-2xl mt-4">Oops! Error</Text>
        <Text className="text-text-secondary text-center mt-2 font-medium">
          We couldn't load your wishlist. Please try again.
        </Text>
      </View>
    </SafeScreen>
  );
}

