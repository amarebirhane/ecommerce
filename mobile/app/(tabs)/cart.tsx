import SafeScreen from "@/components/SafeScreen";
import { useAddresses } from "@/hooks/useAddressess";
import useCart from "@/hooks/useCart";
import { useApi } from "@/lib/api";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Address } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import OrderSummary from "@/components/OrderSummary";
import AddressSelectionModal from "@/components/AddressSelectionModal";

import * as Sentry from "@sentry/react-native";

const CartScreen = () => {
  const api = useApi();
  const {
    cart,
    cartItemCount,
    cartTotal,
    clearCart,
    isError,
    isLoading,
    isRemoving,
    isUpdating,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const { addresses } = useAddresses();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const cartItems = cart?.items || [];
  const subtotal = cartTotal;
  const shipping = 10.0; // $10 shipping fee
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    updateQuantity({ productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert("Remove Item", `Remove ${productName} from cart?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeFromCart(productId),
      },
    ]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // check if user has addresses
    if (!addresses || addresses.length === 0) {
      Alert.alert(
        "No Address",
        "Please add a shipping address in your profile before checking out.",
        [{ text: "OK" }]
      );
      return;
    }

    // show address selection modal
    setAddressModalVisible(true);
  };

  const handleProceedWithPayment = async (selectedAddress: Address) => {
    setAddressModalVisible(false);

    // log chechkout initiated
    Sentry.logger.info("Checkout initiated", {
      itemCount: cartItemCount,
      total: total.toFixed(2),
      city: selectedAddress.city,
    });

    try {
      setPaymentLoading(true);

      // create payment intent with cart items and shipping address
      const { data } = await api.post("/payment/create-intent", {
        cartItems,
        shippingAddress: {
          fullName: selectedAddress.fullName,
          streetAddress: selectedAddress.streetAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          phoneNumber: selectedAddress.phoneNumber,
        },
      });

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Your Store Name",
      });

      if (initError) {
        Sentry.logger.error("Payment sheet init failed", {
          errorCode: initError.code,
          errorMessage: initError.message,
          cartTotal: total,
          itemCount: cartItems.length,
        });

        Alert.alert("Error", initError.message);
        setPaymentLoading(false);
        return;
      }

      // present payment sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Sentry.logger.error("Payment cancelled", {
          errorCode: presentError.code,
          errorMessage: presentError.message,
          cartTotal: total,
          itemCount: cartItems.length,
        });

        Alert.alert("Payment cancelled", presentError.message);
      } else {
        Sentry.logger.info("Payment successful", {
          total: total.toFixed(2),
          itemCount: cartItems.length,
        });

        Alert.alert("Success", "Your payment was successful! Your order is being processed.", [
          { text: "OK", onPress: () => { } },
        ]);
        clearCart();
      }
    } catch (error) {
      Sentry.logger.error("Payment failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        cartTotal: total,
        itemCount: cartItems.length,
      });

      Alert.alert("Error", "Failed to process payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (isLoading) return <LoadingUI />;
  if (isError) return <ErrorUI />;
  if (cartItems.length === 0) return <EmptyUI />;

  return (
    <SafeScreen>
      <View className="px-6 pt-8 pb-5">
        <Text className="text-primary text-4xl font-black tracking-tighter">LUXE.</Text>
        <Text className="text-text-secondary text-sm font-semibold tracking-widest uppercase mt-1">Your Bag</Text>
      </View>


      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 240 }}
      >
        <View className="px-6 gap-6">
          {cartItems.map((item, index) => (
            <View key={item._id} className="bg-white border border-gray-50 rounded-[2.5rem] shadow-sm overflow-hidden">
              <View className="p-5 flex-row">
                {/* product image */}
                <View className="relative">
                  <Image
                    source={{ uri: item.product.images[0] }}
                    className="bg-gray-50 rounded-[2rem]"
                    contentFit="cover"
                    style={{ width: 120, height: 120 }}
                  />
                  <View className="absolute -top-1 -right-1 bg-primary rounded-full px-2 py-1 shadow-md border-2 border-white">
                    <Text className="text-white text-[10px] font-black tracking-tighter">×{item.quantity}</Text>
                  </View>
                </View>

                <View className="flex-1 ml-5 justify-between">
                  <View>
                    <Text
                      className="text-text-primary font-black text-base leading-tight tracking-tighter"
                      numberOfLines={2}
                    >
                      {item.product.name}
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <Text className="text-primary font-black text-2xl tracking-tighter">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Text>
                      <Text className="text-text-tertiary text-[10px] font-bold ml-2 uppercase">
                        ${item.product.price.toFixed(2)} ea
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center mt-4">
                    <View className="flex-row items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
                      <TouchableOpacity
                        className="bg-white rounded-xl w-10 h-10 items-center justify-center shadow-sm"
                        activeOpacity={0.7}
                        onPress={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <ActivityIndicator size="small" color="#4F46E5" />
                        ) : (
                          <Ionicons name="remove" size={18} color="#121212" />
                        )}
                      </TouchableOpacity>

                      <View className="mx-4 min-w-[24px] items-center">
                        <Text className="text-text-primary font-black text-lg">{item.quantity}</Text>
                      </View>

                      <TouchableOpacity
                        className="bg-primary rounded-xl w-10 h-10 items-center justify-center shadow-md shadow-primary/20"
                        activeOpacity={0.7}
                        onPress={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <Ionicons name="add" size={18} color="#FFFFFF" />
                        )}
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      className="ml-auto bg-red-50 rounded-2xl w-11 h-11 items-center justify-center border border-red-100"
                      activeOpacity={0.7}
                      onPress={() => handleRemoveItem(item.product._id, item.product.name)}
                      disabled={isRemoving}
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>


        <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t
       border-gray-100 pt-6 pb-12 px-8"
      >
        {/* Quick Stats */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-text-tertiary text-[10px] font-bold uppercase tracking-widest">
              {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
            </Text>
            <Text className="text-text-primary font-black text-3xl">${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          className="bg-primary rounded-2xl shadow-xl shadow-primary/30"
          activeOpacity={0.9}
          onPress={handleCheckout}
          disabled={paymentLoading}
        >
          <View className="py-5 flex-row items-center justify-center">
            {paymentLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2 font-black uppercase tracking-wider">Checkout</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>


      <AddressSelectionModal
        visible={addressModalVisible}
        onClose={() => setAddressModalVisible(false)}
        onProceed={handleProceedWithPayment}
        isProcessing={paymentLoading}
      />
    </SafeScreen>
  );
};

export default CartScreen;

function LoadingUI() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text className="text-text-secondary font-semibold mt-4">Loading bag...</Text>
    </View>
  );
}

function ErrorUI() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-10">
      <View className="bg-red-50 p-10 rounded-[3rem] items-center justify-center mb-10 shadow-sm border border-red-100/30">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
      </View>
      <Text className="text-text-primary font-black text-2xl text-center mb-4 tracking-tight">Failed to load bag</Text>
      <Text className="text-text-tertiary text-center font-medium leading-5 px-4">
        Please check your connection and try again
      </Text>
    </View>
  );
}



function EmptyUI() {
  return (
    <SafeScreen>
      <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
        <View>
          <Text className="text-primary text-3xl font-black tracking-tighter">LUXE.</Text>
          <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Your Bag</Text>
        </View>
      </View>
      <View className="flex-1 items-center justify-center px-10">
        <View className="bg-indigo-50 p-10 rounded-[3rem] mb-10 shadow-sm border border-indigo-100/30">
          <Ionicons name="cart-outline" size={80} color="#4F46E5" />
        </View>
        <Text className="text-text-primary font-black text-2xl text-center mb-4 tracking-tight">Your Bag is Empty</Text>
        <Text className="text-text-tertiary text-center font-medium leading-5 px-4 mb-10">
          Add some products to your bag to start your premium shopping experience.
        </Text>
        <TouchableOpacity
          className="bg-primary px-10 py-5 rounded-[2rem] shadow-xl shadow-primary/30"
          onPress={() => router.push("/(tabs)")}
          activeOpacity={0.8}
        >
          <Text className="text-white font-black uppercase tracking-widest">Explore Shop</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

