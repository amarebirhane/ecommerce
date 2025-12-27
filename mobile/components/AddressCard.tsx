import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Address } from "@/types";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (addressId: string, label: string) => void;
  isUpdatingAddress: boolean;
  isDeletingAddress: boolean;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  isUpdatingAddress,
  isDeletingAddress,
}: AddressCardProps) {
  return (
    <View className="bg-white border border-gray-100 rounded-[2rem] p-6 mb-6 shadow-sm">
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center">
          <View className="bg-indigo-50 rounded-2xl w-12 h-12 items-center justify-center mr-4">
            <Ionicons name="location" size={22} color="#4F46E5" />
          </View>
          <Text className="text-text-primary font-black text-lg">{address.label}</Text>
        </View>
        {address.isDefault && (
          <View className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <Text className="text-primary text-[10px] font-black uppercase tracking-tighter">Default</Text>
          </View>
        )}
      </View>
      <View className="px-1 items-start">
        <Text className="text-text-primary font-bold text-base mb-1">{address.fullName}</Text>
        <Text className="text-text-secondary font-medium text-sm mb-0.5">{address.streetAddress}</Text>
        <Text className="text-text-secondary font-medium text-sm mb-2">
          {address.city}, {address.state} {address.zipCode}
        </Text>
        <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg">
          <Ionicons name="phone-portrait-outline" size={12} color="#9CA3AF" />
          <Text className="text-text-tertiary font-bold text-[10px] ml-1.5">{address.phoneNumber}</Text>
        </View>
      </View>
      <View className="flex-row mt-6 gap-3">
        <TouchableOpacity
          className="flex-1 bg-white border border-gray-100 py-3.5 rounded-xl items-center shadow-sm"
          activeOpacity={0.7}
          onPress={() => onEdit(address)}
          disabled={isUpdatingAddress}
        >
          <Text className="text-text-primary font-black text-xs uppercase tracking-widest">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-red-50 border border-red-100 py-3.5 rounded-xl items-center shadow-sm"
          activeOpacity={0.7}
          onPress={() => onDelete(address._id, address.label)}
          disabled={isDeletingAddress}
        >
          <Text className="text-red-600 font-black text-xs uppercase tracking-widest">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

