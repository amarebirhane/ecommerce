import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  title: string;
  description?: string;
  header?: string;
}

export function EmptyState({
  icon = "cube-outline",
  iconSize = 80,
  title,
  description,
  header,
}: EmptyStateProps) {
  return (
    <View className="flex-1 bg-white">
      {header && (
        <View className="px-6 pt-16 pb-5 flex-row items-center border-b border-gray-50">
          <View>
            <Text className="text-primary text-3xl font-black tracking-tighter">LUXE.</Text>
            <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">
              {header}
            </Text>
          </View>
        </View>
      )}
      <View className="flex-1 items-center justify-center px-10">
        <View className="bg-indigo-50 p-10 rounded-[3rem] mb-10 shadow-sm border border-indigo-100/30">
          <Ionicons name={icon} size={iconSize} color="#4F46E5" />
        </View>
        <Text className="text-text-primary font-black text-2xl text-center mb-4 tracking-tight">
          {title}
        </Text>
        {description && (
          <Text className="text-text-tertiary text-center font-medium leading-5 px-4 mb-10">
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}
