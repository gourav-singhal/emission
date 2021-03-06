import moment from "moment"
import React from "react"
import { Dimensions, Image } from "react-native"
import styled from "styled-components/native"

import { Box, Serif, space, Spacer } from "@artsy/palette"
import { FairHeader_fair } from "__generated__/FairHeader_fair.graphql"
import { InvertedButton } from "lib/Components/Buttons"
import { CaretButton } from "lib/Components/Buttons/CaretButton"
import OpaqueImageView from "lib/Components/OpaqueImageView"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  fair: FairHeader_fair
  onSaveShowPressed?: () => Promise<void>
}

const BackgroundImage = styled(OpaqueImageView)<{ width: number }>`
  flex: 1;
  height: ${p => p.width};
  align-self: center;
  flex-direction: row;
  align-items: flex-end;
`

// Set background color of overlay based on logo color
const Overlay = styled.View`
  background-color: rgba(100, 100, 100, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
`

const Logo = styled(Image)`
  width: 150;
  height: 150;
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;
  margin-bottom: ${space(1)};
`

export class FairHeader extends React.Component<Props> {
  render() {
    const {
      fair: { image, name, organizer, start_at, end_at },
    } = this.props
    const { width: screenWidth } = Dimensions.get("window")

    // TODO: figure out where description will come from
    const description =
      "The Sculpture Objects Functional Art and Design (SOFA) Fair in Chicago is the premier gallery-presented art fair dedicated to three-dimensional art and design. On par with Art Basel and TEFAF Maastricht, SOFA is produced by Urban Expositions, a Clarion Events company."

    return (
      <>
        <BackgroundImage imageURL={image.url} aspectRatio={image.aspect_ratio} width={screenWidth}>
          <Overlay />
          <Logo source={{ uri: organizer.profile.icon.url }} />
        </BackgroundImage>
        <Spacer m={1} />
        <Serif size="5t" weight="semibold" textAlign="center">
          {name}
        </Serif>
        <Serif size="3" textAlign="center">
          {moment(start_at).format("MMM Do")} - {moment(end_at).format("MMM Do")}
        </Serif>

        <Box px={2}>
          <Spacer m={2} />
          <InvertedButton text="Save" />
          <Spacer m={2} />
          <Serif size="2">{description}</Serif>
          <Spacer m={1} />
          <CaretButton text="More Information" />
        </Box>
      </>
    )
  }
}

export const FairHeaderContainer = createFragmentContainer(
  FairHeader,
  graphql`
    fragment FairHeader_fair on Fair {
      id
      name

      image {
        image_url
        aspect_ratio
        url
      }

      organizer {
        profile {
          icon {
            id
            href
            height
            width
            url
          }
          name
        }
      }

      start_at
      end_at
    }
  `
)
