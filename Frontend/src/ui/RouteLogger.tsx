import React, { useEffect } from "react";
import { useLocation, useNavigationType, useParams } from "react-router-dom";

const RouteLogger: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const params = useParams();

  useEffect(() => {
    console.log("Route changed:", location.pathname);
    console.log("Navigation type:", navigationType);
    console.log("Route params:", params);
  }, [location, navigationType, params]);

  return null;
};

export default RouteLogger;
