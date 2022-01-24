import { extendTheme } from '@chakra-ui/react'

const initialColorMode: "dark" | "light" = "dark"

const config = {
  initialColorMode: initialColorMode,
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme