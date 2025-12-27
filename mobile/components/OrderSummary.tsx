import { View, Text } from "react-native";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({ subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <View className="px-6 mt-8">
      <View className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-text-primary text-2xl font-black tracking-tight">Summary</Text>
          <View className="bg-indigo-50 px-3 py-1 rounded-full">
            <Text className="text-primary font-black text-[10px] uppercase">Review</Text>
          </View>
        </View>

        <View className="gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-text-secondary font-medium text-base">Subtotal</Text>
            <Text className="text-text-primary font-bold text-base">
              ${subtotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-text-secondary font-medium text-base">Shipping</Text>
            <Text className="text-green-600 font-bold text-base">
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-text-secondary font-medium text-base">Estimated Tax</Text>
            <Text className="text-text-primary font-bold text-base">${tax.toFixed(2)}</Text>
          </View>

          {/* Divider */}
          <View className="h-[1px] bg-gray-50 mt-4 mb-2" />

          {/* Total */}
          <View className="flex-row justify-between items-center">
            <Text className="text-text-primary font-black text-xl">Total</Text>
            <Text className="text-primary font-black text-3xl">${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
