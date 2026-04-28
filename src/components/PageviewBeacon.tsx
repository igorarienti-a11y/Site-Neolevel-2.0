"use client";

import { useEffect } from "react";

export function PageviewBeacon() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      const clickKeys = ["fbclid", "gclid", "ttclid", "msclkid", "gbraid", "wbraid"];

      const utms: Record<string, string> = {};
      utmKeys.forEach((k) => { if (params.get(k)) utms[k] = params.get(k)!; });
      if (Object.keys(utms).length) sessionStorage.setItem("_utms", JSON.stringify(utms));
      const storedUtms = sessionStorage.getItem("_utms");

      const ids: Record<string, string> = {};
      clickKeys.forEach((k) => { if (params.get(k)) ids[k] = params.get(k)!; });
      if (Object.keys(ids).length) sessionStorage.setItem("_clickids", JSON.stringify(ids));
      const storedIds = sessionStorage.getItem("_clickids");

      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : "";
      };

      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pageview",
          page_url: window.location.href,
          referrer: document.referrer,
          language: navigator.language,
          screen: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          user_agent: navigator.userAgent,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
          utms: storedUtms ? JSON.parse(storedUtms) : {},
          ...(storedIds ? JSON.parse(storedIds) : {}),
        }),
      }).catch(() => {});
    } catch (_) {}
  }, []);

  return null;
}
