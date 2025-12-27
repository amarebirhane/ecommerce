import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AddressesHeader() {
  return (
    <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-white p-2 rounded-xl border border-gray-100 mr-4 shadow-sm"
      >
        <Ionicons name="arrow-back" size={24} color="#4F46E5" />
      </TouchableOpacity>
      <View>
        <Text className="text-primary text-2xl font-black tracking-tighter">LUXE.</Text>
        <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Addresses</Text>
      </View>
    </View>
  );
}

