module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  generateBuildId: () => {
    var nextBuildId = process.env.NEXT_BUILD_ID;

    // NOTE: If NEXT_BUILD_ID env var is not provided a static ID will be used. UUID code can be implemented by FE engineers in JS if real UUID is needed.
    if (typeof nextBuildId === "undefined" ) {
      console.log("WARN: Next Build ID not provided using generic ID");
      nextBuildId = "00000000-0000-0000-0000-000000000000";
    }

    console.log("Next Build ID: ", nextBuildId);
    return nextBuildId;
  }
}
