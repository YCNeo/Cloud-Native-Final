import { Router } from "express";
import { default as authRouter } from "./auth/controller.ts";
import { default as channelRouter } from "./channel/controller.ts";

type RouteProps = {
  addr: string;
  router: Router;
};

// Integration of routers
const routes: RouteProps[] = [
  { addr: "/auth", router: authRouter },
  { addr: "/channel", router: channelRouter },
];

export default routes;
