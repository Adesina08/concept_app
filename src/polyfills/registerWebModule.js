if (typeof window !== "undefined") {
  try {
    const expoModulesCore = require("expo-modules-core");

    if (expoModulesCore && typeof expoModulesCore.registerWebModule !== "function") {
      expoModulesCore.registerWebModule = (createModule) => {
        return typeof createModule === "function" ? createModule() : createModule;
      };
    }
  } catch (error) {
    // The polyfill is only relevant on web, so ignore failures when the package is unavailable.
  }
}
