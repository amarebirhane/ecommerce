import useSocialAuth from "@/hooks/useSocialAuth";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const AuthScreen = () => {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 bg-white px-8">
      {/* Background Decorative Elements */}
      <View className="absolute top-[-10%] left-[-10%] w-[100%] h-[40%] bg-indigo-50 rounded-full blur-[100px]" />

      <View className="flex-1 justify-center items-center">
        {/* Brand Header */}
        <View className="items-center mb-12">
          <Text className="text-primary text-5xl font-black tracking-tighter">LUXE.</Text>
          <Text className="text-text-secondary font-semibold mt-2 tracking-widest uppercase text-xs">
            Premium Lifestyle
          </Text>
        </View>

        {/* Hero Image */}
        <Image
          source={require("../../assets/images/auth-image.png")}
          className="w-full h-80 rounded-[3rem] mb-12"
          resizeMode="cover"
        />

        <View className="w-full gap-4">
          <Text className="text-text-primary text-2xl font-bold text-center mb-2">
            Welcome Back
          </Text>

          {/* GOOGLE SIGN IN BTN */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-white border border-gray-100 rounded-[2rem] px-6 py-5 shadow-sm shadow-black/5"
            onPress={() => handleSocialAuth("oauth_google")}
            disabled={loadingStrategy !== null}
          >
            {loadingStrategy === "oauth_google" ? (
              <ActivityIndicator size={"small"} color={"#4F46E5"} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/google.png")}
                  className="w-6 h-6 mr-3"
                  resizeMode="contain"
                />
                <Text className="text-text-primary font-bold text-lg">Continue with Google</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* APPLE SIGN IN BTN */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-gray-900 border border-gray-900 rounded-[2rem] px-6 py-5 shadow-sm shadow-black/5"
            onPress={() => handleSocialAuth("oauth_apple")}
            disabled={loadingStrategy !== null}
          >
            {loadingStrategy === "oauth_apple" ? (
              <ActivityIndicator size={"small"} color={"#FFFFFF"} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" className="mr-3" />
                <Text className="text-white font-bold text-lg ml-2">Continue with Apple</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text className="text-center text-text-tertiary text-xs leading-5 mt-10 px-6 font-medium">
          By continuing, you agree to our{" "}
          <Text className="text-primary font-bold">Terms of Service</Text> and{" "}
          <Text className="text-primary font-bold">Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};


export default AuthScreen;
