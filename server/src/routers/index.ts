import usersRouter from "./user";
import forumRouter from "./forum";

const routes = [
    {
        path: '/api/user',
        router: () => usersRouter
    },
    {
        path: '/api/forum',
        router: () => forumRouter
    },
];

export default routes;