import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "teal",
    components: ["Divider"],
  })
);
export default theme;
