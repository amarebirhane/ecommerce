import SafeScreen from "@/components/SafeScreen";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const MENU_ITEMS = [
  { id: 1, icon: "person-outline", title: "Edit Profile", color: "#3B82F6", action: "/profile" },
  { id: 2, icon: "list-outline", title: "Orders", color: "#10B981", action: "/orders" },
  { id: 3, icon: "location-outline", title: "Addresses", color: "#F59E0B", action: "/addresses" },
  { id: 4, icon: "heart-outline", title: "Wishlist", color: "#EF4444", action: "/wishlist" },
] as const;

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleMenuPress = (action: (typeof MENU_ITEMS)[number]["action"]) => {

    if (action === "/profile") return;
    router.push(action);
  };

  const handleSignOut = () => {

    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              // The Redirect in (tabs)/_layout.tsx will handle the navigation to "/"
            } catch (error) {
              console.error("Error signing out:", error);
            }
          }
        },
      ]
    );
  };

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* HEADER */}
        <View className="px-6 pb-8 pt-8">
          <View className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <View className="flex-row items-center">
              <View className="relative">
                <Image
                  source={user?.imageUrl}
                  style={{ width: 90, height: 90, borderRadius: 45 }}
                  transition={200}
                />
                <View className="absolute -bottom-1 -right-1 bg-primary rounded-full size-8 items-center justify-center border-4 border-white">
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                </View>
              </View>


              <View className="flex-1 ml-4">
                <Text className="text-text-primary text-2xl font-bold mb-1">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text className="text-text-secondary text-sm">
                  {user?.emailAddresses?.[0]?.emailAddress || "No email"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* MENU ITEMS */}
        <View className="flex-row flex-wrap gap-4 mx-6 mb-6">
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white border border-gray-50 rounded-[2rem] p-6 items-center justify-center shadow-sm"
              style={{ width: "47%" }}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.action)}
            >
              <View
                className="rounded-2xl w-14 h-14 items-center justify-center mb-4 shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                <Ionicons name={item.icon as any} size={28} color="#FFF" />
              </View>
              <Text className="text-text-primary font-black text-sm uppercase tracking-tighter">{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>


        {/* NOTIFICATONS BTN */}
        <View className="mb-4 mx-6 bg-white border border-gray-100 rounded-3xl p-2 shadow-sm">
          <TouchableOpacity
            className="flex-row items-center justify-between p-4"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="bg-indigo-50 p-2 rounded-xl mr-3">
                <Ionicons name="notifications-outline" size={20} color="#4F46E5" />
              </View>
              <Text className="text-text-primary font-bold">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="h-[1px] bg-gray-50 mx-4" />

          <TouchableOpacity
            className="flex-row items-center justify-between p-4"
            activeOpacity={0.7}
            onPress={() => router.push("/privacy-security")}
          >
            <View className="flex-row items-center">
              <View className="bg-green-50 p-2 rounded-xl mr-3">
                <Ionicons name="shield-checkmark-outline" size={20} color="#10B981" />
              </View>
              <Text className="text-text-primary font-bold">Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>


        {/* SIGNOUT BTN */}
        <TouchableOpacity
          className="mx-6 mb-8 bg-red-50 rounded-3xl py-5 flex-row items-center justify-center border border-red-100"
          activeOpacity={0.8}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text className="text-red-500 font-black uppercase tracking-widest text-sm ml-2">Sign Out</Text>
        </TouchableOpacity>



        <Text className="mx-6 mb-3 text-center text-text-secondary text-xs">Version 1.0.0</Text>
      </ScrollView>
    </SafeScreen>
  );
};

export default ProfileScreen;


