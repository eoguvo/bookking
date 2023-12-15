import Router from "@koa/router";
import { TypeRoutes } from "../config/config.interface";

function applyRoutes<T>(router: Router, routeList: TypeRoutes<T>) {

    routeList.forEach(function(route) {

        router[route.method](route.path, route.handler);
    
    });
    

    return;

}

export default applyRoutes;