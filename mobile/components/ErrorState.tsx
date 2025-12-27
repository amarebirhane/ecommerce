import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please check your connection and try again",
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="flex-1 bg-white items-center justify-center px-10">
      <View className="bg-red-50 p-10 rounded-[3rem] mb-8 shadow-sm border border-red-100/30">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
      </View>
      <Text className="text-text-primary font-black text-2xl text-center mb-4 tracking-tight">
        {title}
      </Text>
      <Text className="text-text-tertiary text-center font-medium leading-5 px-4 mb-10">
        {description}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary px-10 py-5 rounded-[2rem] shadow-xl shadow-primary/30"
          activeOpacity={0.8}
        >
          <Text className="text-white font-black uppercase tracking-widest">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
