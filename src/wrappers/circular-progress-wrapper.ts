import { createComponent } from "@lit/react";
import { MdCircularProgress } from "@material/web/progress/circular-progress";
import React from "react";

export const MdCircularProgressComponent = createComponent({
    tagName: "md-circular-progress",
    elementClass: MdCircularProgress,
    react: React,
    events: {}
});