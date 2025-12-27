import { View, Text, ActivityIndicator } from "react-native";

interface LoadingStateProps {
  message?: string;
  color?: string;
}

const LoadingState = ({
  message = "Initializing...",
  color = "#4F46E5",
}: LoadingStateProps) => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="bg-indigo-50 p-10 rounded-[3rem] items-center justify-center mb-6">
        <ActivityIndicator size={"large"} color={color} />
      </View>
      <View>
        <Text className="text-primary text-3xl font-black tracking-tighter text-center">
          LUXE.
        </Text>
        <Text className="text-text-tertiary text-center font-black uppercase tracking-widest text-[10px] mt-2">
          {message}
        </Text>
      </View>
    </View>
  );
};

export default LoadingState;
