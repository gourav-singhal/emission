import React from "react"
import { graphql, QueryRenderer, QueryRendererProps } from "react-relay"

// tslint:disable:no-unused-expression
import Artist from "../Containers/Artist"
Artist

import BidFlow from "../Containers/BidFlow"
BidFlow

import RegistrationFlow from "../Containers/RegistrationFlow"
RegistrationFlow

import Conversation from "../Containers/Conversation"
Conversation

import Gene from "../Containers/Gene"
Gene

import WorksForYou from "../Containers/WorksForYou"
WorksForYou

import Inquiry from "../Containers/Inquiry"
Inquiry

import MyProfile from "lib/Scenes/Settings/MyProfile"
MyProfile

import Inbox from "../Containers/Inbox"
Inbox
// tslint:enable:no-unused-expression

import { QueryRenderersArtistQuery } from "__generated__/QueryRenderersArtistQuery.graphql"
import { QueryRenderersBidFlowQuery } from "__generated__/QueryRenderersBidFlowQuery.graphql"
import { QueryRenderersConversationQuery } from "__generated__/QueryRenderersConversationQuery.graphql"
import { QueryRenderersFairQuery } from "__generated__/QueryRenderersFairQuery.graphql"
import { QueryRenderersForYouQuery } from "__generated__/QueryRenderersForYouQuery.graphql"
import { QueryRenderersGeneQuery } from "__generated__/QueryRenderersGeneQuery.graphql"
import { QueryRenderersInboxQuery } from "__generated__/QueryRenderersInboxQuery.graphql"
import { QueryRenderersInquiryQuery } from "__generated__/QueryRenderersInquiryQuery.graphql"
import { QueryRenderersMyProfileQuery } from "__generated__/QueryRenderersMyProfileQuery.graphql"
import { QueryRenderersRegistrationFlowQuery } from "__generated__/QueryRenderersRegistrationFlowQuery.graphql"
import { QueryRenderersSaleQuery } from "__generated__/QueryRenderersSaleQuery.graphql"
import { QueryRenderersShowQuery } from "__generated__/QueryRenderersShowQuery.graphql"
import { QueryRenderersWorksForYouQuery } from "__generated__/QueryRenderersWorksForYouQuery.graphql"
import createEnvironment from "./createEnvironment"
const environment = createEnvironment()

export type RenderCallback = QueryRendererProps["render"]

interface RendererProps {
  render: RenderCallback
}

interface ArtistRendererProps extends RendererProps {
  artistID: string
  isPad: boolean
}

export const ArtistRenderer: React.SFC<ArtistRendererProps> = ({ render, artistID, isPad }) => {
  return (
    <QueryRenderer<QueryRenderersArtistQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersArtistQuery($artistID: String!, $isPad: Boolean!) {
          artist(id: $artistID) {
            ...Artist_artist
          }
        }
      `}
      variables={{ artistID, isPad }}
      render={render}
    />
  )
}

export interface BidderFlowRendererProps extends RendererProps {
  artworkID?: string
  saleID: string
}

export const RegistrationFlowRenderer: React.SFC<BidderFlowRendererProps> = ({ render, saleID }) => {
  return (
    <QueryRenderer<QueryRenderersRegistrationFlowQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersRegistrationFlowQuery($saleID: String!) {
          sale(id: $saleID) {
            name
            ...RegistrationFlow_sale
          }
          me {
            ...RegistrationFlow_me
          }
        }
      `}
      cacheConfig={{ force: true }} // We want to always fetch latest sale registration status, CC info, etc.
      variables={{
        saleID,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        } else if (!props) {
          return render({ props, error }) // So that we show the spinner
        } else if (props) {
          return render({
            props: {
              sale: props.sale,
              me: props.me,
            },
            error,
          })
        }
        return null
      }}
    />
  )
}

