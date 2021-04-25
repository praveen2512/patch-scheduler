const initialState = {
  events: [],
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
  const { type } = action;
  switch (type) {
    case "GET_EVENTS":
      return {
        ...state,
      };
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "APPROVE_PATCH": {
      const user = JSON.parse(sessionStorage.user);
      const patchList = state.events.map((patch) =>
        patch.id === action.payload
          ? {
              ...patch,
              approvalStatus: "approved",
              updatedBy: user && user.email,
            }
          : patch
      );
      return {
        ...state,
        events: patchList,
      };
    }
    case "DENY_PATCH": {
      const user = JSON.parse(sessionStorage.user);
      const patchList = state.events.map((patch) =>
        patch.id === action.payload.id
          ? {
              ...patch,
              approvalStatus: "denied",
              updatedBy: user && user.email,
              denialReason: action.payload.reason,
            }
          : patch
      );
      return {
        ...state,
        events: patchList,
      };
    }
    case "HANDLE_ACTION":
      const user = JSON.parse(sessionStorage.user);
      const patchList = state.events.map((patch) =>
        patch.id === action.payload.id
          ? {
              ...patch,
              approvalStatus: action.payload.status,
              updatedBy: user && user.email,
              denialReason: action.payload.reason,
            }
          : patch
      );
      return {
        ...state,
        events: patchList,
      };
    default:
      return state;
  }
}
