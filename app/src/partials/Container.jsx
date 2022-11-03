import { memo } from 'react'
import { SourceBox } from "./SourceBox.jsx";

export const Container = memo(function Container() {
  const Colors = {
    YELLOW: "yellow",
    BLUE: "blue",
  };

  return (
    <div style={{ float: "right", padding: "60px" }}>
      <SourceBox color={Colors.BLUE}>
        <SourceBox color={Colors.YELLOW}>
          <SourceBox color={Colors.YELLOW} />
          <SourceBox color={Colors.BLUE} />
        </SourceBox>
        <SourceBox color={Colors.BLUE}>
          <SourceBox color={Colors.YELLOW} />
        </SourceBox>
      </SourceBox>
    </div>
  );
});
