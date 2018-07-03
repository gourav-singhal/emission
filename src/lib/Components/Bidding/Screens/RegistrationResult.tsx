import React from "react"
import { View } from "react-native"

import { Flex } from "../Elements/Flex"
import { Icon20 } from "../Elements/Icon"

import { BiddingThemeProvider } from "../Components/BiddingThemeProvider"
import { BidGhostButton } from "../Components/Button"
import { Container } from "../Components/Containers"
import { Markdown } from "../Components/Markdown"
import { Title } from "../Components/Title"

interface RegistrationResultProps {
  status: RegistrationStatus
}

export enum RegistrationStatus {
  RegistrationStatusComplete = "RegistrationStatusComplete",
  RegistrationStatusPending = "RegistrationStatusPending",
  RegistrationStatusError = "RegistrationStatusError",
}

const Icons = {
  RegistrationStatusComplete: require("../../../../../images/circle-check-green.png"),
  RegistrationStatusPending: require("../../../../../images/circle-exclamation.png"),
  RegistrationStatusError: require("../../../../../images/circle-x-red.png"),
}

const registrationCompleteMessage = {
  title: "Registration complete",
  description: "Thank you for registering. You’re now eligible\n" + "to bid on works in this sale.",
}

const registrationPendingMessage = {
  title: "Registration pending",
  description:
    "Your registration status is pending.\n" +
    "Please contact [support@artsy.net](mailto:support@artsy.net) for\n" +
    "more information.",
}

const registrationErrorMessage = {
  title: "An error occured",
  description: "Please contact [support@artsy.net](mailto:support@artsy.net)\n" + "with any questions.",
}

export class RegistrationResult extends React.Component<RegistrationResultProps, null> {
  render() {
    const status = this.props.status
    let title: string
    let msg: string

    switch (status) {
      case RegistrationStatus.RegistrationStatusComplete:
        title = registrationCompleteMessage.title
        msg = registrationCompleteMessage.description
        break
      case RegistrationStatus.RegistrationStatusPending:
        title = registrationPendingMessage.title
        msg = registrationPendingMessage.description
        break
      default:
        title = registrationErrorMessage.title
        msg = registrationErrorMessage.description
        break
    }

    return (
      <BiddingThemeProvider>
        <Container mt={6}>
          <View>
            <Flex alignItems="center">
              <Icon20 source={Icons[status]} />
              <Title mt={1} mb={4}>
                {title}
              </Title>
              <Markdown mb={5}>{msg}</Markdown>
            </Flex>
          </View>
          <BidGhostButton text="Continue" onPress={null} />
        </Container>
      </BiddingThemeProvider>
    )
  }
}