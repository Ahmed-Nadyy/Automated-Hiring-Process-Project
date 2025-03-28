import React, { useState } from "react";
import AddCoach from "./AddCoach/AddCoach";
import DisplayCoaches from "./AddCoach/DisplayCoaches";

export default function CoachesField() {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshCoaches = () => setRefreshKey((prev) => prev + 1);

    return (
        <div>
            <AddCoach refreshCoaches={refreshCoaches} />
            <hr />
            <DisplayCoaches refreshKey={refreshKey} />
        </div>
    );
}
