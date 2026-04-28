"use client";

import { useState, useEffect } from "react";
import { RenderPage } from "./render-page";
import type { CmsPageWithSections } from "./types";

type LivePreviewClientProps = {
  initialData: CmsPageWithSections;
  context?: Record<string, unknown>;
};

export function LivePreviewClient({ initialData, context }: LivePreviewClientProps) {
  const [pageData, setPageData] = useState<CmsPageWithSections>(initialData);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Security check: only accept messages from same origin
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "CMS_LIVE_UPDATE") {
        const { sectionId, props, page } = event.data.payload;

        setPageData(prev => {
          const newData = { ...prev };
          
          if (page) {
            newData.page = { ...newData.page, ...page };
          }
          
          if (sectionId && props) {
            newData.sections = prev.sections.map(s => 
              s.id === sectionId ? { ...s, props: { ...(s.props as Record<string, unknown> || {}), ...props } } : s
            );
          }
          
          return newData;
        });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return <RenderPage pageData={pageData} preview context={context} />;
}
