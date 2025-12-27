import RatingModal from "@/components/RatingModal";
import SafeScreen from "@/components/SafeScreen";
import { useOrders } from "@/hooks/useOrders";
import { useReviews } from "@/hooks/useReviews";
import { capitalizeFirstLetter, formatDate, getStatusColor } from "@/lib/utils";
import { Order } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

function OrdersScreen() {
  const { data: orders, isLoading, isError } = useOrders();
  const { createReviewAsync, isCreatingReview } = useReviews();

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [productRatings, setProductRatings] = useState<{ [key: string]: number }>({});

  const handleOpenRating = (order: Order) => {
    setShowRatingModal(true);
    setSelectedOrder(order);

    // init ratings for all product to 0 - resettin the state for each product
    const initialRatings: { [key: string]: number } = {};
    order.orderItems.forEach((item) => {
      const productId = item.product._id;
      initialRatings[productId] = 0;
    });
    setProductRatings(initialRatings);
  };

  const handleSubmitRating = async () => {
    if (!selectedOrder) return;

    // check if all products have been rated
    const allRated = Object.values(productRatings).every((rating) => rating > 0);
    if (!allRated) {
      Alert.alert("Error", "Please rate all products");
      return;
    }

    try {
      await Promise.all(
        selectedOrder.orderItems.map((item) => {
          createReviewAsync({
            productId: item.product._id,
            orderId: selectedOrder._id,
            rating: productRatings[item.product._id],
          });
        })
      );

      Alert.alert("Success", "Thank you for rating all products!");
      setShowRatingModal(false);
      setSelectedOrder(null);
      setProductRatings({});
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.error || "Failed to submit rating");
    }
  };

  return (
    <SafeScreen>
      {/* Header */}
      <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white p-2 rounded-xl border border-gray-100 mr-4 shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#4F46E5" />
        </TouchableOpacity>
        <View>
          <Text className="text-primary text-2xl font-black tracking-tighter">LUXE.</Text>
          <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Orders</Text>
        </View>
      </View>


      {isLoading ? (
        <LoadingUI />
      ) : isError ? (
        <ErrorUI />
      ) : !orders || orders.length === 0 ? (
        <EmptyUI />
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-4">
            {orders.map((order) => {
              const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
              const firstImage = order.orderItems[0]?.image || "";

              return (
                <View key={order._id} className="bg-white border border-gray-100 rounded-[2rem] p-6 mb-6 shadow-sm">
                  <View className="flex-row mb-5">
                    <View className="relative">
                      <Image
                        source={firstImage}
                        style={{ height: 90, width: 90, borderRadius: 16 }}
                        contentFit="cover"
                        transition={200}
                      />

                      {/* BADGE FOR MORE ITEMS */}
                      {order.orderItems.length > 1 && (
                        <View className="absolute -bottom-1 -right-1 bg-primary rounded-full size-8 items-center justify-center border-4 border-white">
                          <Text className="text-white text-[10px] font-black">
                            +{order.orderItems.length - 1}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View className="flex-1 ml-5 justify-center">
                      <Text className="text-text-primary font-black text-lg mb-1">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </Text>
                      <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest mb-3">
                        {formatDate(order.createdAt)}
                      </Text>
                      <View
                        className="self-start px-3 py-1 rounded-lg"
                        style={{ backgroundColor: getStatusColor(order.status) + "15" }}
                      >
                        <Text
                          className="text-[10px] font-black uppercase tracking-tighter"
                          style={{ color: getStatusColor(order.status) }}
                        >
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* ORDER ITEMS SUMMARY */}
                  <View className="mb-4 bg-gray-50/50 p-3 rounded-xl">
                    {order.orderItems.map((item, index) => (
                      <View key={item._id} className="flex-row items-center justify-between mb-1 last:mb-0">
                        <Text className="text-text-secondary text-xs font-semibold flex-1" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text className="text-text-tertiary text-xs font-bold ml-2">×{item.quantity}</Text>
                      </View>
                    ))}
                  </View>

                  <View className="border-t border-gray-50 pt-4 flex-row justify-between items-center">
                    <View>
                      <Text className="text-text-tertiary text-[10px] font-bold uppercase tracking-widest mb-1">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </Text>
                      <Text className="text-primary font-black text-2xl">
                        ${order.totalPrice.toFixed(2)}
                      </Text>
                    </View>

                    {order.status === "delivered" &&
                      (order.hasReviewed ? (
                        <View className="bg-green-50 px-4 py-2 rounded-xl flex-row items-center border border-green-100">
                          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                          <Text className="text-green-600 font-black text-xs uppercase tracking-tighter ml-1.5">Reviewed</Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          className="bg-primary px-5 py-3 rounded-xl flex-row items-center shadow-md shadow-primary/20"
                          activeOpacity={0.7}
                          onPress={() => handleOpenRating(order)}
                        >
                          <Ionicons name="star" size={16} color="#FFFFFF" />
                          <Text className="text-white font-black text-xs uppercase tracking-tighter ml-1.5">
                            Rate Items
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>

              );
            })}
          </View>
        </ScrollView>
      )}

      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        order={selectedOrder}
        productRatings={productRatings}
        onSubmit={handleSubmitRating}
        isSubmitting={isCreatingReview}
        onRatingChange={(productId, rating) =>
          setProductRatings((prev) => ({ ...prev, [productId]: rating }))
        }
      />
    </SafeScreen>
  );
}
export default OrdersScreen;

function LoadingUI() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text className="text-text-secondary font-semibold mt-4">Loading order history...</Text>
    </View>
  );
}

function ErrorUI() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="bg-red-50 p-10 rounded-full mb-6">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
      </View>
      <Text className="text-text-primary font-black text-2xl mt-4">Oops! Error</Text>
      <Text className="text-text-secondary text-center mt-2 font-medium">
        We couldn't load your orders. Please try again.
      </Text>
    </View>
  );
}

function EmptyUI() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="bg-indigo-50 p-10 rounded-full mb-6">
        <Ionicons name="receipt-outline" size={80} color="#4F46E5" />
      </View>
      <Text className="text-text-primary font-black text-2xl mt-4">No Orders Yet</Text>
      <Text className="text-text-secondary text-center mt-2 font-medium">
        Your order history will appear here once you've made a purchase.
      </Text>
    </View>
  );
}

