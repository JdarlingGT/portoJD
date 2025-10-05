import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return null;
  let path = "";
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
      <Link to="/" className="hover:text-white">Home</Link>
      {parts.map((p, i) => {
        path += `/${p}`;
        const label = decodeURIComponent(p.replace(/-/g, " "));
        return (
          <span key={i}>
            <span className="mx-2">›</span>
            {i === parts.length - 1 ? (
              <span className="text-white">{label}</span>
            ) : (
              <Link to={path} className="hover:text-white">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}