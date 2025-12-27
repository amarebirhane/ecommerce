import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { router, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import SafeScreen from "@/components/SafeScreen";

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-text-primary">Loading...</Text>
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6">
          {/* Hero Section */}
          <View className="flex-1 justify-center items-center pt-20 pb-10">
            <View className="items-center mb-8">
              <View className="bg-primary rounded-full p-6 mb-6">
                <Ionicons name="storefront" size={64} color="#121212" />
              </View>
              <Text className="text-text-primary text-4xl font-bold text-center mb-3">
                Welcome to Our Store
              </Text>
              <Text className="text-text-secondary text-lg text-center max-w-sm">
                Discover amazing products and enjoy a seamless shopping experience
              </Text>
            </View>

            <Image
              source={require("@/assets/images/auth-image.png")}
              className="w-full h-64 mb-8"
              resizeMode="contain"
            />
          </View>

          {/* Features */}
          <View className="gap-6 mb-8">
            <FeatureItem
              icon="flash"
              title="Fast Delivery"
              description="Get your orders delivered quickly"
            />
            <FeatureItem
              icon="shield-checkmark"
              title="Secure Payments"
              description="Safe and encrypted transactions"
            />
            <FeatureItem
              icon="star"
              title="Quality Products"
              description="Curated selection of premium items"
            />
          </View>

          {/* CTA Buttons */}
          <View className="gap-4 pb-10">
            <TouchableOpacity
              className="bg-primary rounded-2xl py-5 px-6 flex-row items-center justify-center"
              activeOpacity={0.9}
              onPress={() => router.push("/(auth)")}
            >
              <Text className="text-background font-bold text-lg mr-2">Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#121212" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-2xl py-5 px-6 flex-row items-center justify-center"
              activeOpacity={0.9}
              onPress={() => router.push("/(auth)")}
            >
              <Text className="text-text-primary font-semibold text-base">Sign In</Text>
            </TouchableOpacity>
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

