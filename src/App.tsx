import { useEffect } from "react";
import { Route, Router, Switch, useLocation } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Home } from "@/pages/home";
import { Grupo260 } from "@/pages/grupo-260";
import { NotFound } from "@/pages/not-found";
import { OpenSource } from "@/pages/open-source";
import { showOpenSource } from "@/content/open-source";

// Start each page at the top, unless the URL points at a section (#projects)
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export function App() {
  return (
    // Routes are relative to the base path the site is served from
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      {/* Column layout so the footer stays at the bottom on short pages */}
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects/grupo-260" component={Grupo260} />
            {showOpenSource && <Route path="/open-source" component={OpenSource} />}
            <Route component={NotFound} />
          </Switch>
        </main>
        <SiteFooter />
      </div>
    </Router>
  );
}