export const BidFlowRenderer: React.SFC<BidderFlowRendererProps> = ({ render, artworkID, saleID }) => {
  // TODO: artworkID can be nil, so omit that part of the query if it is.
  return (
    <QueryRenderer<QueryRenderersBidFlowQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersBidFlowQuery($artworkID: String!, $saleID: String!) {
          artwork(id: $artworkID) {
            sale_artwork(sale_id: $saleID) {
              ...BidFlow_sale_artwork
            }
          }
          me {
            ...BidFlow_me
          }
        }
      `}
      cacheConfig={{ force: true }} // We want to always fetch latest bid increments.
      variables={{
        artworkID,
        saleID,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        } else if (!props) {
          return render({ props, error }) // So that we show the spinner
        } else if (props) {
          // Note that we need to flatten the query above before passing into the BidFlow component.
          // i.e.: the `sale_artwork` is nested within `artwork`, but we want the sale_artwork itself as a prop.
          return render({
            props: {
              sale_artwork: props.artwork.sale_artwork,
              me: props.me,
            },
            error,
          })
        }
      }}
    />
  )
}

interface ConversationRendererProps extends RendererProps {
  conversationID: string
  cursor?: string
  count?: number
}

export const ConversationRenderer: React.SFC<ConversationRendererProps> = ({ render, conversationID }) => {
  return (
    <QueryRenderer<QueryRenderersConversationQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersConversationQuery($conversationID: String!) {
          me {
            ...Conversation_me
          }
        }
      `}
      variables={{
        conversationID,
      }}
      render={render}
    />
  )
}

export const ForYouRenderer: React.SFC<RendererProps> = ({ render }) => {
  return (
    <QueryRenderer<QueryRenderersForYouQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersForYouQuery {
          forYou: home_page {
            ...ForYou_forYou
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

interface GeneRendererProps extends RendererProps {
  geneID: string
  medium?: string
  price_range?: string
}

export const GeneRenderer: React.SFC<GeneRendererProps> = ({ render, geneID, medium, price_range }) => {
  return (
    <QueryRenderer<QueryRenderersGeneQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersGeneQuery($geneID: String!, $medium: String, $price_range: String) {
          gene(id: $geneID) {
            ...Gene_gene @arguments(medium: $medium, price_range: $price_range)
          }
        }
      `}
      variables={{
        geneID,
        medium,
        price_range,
      }}
      render={render}
    />
  )
}

interface SaleRendererProps extends RendererProps {
  saleID: string
}

export const SaleRenderer: React.SFC<SaleRendererProps> = ({ render, saleID }) => {
  return (
    <QueryRenderer<QueryRenderersSaleQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersSaleQuery($saleID: String!) {
          sale(id: $saleID) {
            ...Sale_sale
          }
        }
      `}
      variables={{ saleID }}
      render={render}
    />
  )
}

interface WorksForYouRendererProps extends RendererProps {
  selectedArtist?: string
}

export const WorksForYouRenderer: React.SFC<WorksForYouRendererProps> = ({ render, selectedArtist }) => {
  return (
    <QueryRenderer<QueryRenderersWorksForYouQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersWorksForYouQuery($selectedArtist: String!) {
          viewer {
            ...WorksForYou_viewer @arguments(selectedArtist: $selectedArtist)
          }
        }
      `}
      variables={{
        selectedArtist: selectedArtist || "",
      }}
      render={render}
    />
  )
}

interface InquiryRendererProps extends RendererProps {
  artworkID: string
}

export const InquiryRenderer: React.SFC<InquiryRendererProps> = ({ render, artworkID }) => {
  return (
    <QueryRenderer<QueryRenderersInquiryQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersInquiryQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Inquiry_artwork
          }
        }
      `}
      variables={{
        artworkID,
      }}
      render={render}
    />
  )
}

export const InboxRenderer: React.SFC<RendererProps> = ({ render }) => {
  return (
    <QueryRenderer<QueryRenderersInboxQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersInboxQuery {
          me {
            ...Inbox_me
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

export const MyProfileRenderer: React.SFC<RendererProps> = ({ render }) => {
  return (
    <QueryRenderer<QueryRenderersMyProfileQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersMyProfileQuery {
          me {
            ...MyProfile_me
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

interface FairRendererProps extends RendererProps {
  fairID: string
}

export const FairRenderer: React.SFC<FairRendererProps> = ({ render, fairID }) => {
  return (
    <QueryRenderer<QueryRenderersFairQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersFairQuery($fairID: String!) {
          fair(id: $fairID) {
            ...Fair_fair
          }
        }
      `}
      variables={{ fairID }}
      render={render}
    />
  )
}

interface ShowRendererProps extends RendererProps {
  showID: string
}

export const ShowRenderer: React.SFC<ShowRendererProps> = ({ render, showID }) => {
  return (
    <QueryRenderer<QueryRenderersShowQuery>
      environment={environment}
      query={graphql`
        query QueryRenderersShowQuery($showID: String!) {
          show(id: $showID) {
            ...Show_show
          }
        }
      `}
      variables={{ showID }}
      render={render}
    />
  )
}
