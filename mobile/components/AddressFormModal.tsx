import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SafeScreen from "./SafeScreen";
import { Ionicons } from "@expo/vector-icons";

interface AddressFormData {
  label: string;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

interface AddressFormModalProps {
  visible: boolean;
  isEditing: boolean;
  addressForm: AddressFormData;
  isAddingAddress: boolean;
  isUpdatingAddress: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (form: AddressFormData) => void;
}

const AddressFormModal = ({
  addressForm,
  isAddingAddress,
  isEditing,
  isUpdatingAddress,
  onClose,
  onFormChange,
  onSave,
  visible,
}: AddressFormModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeScreen>
          <View className="flex-1 bg-white">
            {/* HEADER */}
            <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
              <View>
                <Text className="text-primary text-2xl font-black tracking-tighter">LUXE.</Text>
                <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">
                  {isEditing ? "Edit Address" : "New Address"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className="ml-auto bg-gray-50 p-2 rounded-xl"
              >
                <Ionicons name="close" size={24} color="#121212" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 50 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="p-6">
                {/* LABEL INPUT */}
                <View className="mb-6">
                  <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                    Label
                  </Text>
                  <TextInput
                    className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                    placeholder="e.g., Home, Work, Office"
                    placeholderTextColor="#9CA3AF"
                    value={addressForm.label}
                    onChangeText={(text) => onFormChange({ ...addressForm, label: text })}
                    autoCapitalize="sentences"
                  />
                </View>

                {/* NAME INPUT */}
                <View className="mb-6">
                  <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                    Full Name
                  </Text>
                  <TextInput
                    className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={addressForm.fullName}
                    onChangeText={(text) => onFormChange({ ...addressForm, fullName: text })}
                    autoCapitalize="words"
                  />
                </View>

                {/* Address Input */}
                <View className="mb-6">
                  <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                    Street Address
                  </Text>
                  <TextInput
                    className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                    placeholder="Street address, apt/suite number"
                    placeholderTextColor="#9CA3AF"
                    value={addressForm.streetAddress}
                    onChangeText={(text) => onFormChange({ ...addressForm, streetAddress: text })}
                    multiline
                  />
                </View>

                {/* ROW: CITY & STATE */}
                <View className="flex-row gap-4 mb-6">
                  <View className="flex-1">
                    <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                      City
                    </Text>
                    <TextInput
                      className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                      placeholder="City"
                      placeholderTextColor="#9CA3AF"
                      value={addressForm.city}
                      onChangeText={(text) => onFormChange({ ...addressForm, city: text })}
                      autoCapitalize="words"
                    />
                  </View>
                  <View className="flex-[0.5]">
                    <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                      State
                    </Text>
                    <TextInput
                      className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                      placeholder="ST"
                      placeholderTextColor="#9CA3AF"
                      value={addressForm.state}
                      onChangeText={(text) => onFormChange({ ...addressForm, state: text })}
                      autoCapitalize="characters"
                      maxLength={2}
                    />
                  </View>
                </View>

                {/* ZIP & PHONE */}
                <View className="flex-row gap-4 mb-6">
                  <View className="flex-1">
                    <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                      ZIP Code
                    </Text>
                    <TextInput
                      className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                      placeholder="10001"
                      placeholderTextColor="#9CA3AF"
                      value={addressForm.zipCode}
                      onChangeText={(text) => onFormChange({ ...addressForm, zipCode: text })}
                      keyboardType="numeric"
                    />
                  </View>
                  <View className="flex-[1.5]">
                    <Text className="text-text-primary font-black text-xs uppercase tracking-widest mb-2.5 ml-1">
                      Phone
                    </Text>
                    <TextInput
                      className="bg-gray-50 text-text-primary px-5 py-4 rounded-2xl text-base font-medium border border-gray-100"
                      placeholder="+1 (555) 000-0000"
                      placeholderTextColor="#9CA3AF"
                      value={addressForm.phoneNumber}
                      onChangeText={(text) => onFormChange({ ...addressForm, phoneNumber: text })}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Default Address Toggle */}
                <View className="bg-indigo-50/50 rounded-2xl p-5 flex-row items-center justify-between mb-8 border border-indigo-50">
                  <View>
                    <Text className="text-text-primary font-black text-sm mb-0.5">
                      Default Address
                    </Text>
                    <Text className="text-text-tertiary font-bold text-[10px] uppercase">
                      Use for primary shipping
                    </Text>
                  </View>
                  <Switch
                    value={addressForm.isDefault}
                    onValueChange={(value) => onFormChange({ ...addressForm, isDefault: value })}
                    trackColor={{ false: "#E5E7EB", true: "#4F46E5" }}
                    thumbColor="white"
                  />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  className="bg-primary rounded-[2rem] py-5 items-center shadow-xl shadow-primary/30"
                  activeOpacity={0.8}
                  onPress={onSave}
                  disabled={isAddingAddress || isUpdatingAddress}
                >
                  {isAddingAddress || isUpdatingAddress ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text className="text-white font-black uppercase tracking-[2px] text-lg">
                      {isEditing ? "Update Address" : "Save Address"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </SafeScreen>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressFormModal;
