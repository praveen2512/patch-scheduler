const initialState = {
  events: [
    {
      title: "Event 1",
      start: new Date("April 23, 2021 10:00:00"),
      end: new Date("April 23, 2021 11:00:00"),
      allDay: false,
      resource: "any",
    },
  ],
  eventList: [
    {
      title: "Event 1",
      start: new Date("April 23, 2021 10:00:00"),
      end: new Date("April 23, 2021 11:00:00"),
      allDay: false,
      resource: "any",
    },
    {
      title: "Event 2",
      start: new Date("April 23, 2021 11:00:00"),
      end: new Date("April 23, 2021 12:00:00"),
      allDay: false,
      resource: "any",
    },
    {
      title: "Event 3",
      start: new Date("April 23, 2021 13:00:00"),
      end: new Date("April 23, 2021 14:00:00"),
      allDay: false,
      resource: "any",
    },
    {
      title: "Event 4",
      start: new Date("April 23, 2021 14:00:00"),
      end: new Date("April 23, 2021 15:00:00"),
      allDay: false,
      resource: "any",
    },
    {
      title: "Event 5",
      start: new Date("April 23, 2021 15:00:00"),
      end: new Date("April 23, 2021 16:00:00"),
      allDay: false,
      resource: "any",
    },
    {
      title: "Event 6",
      start: new Date("April 23, 2021 17:00:00"),
      end: new Date("April 23, 2021 19:00:00"),
      allDay: false,
      resource: "any",
    },
  ],
};

export default function (state = initialState, action) {
  const {type} = action;
  switch (type) {
    case "GET_EVENTS":
      return {
        state,
      };
    case "ADD_EVENT":
        console.log('adding event');
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ],
      };
    default:
      return state;
  }
};