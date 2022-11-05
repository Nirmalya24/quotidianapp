import { memo } from 'react'
import { SourceBox } from "./SourceBox.jsx";

export const WIDGET_TYPE = 'widget'
export const colors = [{
  id: '1',
  color: "yellow",
  url:
    'https://i5.walmartimages.com/asr/c9ac18ff-a698-45c3-a40e-6eacdd9077a8.e7b8c131f9254a2863bb9512a4611e4c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
}, {
  id: '2',
  color: "blue",
  url:
    'https://i.etsystatic.com/16421349/r/il/7c67ce/3027303927/il_1588xN.3027303927_hx5b.jpg',
}, {
  id: '3',
  color: "red",
  url:
    'https://i.etsystatic.com/16421349/r/il/d32f34/3927649281/il_1588xN.3927649281_it40.jpg',
}, {
  id: '4',
  color: "green",
  url:
  'https://i5.walmartimages.com/asr/b85ca1f5-7827-4057-ad41-d38a258355ff.9f47d77efed2336fadf99166218c2bd8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
}];



export const Container = memo(function Container() {

  const listColors = colors.map((g) =>
    <div key={g.id}>
      <SourceBox
        widget={g}
      ></SourceBox>
    </div>
  );

  return (
    <div style={{ float: "left", padding: "20px", width: '20vw', overflowY: 'auto'}}>
      {listColors}
    </div>
  );
});
