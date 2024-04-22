import { createBrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter(<Route path="/" element={<Dashboard />} />);

export default router;

