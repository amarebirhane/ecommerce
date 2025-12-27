import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import { router, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import SafeScreen from "@/components/SafeScreen";

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-8 pt-12 pb-10">
          {/* Brand Header */}
          <View className="items-center mb-12">
            <Text className="text-primary text-5xl font-black tracking-tighter">LUXE.</Text>
            <View className="h-1 w-12 bg-primary mt-2 rounded-full" />
          </View>

          {/* Hero Section */}
          <View className="flex-1 justify-center items-center mb-12">
            <Image
              source={require("@/assets/images/auth-image.png")}
              className="w-full h-80 rounded-[3rem]"
              resizeMode="cover"
            />

            <View className="mt-8 items-center">
              <Text className="text-text-primary text-4xl font-extrabold text-center leading-tight">
                Elevate Your <Text className="text-primary">Lifestyle</Text>
              </Text>
              <Text className="text-text-secondary text-lg text-center mt-4 px-4 leading-relaxed font-medium">
                Discover a curated collection of premium essentials designed for the modern individual.
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <View className="gap-6">
            <TouchableOpacity
              className="bg-primary rounded-[2rem] py-6 px-8 flex-row items-center justify-center shadow-2xl shadow-primary/40"
              activeOpacity={0.8}
              onPress={() => router.push("/(auth)")}
            >
              <Text className="text-white font-bold text-xl mr-3">Get Started</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>

            <Text className="text-text-tertiary text-center text-sm font-semibold">
              JOIN OVER 10K+ HAPPY CUSTOMERS
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};


interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => (
  <View className="bg-surface rounded-2xl p-4 flex-row items-center">
    <View className="bg-primary/20 rounded-full p-3 mr-4">
      <Ionicons name={icon} size={24} color="#1DB954" />
    </View>
    <View className="flex-1">
      <Text className="text-text-primary font-bold text-base mb-1">{title}</Text>
      <Text className="text-text-secondary text-sm">{description}</Text>
    </View>
  </View>
);

export default LandingPage;

