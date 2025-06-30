export enum Routes {
    HOME = "/",
    LOGIN = "/login",
    EVENT = "/event",
}

export const routeViewEvent = (eventId: string) => `${Routes.EVENT}/view/${eventId}`;
export const routeEditEvent = (eventId: string) => `${Routes.EVENT}/edit/${eventId}`;
export const routeCreateEvent = () => `${Routes.EVENT}/create`;