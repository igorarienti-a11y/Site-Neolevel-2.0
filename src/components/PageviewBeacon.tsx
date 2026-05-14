"use client";

import { useEffect } from "react";

export function PageviewBeacon() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      const clickKeys = ["fbclid", "gclid", "ttclid", "msclkid", "gbraid", "wbraid"];

      const current: Record<string, string> = {};
      utmKeys.forEach((k) => { if (params.get(k)) current[k] = params.get(k)!; });
      // first-touch: só grava se ainda não tem UTMs salvos
      const storedUtms = localStorage.getItem("_utms");
      if (!storedUtms && Object.keys(current).length) {
        localStorage.setItem("_utms", JSON.stringify(current));
      }

      const ids: Record<string, string> = {};
      clickKeys.forEach((k) => { if (params.get(k)) ids[k] = params.get(k)!; });
      // last-touch: sempre atualiza com o clique mais recente
      if (Object.keys(ids).length) localStorage.setItem("_clickids", JSON.stringify(ids));
      const storedIds = localStorage.getItem("_clickids");

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
          utms: storedUtms ? JSON.parse(storedUtms) : (Object.keys(current).length ? current : {}),
          ...(storedIds ? JSON.parse(storedIds) : {}),
        }),
      }).catch(() => {});
    } catch (_) {}
  }, []);

  return null;
}
