import { Link, Outlet } from "@remix-run/react";

export default function Movies() {
    return (
        <div>
            <h1>Current Queue</h1>
            <Outlet />
        </div>
    )
}