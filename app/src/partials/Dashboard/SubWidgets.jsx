import Emoji from "../../utils/Emoji";

// A list of widgets
export const WIDGET_TYPE = 'widget'

export const subWidgets = [
    {
        id: "sub1",
        title: "Weather",
        icon: <Emoji symbol="🌤" label="Weather" />,
    },
    {
        id: "sub2",
        title: "To Do List",
        icon: <Emoji symbol="📝" label="ToDo" />,
    },
    {
        id: "sub3",
        title: "Calendar",
        icon: <Emoji symbol="🗓" label="Calendar" />,
    },
    {
        id: "sub4",
        title: "Timer",
        icon: <Emoji symbol="⏰" label="Timer" />,
    },
    {
        id: "sub5",
        title: "Quote",
        icon: <Emoji symbol="😃" label="Quote" />,
    },
]