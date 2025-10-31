import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import colors from "@theme/colors";
import spacing from "@theme/spacing";

import WelcomeScreen from "@screens/WelcomeScreen";
import RespondentLoginScreen from "@screens/RespondentLoginScreen";
import SubmitConceptScreen from "@screens/SubmitConceptScreen";
import DashboardOverviewScreen from "@screens/DashboardOverviewScreen";
import FeedbackSummaryScreen from "@screens/FeedbackSummaryScreen";
import ConceptAnalysisScreen from "@screens/ConceptAnalysisScreen";
import ConceptRefinementScreen from "@screens/ConceptRefinementScreen";
import ConceptEvolutionScreen from "@screens/ConceptEvolutionScreen";
import ConceptFeedbackScreen from "@screens/ConceptFeedbackScreen";
import ProfileScreen from "@screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border
  }
};

const DashboardNavigator = () => (
  <DashboardStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.background },
      headerTintColor: colors.text,
      headerTitleStyle: { fontWeight: "600" }
    }}
  >
    <DashboardStack.Screen
      name="DashboardOverview"
      component={DashboardOverviewScreen}
      options={{ title: "Dashboard" }}
    />
    <DashboardStack.Screen
      name="FeedbackSummary"
      component={FeedbackSummaryScreen}
      options={{ title: "Feedback Summary" }}
    />
    <DashboardStack.Screen
      name="ConceptAnalysis"
      component={ConceptAnalysisScreen}
      options={{ title: "Concept Analysis" }}
    />
    <DashboardStack.Screen
      name="ConceptRefinement"
      component={ConceptRefinementScreen}
      options={{ title: "Refinement Results" }}
    />
    <DashboardStack.Screen
      name="ConceptEvolution"
      component={ConceptEvolutionScreen}
      options={{ title: "Concept Evolution" }}
    />
    <DashboardStack.Screen
      name="ConceptFeedback"
      component={ConceptFeedbackScreen}
      options={{ title: "Concept Feedback" }}
    />
  </DashboardStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        height: 70,
        paddingBottom: spacing.sm,
        paddingTop: spacing.xs
      },
      tabBarActiveTintColor: colors.text,
      tabBarInactiveTintColor: colors.muted,
      tabBarIcon: ({ color, size }) => {
        const iconMap = {
          Submit: "upload",
          Dashboard: "layout",
          Reports: "bar-chart-2",
          Profile: "user"
        };
        return <Feather name={iconMap[route.name]} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Submit" component={SubmitConceptScreen} />
    <Tab.Screen name="Dashboard" component={DashboardNavigator} />
    <Tab.Screen
      name="Reports"
      component={ConceptAnalysisScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Feather name="file-text" size={size} color={color} />,
        headerShown: true,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        title: "Concept Analysis"
      }}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "600" }
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RespondentLogin" component={RespondentLoginScreen} options={{ title: "Respondent Login" }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
