import { createComponent } from "@lit/react";
import { MdElevatedButton } from "@material/web/button/elevated-button";
import { MdFilledButton } from "@material/web/button/filled-button";
import { MdFilledTonalButton } from "@material/web/button/filled-tonal-button";
import React from "react";

export const MdElevatedcButtonComponent = createComponent({
    tagName: "md-elevated-button",
    elementClass: MdElevatedButton,
    react: React,
    events: {}
});

export const MdFilledButtonComponent = createComponent({
    tagName: "md-filled-button",
    elementClass: MdFilledButton,
    react: React,
    events: {}
});

export const MdFilledTonalButtonComponent = createComponent({
    tagName: "md-filled-tonal-button",
    elementClass: MdFilledTonalButton,
    react: React,
    events: {}
});