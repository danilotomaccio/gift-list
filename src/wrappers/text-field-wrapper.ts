import { createComponent } from "@lit/react";
import { MdOutlinedField } from "@material/web/field/outlined-field";
import React from "react";

export const MdOutlinedFieldComponent = createComponent({
    tagName: "md-outlined-field",
    elementClass: MdOutlinedField,
    react: React,
    events: {
        onchange: 'change',
        oninput: 'oninput',
    }
});