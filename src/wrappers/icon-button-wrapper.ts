import { createComponent } from "@lit/react";
import { MdIconButton } from "@material/web/iconbutton/icon-button";
import React from "react";

export const MdIconButtonComponent = createComponent({
    tagName: "md-icon-button",
    elementClass: MdIconButton,
    react: React,
    events: {}
});