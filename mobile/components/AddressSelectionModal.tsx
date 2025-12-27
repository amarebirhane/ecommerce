import { useAddresses } from "@/hooks/useAddressess";
import { Address } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

interface AddressSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onProceed: (address: Address) => void;
  isProcessing: boolean;
}

const AddressSelectionModal = ({
  visible,
  onClose,
  onProceed,
  isProcessing,
}: AddressSelectionModalProps) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { addresses, isLoading: addressesLoading } = useAddresses();

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-[3rem] h-[65%] shadow-2xl">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between px-8 py-8 border-b border-gray-50">
            <View>
              <Text className="text-primary text-3xl font-black tracking-tighter">LUXE.</Text>
              <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">
                Select Shipping Address
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="bg-gray-100 rounded-2xl p-2.5">
              <Ionicons name="close" size={24} color="#121212" />
            </TouchableOpacity>
          </View>

          {/* ADDRESSES LIST */}
          <ScrollView className="flex-1 px-6 pt-4">
            {addressesLoading ? (
              <View className="py-20 flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text className="text-text-secondary font-bold mt-4 uppercase text-[10px] tracking-widest">
                  Loading addresses
                </Text>
              </View>
            ) : (
              <View className="gap-6 pb-20">
                {addresses?.map((address: Address) => (
                  <TouchableOpacity
                    key={address._id}
                    className={`bg-white rounded-[2rem] p-6 border-2 shadow-sm ${selectedAddress?._id === address._id ? "border-primary" : "border-gray-50"
                      }`}
                    activeOpacity={0.8}
                    onPress={() => setSelectedAddress(address)}
                  >
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-4">
                          <View className="bg-indigo-50 px-3 py-1.5 rounded-xl mr-3">
                            <Text className="text-primary font-black text-xs uppercase tracking-tighter">
                              {address.label}
                            </Text>
                          </View>
                          {address.isDefault && (
                            <View className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                              <Text className="text-text-tertiary text-[10px] font-black uppercase">
                                Default
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-text-primary font-black text-lg mb-2">
                          {address.fullName}
                        </Text>
                        <Text className="text-text-secondary font-medium text-sm leading-5 mb-1">
                          {address.streetAddress}
                        </Text>
                        <Text className="text-text-secondary font-medium text-sm mb-3">
                          {address.city}, {address.state} {address.zipCode}
                        </Text>
                        <View className="flex-row items-center bg-gray-50/50 self-start px-2 py-1 rounded-lg">
                          <Ionicons name="call-outline" size={12} color="#9CA3AF" />
                          <Text className="text-text-tertiary font-bold text-[10px] ml-1.5 uppercase tracking-tighter">
                            {address.phoneNumber}
                          </Text>
                        </View>
                      </View>
                      {selectedAddress?._id === address._id && (
                        <View className="bg-primary rounded-2xl p-2.5 shadow-lg shadow-primary/30">
                          <Ionicons name="checkmark-sharp" size={24} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          {/* ACTION BUTTON */}
          <View className="p-8 border-t border-gray-50 pb-12">
            <TouchableOpacity
              className={`rounded-[2rem] py-5 shadow-xl ${selectedAddress && !isProcessing
                  ? "bg-primary shadow-primary/30"
                  : "bg-gray-200 shadow-none invisible"
                }`}
              activeOpacity={0.9}
              onPress={() => {
                if (selectedAddress) onProceed(selectedAddress);
              }}
              disabled={!selectedAddress || isProcessing}
            >
              <View className="flex-row items-center justify-center">
                {isProcessing ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text className="text-white font-black uppercase tracking-[2px] text-lg mr-2">
                      Secure Checkout
                    </Text>
                    <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddressSelectionModal;
