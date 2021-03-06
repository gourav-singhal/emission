/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Detail_show$ref } from "./Detail_show.graphql";
import { MoreInfo_show$ref } from "./MoreInfo_show.graphql";
declare const _Show_show$ref: unique symbol;
export type Show_show$ref = typeof _Show_show$ref;
export type Show_show = {
    readonly " $fragmentRefs": Detail_show$ref & MoreInfo_show$ref;
    readonly " $refType": Show_show$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Show_show",
  "type": "Show",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Detail_show",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "MoreInfo_show",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'de45104018adb6d9fde6f4a10cb280fa';
export default node;
